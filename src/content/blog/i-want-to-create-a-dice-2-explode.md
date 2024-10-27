---
title: サイコロを作りたい（2）吹き飛ばす
description: サイコロを吹き飛ばす機能の実装をしました。自然な「吹き飛ばし」を心がけました。
draft: false
featured: true
pubDatetime: 2023-05-08T15:21:50.990Z
modDatetime: 2023-05-10T13:00:48.806Z
tags:
  - CannonJs
  - JavaScript
  - React-three-fiber
  - ThreeJs
  - ReactJs
postSlug: i-want-to-create-a-dice-2-explode
---

<img src="/assets/img/posts/logo_cube_potsuri.png" title="ロゴを立方体にしたもの" alt="ロゴを立方体にしたもの" width="1024" height="527" >

前回はスポットライトの実装について解説したので、今回はサイコロをクリックした際に吹っ飛ばす機能を実装していきます。

## 目次

## 使用技術

今回から主要パッケージとバージョンをちゃんと明記します（したい）。

| パッケージ名        | バージョン |
| ------------------- | ---------- |
| @react-three/fiber  | 8.13.0     |
| @react-three/drei   | 9.66.1     |
| @react-three/cannon | 6.5.2      |
| zustand             | 4.3.7      |

## 実装

トライアンドエラーで実装していきます。<br>
─=≡Σ((( つ•̀ω•́)つ

### 下準備（物理場）

前回の時に床作りの説明をしていなかったので、床から作り始めます。どうしてライトの実装から始めてしまったんや。。。

@react-three/cannonでは、まずは物理演算を適用させる世界を宣言しなくてはなりません。

```tsx
export default function MyGL() {
  const mode = useMode();

  return (
    <Suspense fallback={null}>
      <Canvas
        shadows
        gl={{ alpha: false }}
        camera={{ position: [-5, 10, 5], fov: 50 }}
      >
        <Environment preset="sunset" />
        <Lights />

        <Physics broadphase="SAP">
          <Debug color="red" scale={1.1}>
            {/* ここにサイコロや床などの物理演算を適用させたコンポーネントを配置する。 */}
          </Debug>
        </Physics>
        <OrbitControls makeDefault />
        <Stats />
      </Canvas>
    </Suspense>
  );
}
```

`<Physics></Physics>`の内側に物理演算を適用させたサイコロなどを配置します。プロパティ`broadphase`では衝突検出の前段階として働くアルゴリズムを指定できます。今回は「SAP」と呼ばれるアルゴリズムを指定しています。詳しくは[cannon-es のドキュメント](https://pmndrs.github.io/cannon-es/docs/classes/Broadphase.html)を確認してみてください。<br>
また、デバッグの際はさらに`<Debug></Debug>`で囲むと内にあるオブジェクトにワイヤーフレームが追加されるので、認識しやすくなります。

### 下準備（床）

物理場ができたので床を設置します。

```tsx
const Plane = (props: PlaneProps) => {
  const [ref] = usePlane(
    () => ({
      rotation: [-Math.PI / 2, 0, 0],
      ...props,
    }),
    useRef<Mesh>(null)
  );
  return (
    <group>
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial />
      </mesh>
    </group>
  );
};

export default Plane;
```

@react-three/cannonの`usePlane`をプレートに適用し、物理を適用します。現段階では特に変なことはしていません。物理場である`<Physics></Physics>`の中で宣言することを忘れないでください。

### 下準備（サイコロ）

サイコロを召喚します。

```tsx
useGLTF.preload("/assets/model/logocube.glb");

const Model = (props: BoxProps) => {
  const { nodes, materials } = useGLTF(
    "/assets/model/logocube.glb"
  ) as GLTFResult;

  return (
    <group>
      <group position={[0, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.kuang.geometry}
          material={materials.gold}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.neihong.geometry}
          material={materials.neise}
        />
      </group>
    </group>
  );
};

export default Model;
```

使用している3Dモデルはマテリアルを分けているため、2つメッシュが存在します。テクスチャにベイクしている場合などは1つのメッシュで済みそうですね。また3Dモデルでよくあるミスが Blenderでスケールを正規化せずにエクスポートしちゃうことです。何かとずれが生じるのでスケールは正規化しましょう。今回はサイズも1に合わせたかったので、Blender側でxyzそれぞれ1mの立方体にしています。

### onClick

いよいよクリックイベントを設定します。r3fはレイキャストを設定しなくてもクリックイベントを簡単に実装できるのは神過ぎます。先に床と同じ要領で物理を適用します。

```tsx
const [boxRef, boxApi] = useBox(
  () => ({
    mass: 1,
    position: [0, 10, 0],
    rotation: [
      Math.PI * Math.random(),
      Math.PI * Math.random(),
      Math.PI * Math.random(),
    ],
    args: boxSize,
    ...props,
  }),
  useRef<Group>(null!)
);
```

`mass`というのは質量を表しています。基本`1`でいいかなと思います。<br>
useBoxの返り値は`ref`と`api`です。`ref`は今回の場合は`<group>`にくっつけます。物理オブジェクトのプロパティや状態を制御するための機能を提供する`api`を使用してクリックイベントを実装していきます。

```tsx
const handleClick = () => {
  const impulse: Triplet = [1, 2, 0]; // x, y, z軸方向の力
  const worldPoint: Triplet = [0, 0, 0]; // オブジェクト中心に力を適用
  boxApi.applyImpulse(impulse, worldPoint);
};
```

`api.applyImpulse()`はオブジェクト（今回はBox）に衝撃を与えることができます。第一引数に衝撃の方向ベクトル、第二引数に衝撃力が適用されるオブジェクト上の点を指定します。また、各変数を`Triplet`で型付けしていますが、`three`の`Vector3`でも大丈夫です。<br>
では実装したサイコロをクリックしてみます。

<img src="/assets/img/posts/make_a_clickable_cube_1.gif" title="画面外に飛ばされるサイコロ" alt="画面外に飛ばされるサイコロ" width="457" height="236" >

一応は物理演算が適応されているので、今の状態でもいい感じではありますね。しかし、画面外に見切れてしまうのはよろしくないので、クリック時の衝撃が常にSceneの原点へ向くようにしてみましょう。

```tsx
const onClickHandler = () => {
  const target = new Vector3(0, 2, 0); // オブジェクトが向かうべきターゲット（画面の中心）

  // オブジェクトの位置からターゲットへの方向ベクトルを計算
  const direction = target
    .clone()
    .sub(new Vector3(...boxPosition))
    .normalize();

  // 衝撃力の大きさ
  const forceMagnitude = 3.5;
  const minOffset = 4.5; // 最小のオフセット値を設定

  // 衝撃力を方向ベクトルに適用
  const impulse: Triplet = [
    forceMagnitude *
      (direction.x + (direction.x >= 0 ? minOffset : -minOffset)),
    forceMagnitude *
      (direction.y + (direction.y >= 0 ? minOffset : -minOffset)),
    forceMagnitude *
      (direction.z + (direction.z >= 0 ? minOffset : -minOffset)),
  ];

  // トルクの値をランダムに設定
  const torque: Triplet = [
    (Math.random() - 0.5) * Math.PI,
    (Math.random() - 0.5) * Math.PI,
    (Math.random() - 0.5) * Math.PI,
  ];

  const worldPoint: Triplet = [0, 0, 0];
  boxApi.applyImpulse(impulse, worldPoint);
  boxApi.applyTorque(torque);
};
```

簡単にいうとサイコロの位置から原点までの方向ベクトルを算出し、さらにトルクと呼ばれる回転力もランダムに決めて、サイコロに設定しています。これでサイコロが画面外に吹っ飛んでいくことはほとんどなくなったと思うのですが、この記事書いてる途中に「`impulse`と`torque`両方設定するんじゃなくて、`torque`だけでよくないか？」と思って実装してみたら、`torque`だけの実装の方が理想的なサイコロの動きだったので、そっちも紹介します。

```tsx
const onClickHandler = () => {
  // スケーリングファクターを追加して、トルクの大きさを調整
  const torqueScalingFactor = 180;
  //
  const torqueWeight = 0.9;
  // キューブの上方向ベクトル
  const cubeUpDirection = new Vector3(0, 1, 0);

  // キューブの位置から [0, 0, 0] への方向ベクトルを計算
  const directionToOrigin = new Vector3(...boxPosition).negate().normalize();

  // トルクを計算（外積）
  const torque = cubeUpDirection
    .clone()
    .add(
      new Vector3(
        (Math.random() - 0.5) * torqueWeight,
        (Math.random() - 0.5) * torqueWeight,
        (Math.random() - 0.5) * torqueWeight
      )
    )
    .cross(directionToOrigin)
    .normalize() // トルクベクトルを正規化
    .multiplyScalar(torqueScalingFactor)
    .toArray() as Triplet;

  boxApi.applyTorque(torque);
};
```

コメント書いてるのでそこを読めば理解はできると思いますが、トルク計算の部分でランダムベクトルを追加しているのは、ランダム要素を入れないとサイコロが直線を行ったり来たりするだけになって見栄えが悪いからです。ランダムベクトルを加えることにより、ベクトルの向きの大筋は原点に向いてるけど、ちょっとずれている状態を演出しています。<br>
またこの実装の場合、サイコロと床の`friction`（摩擦係数）と`restitution`（反発係数）をいい感じに設定してあげなければ、摩擦が大き過ぎて動かないことがあります。

```tsx
// サイコロ
const [boxRef, boxApi] = useBox(
    () => ({
        mass: 1,
        material: {
            friction: 0.1, // 摩擦係数,大きいほど摩擦が強い
            restitution: 0.3, // 反発係数
        },
        ...以下略
```

```tsx
// 床
const [ref] = usePlane(
    () => ({
        material: {
            friction: 0.2,
            restitution: 0.2, // 反発係数
        },
        ...以下略
```

<img src="/assets/img/posts/make_a_clickable_cube_2.gif" title="サイコロがうまく画面内に収まっていい感じに転がっている図" alt="サイコロがうまく画面内に収まっていい感じに転がっている図" width="600" height="371" >

うまく実装できました٩(๑>∀<๑)۶

## 終わりに

今回はサイコロにクリックイベントを付与して転がすところの実装を解説しました。ただ、現状の実装だと連続でクリックできちゃうので、その辺も制限かけないとダメですね。また、最近は`@react-three/rapier`に注目が集まっていて、Rust製で軽いだとか聞くので、またこのサイコロも`@react-three/rapier`で書き換えたいです。
