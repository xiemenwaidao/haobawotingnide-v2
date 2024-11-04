---
title: サイコロを作りたい（1）スポットライト
description: サイコロに追従するスポットライトを実装しました。暗闇でも目立つこと間違いなし！
draft: false
featured: false
pubDatetime: 2023-05-01T15:44:00.000Z
modDatetime: 2023-05-10T12:57:51.538Z
tags:
  - Blender
  - CannonJs
  - JavaScript
  - React-three-fiber
  - ReactJs
  - ThreeJs
  - Zustand
postSlug: i-want-to-create-a-dice-1-spotlight
---

<img src="/assets/img/posts/logo_cube_potsuri.png" title="ロゴを立方体にしたもの" alt="ロゴを立方体にしたもの" width="1024" height="527" >

なんか当ブログのロゴってサイコロにしたら美味しそうだなぁーって作成当時から思っていました。<br>
今回はサイコロを追従するスポットライトの実装をしていきます。

## 目次

## 使用技術

- @react-three/fiber
- @react-three/drei
- @react-three/cannon
- zustand
- Blender

めっちゃ久しぶりに Blender 触りました。モディファイアの適用後に「あ〜ここ直したいけどモディファイア適用しちまってるし、ctrl+z でももう戻れない！」っていうことが多々発生したので、blender ファイルも git で管理しようか迷っています。<br>
あとどうでもいいことなんですが、React Three Fiber ってどう表記したらいいか毎回悩んじゃいます。r3f って省略するのか、React-three-fiber ってハイフンで区切るのか空白で区切るのか、公式も揺れてるんじゃないかと思っています。

## まずはさておき 3D モデル作成

<img src="/assets/img/posts/logo_cube_blender.png" title="ロゴ立方体をBlenderで作成" alt="ロゴ立方体をBlenderで作成" width="1024" height="640" >

凝ったことはしていないのですが、フォントを読み込んでブーリアンで浮き彫りにしました。マテリアルは 2 枚で色をロゴと合わせています。マテリアルは Three.js 側で作成して貼り付けることもできるのですが、今回は容量も少なかったのでマテリアルも Blender で作成して出力しています。注意点として、各オブジェクト名（右上に表示されてるやつ）はオレンジ/グリーン共に命名しておいた方がいいと感じました。名前をつけておくと jsx で gltf を使用する際により直感的に操作しやすくなります。

### Web 上で確認

普段は[gltf Viewer](https://gltf-viewer.donmccurdy.com/)や[gltf Report](https://gltf.report/)で確認するのですが、今回は前者と合わせて[gltf-react-three](https://gltf.pmnd.rs/)も使用してみました。
<img src="/assets/img/posts/r3f-gltf-viewer.png" title="gltf-react-threeビュアーで確認中のロゴ立方体" alt="gltf-react-threeビュアーで確認中のロゴ立方体" width="1024" height="559" >

jsx で gltf を扱う際には gltfjsx を使用して最適化した jsx を吐き出してもらうことが多いのですが、このビュアーを使えばローカルでコマンドを実行しなくてもサイト上から jsx コードをコピペできるので非常に楽です。パネルからオプションを気軽に有効化できるのも助かりますね。

## 実装

サイコロをいい感じに追従するスポットライトとクリックで吹っ飛ばす機能、ダークモードでマテリアル色を変える実装について重点的に説明します。今回はスポットライトまわりです！<br>
その他の部分は大した実装してないので省きます（決してコミットを遡りたくないとかではない！）。

### スポットライトを追従させる

最初は Directional Light でえっか〜と思っていたのですが、見れば見るほど Directinal Light は直線で、スポットライトの円錐型なライトの方が影の具合がいいなと思い、スポットライトを選択しました。影は重くなるという印象を持っており、普段は積極的に影の描画をしたくないのですが、今回は影がないと物足りないということもあり実装しています。

また、実装を進めていく中で、スポットライトを固定設置して影を演出した際に、欲しい絵を描画できないことに気づきました。
<img src="/assets/img/posts/spotlight-comparison.png" title="スポットライトを固定・追従配置した場合の比較" alt="スポットライトを固定・追従配置した場合の比較" width="1023" height="534" >

固定配置だと場所によっては影が野暮ったい感じになってしまいます。その点、追従配置だと常にほぼ同じ角度・強さで光を当てることができるので、一定の影を描画することができます。現実ではスポットライトが追従するとなると無理がありますが、CG3D 空間なら実現できちゃうのが面白いですよね。

ライトを追従させるには追従対象の位置を常に把握しておかなくてはなりません。状態管理ライブラリの Zustand を使用してストアを作成します。また、実装後に気づいたのですが、ただ単にサイコロの`position`からライトの位置を計算した場合、サイコロの回転を考慮できずにサイコロと一緒にライトも回転してしまうため、`position`と一緒に`quaternion`も管理します。

```ts
import type { Quad, Triplet } from "@react-three/cannon";
import { create } from "zustand";

interface State {
  position: Triplet;
  quaternion: Quad;
}
interface Actions {
  setPosition: (position: Triplet) => void;
  setQuaternion: (position: Quad) => void;
}

export const useCubeStore = create<State & Actions>(set => ({
  position: [0, 0, 0],
  quaternion: [0, 0, 0, 0],
  setPosition: (position: Triplet) => set({ position: position }),
  setQuaternion: (quaternion: Quad) => set({ quaternion: quaternion }),
}));
```

作成したストアにサイコロの位置情報とクォータニオンを格納します。

```ts
const { setPosition, setQuaternion } = useCubeStore();
useEffect(() => {
  const positionUnsubscribe = api.position.subscribe(position => {
    setPosition(position);
    setBoxPosition(position);
  });

  const quaternionUnsubscribe = api.quaternion.subscribe(quaternion => {
    setQuaternion(quaternion);
  });

  return () => {
    positionUnsubscribe();
    quaternionUnsubscribe();
  };
}, [api, setPosition, setQuaternion]);
```

サイコロは物理で動かしているので、`react-three/cannon`を使用して物理サイコロにしています。`useBox()`がよこしてくれる`api`で位置情報をサブスクライブし、絶えずストアを更新しています。今回は一つのサイコロをコネクリ回しているだけなので大丈夫そですが、多数のオブジェクトを操作する場合はスロットルを設定したほうが良さそうです。パフォーマンスチューニングの回で詳しく説明します。

位置情報の取得ができたので、スポットライトに共有してあげます。

```tsx
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useCubeStore } from "stores/useGLStore";
import { Quaternion, SpotLight, SpotLightHelper, Vector3 } from "three";

const Lights = () => {
  const ref = useRef<SpotLight>(null!);

  // サイコロの情報を取得
  const cubePosition = useCubeStore(state => state.position);
  const cubeQuaternion = useCubeStore(state => state.quaternion);

  // サイコロの上面の法線を算出
  const upFaceNormal = new Vector3(0, 1, 0).applyQuaternion(
    new Quaternion(...cubeQuaternion)
  );

  // 位置算出
  const lightOffset = new Vector3(2, 4, 2);
  const lightPosition = new Vector3()
    .addVectors(new Vector3(...cubePosition), upFaceNormal)
    .add(lightOffset);

  useFrame(() => {
    if (ref.current) {
      ref.current.target.position.set(...cubePosition);
      ref.current.target.updateMatrixWorld();
    }
  });

  return (
    <>
      <ambientLight intensity={1.0} />
      <spotLight
        position={lightPosition.toArray()}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
        ref={ref}
        color={"#ff0000"}
        distance={10}
      />
    </>
  );
};

export default Lights;
```

前項でも触れましたがサイコロの上面を算出しているのは、サイコロの上下がわからない状態でただ単にライトの`position`に「サイコロの`position`+ライトベクトル」みたいな感じで算出した値を設定するアプローチだと、ライトもサイコロの回転の影響を受けてしまうからです。<br>
法線ベクトル（upFaceNormal）とサイコロの中心点（cubePosition）を加算して暫定的なサイコロの上面を取得し、さらにライトのオフセットを加算すれば、サイコロから斜め上に位置するライトの`position`が求まります。また、サイコロの移動に伴ってライトの向きも調整する必要があるため、`useFrame()`内でライトのターゲット位置を更新します。そして、その更新をワールド座標に反映させるために`.updateMatrixWorld()`を呼び出します。

<img src="/assets/img/posts/cube_light_complete.gif" title="サイコロを追従するスポットライト" alt="サイコロを追従するスポットライト" width="160" height="160" >

これでうまくサイコロに追従するライトを実装できました！実装する前はこんなにややこしい実装になるとは思っていませんでした。。**だが、まだ終わらない。**

### パフォーマンスチューニング

やっとの思いで実装したコードたちをパフォーマンスが悪いからという理由で切り捨てていきます。正直 60fps はすでに固いので、おまけ程度に思ってくだちい。

まず、サイコロの情報をストアに格納する部分でスロットルを導入します。`useThrottle()`は[こちらの記事](https://zenn.dev/catnose99/articles/0f0bb01ee6a940)を参考に実装しています。

```ts
/** 状態管理 */
const { setPosition, setQuaternion } = useCubeStore();

// スロットル
const handlePositionChange = useThrottle((position: Triplet) => {
  setPosition(position);
  setBoxPosition(position);
}, 100);

const handleQuaternionChange = useThrottle((quaternion: Quad) => {
  setQuaternion(quaternion);
}, 100);

useEffect(() => {
  const positionUnsubscribe = api.position.subscribe(handlePositionChange);

  const quaternionUnsubscribe = api.quaternion.subscribe(
    handleQuaternionChange
  );

  return () => {
    positionUnsubscribe();
    quaternionUnsubscribe();
  };
}, [api, setPosition, setQuaternion]);
```

スロットルで 100ms ごとに値をセットしに行くように間隔を広くしています。ただ、これだとやはり不十分で、サイコロが止まっているのに永遠にストアへの保存を繰り返す行為は無駄なので、次はそこを阻止しにいきます。

```ts
// useCubeStore.ts
export const useCubeStore = create<State & Actions>((set, get) => ({
  position: [0, 0, 0],
  setPosition: (newPosition: Triplet) => {
    const currentPosition = get().position;
    if (!tripletsAlmostEqual(currentPosition, newPosition, epsilon)) {
      set({ position: newPosition });
    }
  },
  quaternion: [0, 0, 0, 0],
  setQuaternion: (newQuaternion: Quad) => {
    const currentQuaternion = get().quaternion;
    if (!quadsAlmostEqual(currentQuaternion, newQuaternion, epsilon)) {
      set({ quaternion: newQuaternion });
    }
  },
}));
```

ストアに保存される前に`tripletsAlmostEqual()/quadsAlmostEqual()`という関数で現在の値と保存されようとしている値が近しい値かどうかチェックしています。「近しい値」という表現をしたのは、イコールで判定してしまうと浮動小数点の計算になるため、常に`false`（正確には行頭に!がついているため`true`）を返すようになるからです。各判定関数を見てみましょう。

```ts
// vec3用
export const tripletsAlmostEqual = (
  t1: Triplet,
  t2: Triplet,
  epsilon: number
): boolean => {
  const distance = Math.sqrt(
    Math.pow(t2[0] - t1[0], 2) +
      Math.pow(t2[1] - t1[1], 2) +
      Math.pow(t2[2] - t1[2], 2)
  );
  return distance < epsilon;
};
// vec4用
export const quadsAlmostEqual = (
  q1: Quad,
  q2: Quad,
  epsilon: number
): boolean => {
  const distance = Math.sqrt(
    Math.pow(q2[0] - q1[0], 2) +
      Math.pow(q2[1] - q1[1], 2) +
      Math.pow(q2[2] - q1[2], 2) +
      Math.pow(q2[3] - q1[3], 2)
  );
  return distance < epsilon;
};
```

各関数では`epsilon`という許容範囲を指定して、`epsilon`以下は近しい値として扱います。

さて、これで以前よりもコール数が減っているはずです。仕上げにライトまわりの実装を変更します。

```tsx
// useEffect依存ハック
const prevCubePosition = useRef(cubePosition);
const prevCubeQuaternion = useRef(cubeQuaternion);

const updateLight = useCallback(() => {
  if (!ref.current) return;

  // サイコロの上面を算出
  const upFaceNormal = new Vector3(0, 1, 0).applyQuaternion(
    new Quaternion(...cubeQuaternion)
  );

  // 位置算出
  const lightOffset = new Vector3(2, 4, 2);
  const lightPosition = new Vector3()
    .addVectors(new Vector3(...cubePosition), upFaceNormal)
    .add(lightOffset);

  ref.current.target.position.set(...cubePosition);
  ref.current.position.set(...lightPosition.toArray());
  ref.current.target.updateMatrixWorld();
}, [cubePosition, cubeQuaternion]);

useEffect(() => {
  updateLight();
}, []);

useEffect(() => {
  updateLight();

  prevCubePosition.current = cubePosition;
  prevCubeQuaternion.current = cubeQuaternion;
}, [cubePosition, cubeQuaternion, updateLight]);
```

まず、前の値を保持するために、`prevCubePosition`と`prevCubeQuaternion`を作成します。ref として宣言しているのは`useEffect()`の依存関係となり、不要なコールを防ぐためです。次に`updateLight`関数に処理をまとめています。また、以前は`useFrame()`で毎フレームごとに更新処理をしていたものを、useEffect()で処理するように変更しています。そして、`useEffect()`の依存配列には`cubePosition`と`cubeQuaternion`が入っているため、先ほど実装したスロットルと`epsilon`効果で更新頻度は以前と比べて格段に減りました。

物理演算を使用しているとは言え、元々低負荷な実装だったため、そこまで実感できる改善ではなかったかもしれないですが、何事もチリツモなのでリファクタして損はないと思いたいです！

## 終わりに

今回はサイコロ実装に関わるライトの実装を行いました。影が気に食わないからという理由でライトをサイコロに追従させるなんて、アーティスト気取りにも程がありますね。けしからん！！
