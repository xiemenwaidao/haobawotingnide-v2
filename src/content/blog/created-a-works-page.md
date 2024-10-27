---
title: Worksページを作成しました
description: Worksページを作ったので、制作物の説明を書きました。
draft: false
featured: false
pubDatetime: 2023-04-25T23:08:00.000Z
modDatetime: 2023-05-06T07:14:57.026Z
tags:
  - Blender
  - JavaScript
  - ReactJs
  - ThreeJs
  - Vercel
  - VueJs
  - React-three-fiber
postSlug: created-a-works-page
---

<a href="" target="_blank"><img src="&#x2F;assets&#x2F;img&#x2F;posts&#x2F;works_captcha.png" alt="worksキャプチャ" title="worksキャプチャ" width="1024" height="554" ></a>

## 目次

## はじめに

よく見るイケイケなポートフォリオサイトの Works ページに憧れがあり、自身のサイトを作る際には絶対に作りたいと思っていました。制作途中で放置しているようなヘボヘボ Works しかアップしていませんが、これからどんどん増やしていけたらいいなぁと思っています。<br>
一応覚えているうちに各サイトの説明などを残しておきます。

## works（作成日降順）

### jikka-2022-1

<a href="https://jikka-2022-1.vercel.app/" target="_blank"><img src="&#x2F;assets&#x2F;img&#x2F;works&#x2F;jikka-2022-1.png" alt="jikka-2022-1" title="jikka-2022-1" width="640" height="350" ></a>
_created_at:2022/1_<br>
実家にある神殿を作成しました。後継者問題で悩んでいる宗教 2 世の方って多いと思うんですが、誰も継がなくていい教会があればいいなと思い、作成しました。めちゃくちゃ制作途中で放置していたのですが、せっかくここまで作っていたので Web 上にアップしてみました。

現時点では r3f を使用して組んでいます。ページ遷移を追加する場合も見込んで、組み直すときに Next.js にしようと思っています。<br>
3D モデルは実家の写真に思い出補正をかけて Blender で作成しました。現在の実家の神殿は新しくなってしまい風情がなくなっていたので、リフォーム前の姿を思い出しながら絵作りに取り組みました。

### orange

<a href="https://orange-nine.vercel.app/" target="_blank"><img src="&#x2F;assets&#x2F;img&#x2F;works&#x2F;orange.png" alt="orange" title="orange" width="640" height="350" ></a>
_created_at:2021/12_<br>
React-three-fiber（r3f）がどうやらすごいらしいとのことを Twitter で見かけたので、入門して作ってみたやつです。<br>
[こちら](https://0xca0a.gumroad.com/l/B4N4N4S)のチュートリアルで入門しました。glft を React のコンポーネントに変換するパッケージを使ったりとテクニック満載のチュートリアルです。

### lowpoly-room

<a href="https://lowpoly-room.vercel.app/" target="_blank"><img src="&#x2F;assets&#x2F;img&#x2F;works&#x2F;lowpoly-room.png" alt="lowpoly-room" title="lowpoly-room" width="640" height="349" ></a>
_created_at:2021/11_<br>
当時流行っていた[Three.js Journey](https://threejs-journey.com/)を完走した記念に作ったやつです。Three.js Journey ではたくさんの知識を学びました。<br>
3D モデルは[bilibili の Blender 入門動画](https://www.bilibili.com/video/BV1qq4y1772P/?share_source=copy_web)で作ったものです。動画を通して作成した 3D モデルを Web 上にアップしても良いか、動画の作者である[羊羊羊的教室さん](https://space.bilibili.com/299275195/)に確認をとった上でアップしています。最近更新が止まっていて残念ですが、当時この動画で Blender を学べて本当に良かったです（約 7 時間半の超大作入門動画です 😇）。ありがとうございました 🙇🏻‍♂️

この時期に TypeScript の学習も始めたので、最初は Vanilla で作成していたのですが、のちに TypeScript で置き換えました。また、スライダーで部屋の明るさの変化を表現している部分は、Three.js Journey の作者である[Bruno Simon 氏の Twitch 配信](https://www.twitch.tv/bruno_simon_dev)を参考に Blender を用いて Bake 画像を作成して表現しました。水面と焚き火の炎は Blender で作成したものを Three.js で使えなかったので、Three.js で一から構築しています。

### solarSystem

<a href="https://menxielijiao.github.io/solarSystem/" target="_blank"><img src="&#x2F;assets&#x2F;img&#x2F;works&#x2F;solarSystem.png" alt="solarSystem" title="solarSystem" width="640" height="349" ></a>
_created_at:2021/6_<br>
WebGL スクールを受講した際の課題で作成したものです。課題のお題は「地球」だったような気がします。地球や他の惑星の大きさと距離を調べたり、NASA の画像を使用したりして実装した記憶があります。適度にリアルを追求することの大切さを学びました。

### Fan

<a href="https://menxielijiao.github.io/Fan/" target="_blank"><img src="&#x2F;assets&#x2F;img&#x2F;works&#x2F;Fan.png" alt="Fan" title="Fan" width="640" height="350" ></a>
_created_ad:2021/6_<br>
WebGL スクールの「扇風機」という課題で作成したものです。ただ扇風機を作るだけだと面白くないと思い、変わったものを作ってしまいました。悪い癖ですね(´・ω・｀)

### webglschool2021_three001

<a href="https://menxielijiao.github.io/webglschool2021_three001/" target="_blank"><img src="&#x2F;assets&#x2F;img&#x2F;works&#x2F;webglschool2021_three001.png" alt="webglschool2021_three001" title="webglschool2021_three001" width="640" height="349" ></a>
_created_at:2021/5_<br>
WebGL スクールの「Box」という課題で作成したものです。謎に結構気に入っています。タップと画面の描画が妙にしっくりリンクしていることにより、謎の一体感が生まれて気持ちいいです。

## 終わりに

振り返ってみると、個人で制作しているものは全て 3D 関連なんですね。どんだけ好っきやねんって感じです。今後は、このブログのようなアプリケーションも作っていきたいですし、3D 関連の制作途中であげているものもちゃんと作り直したいです。<br>
また works に上げれるような作品ができたら、この記事をアップデートするかもしれないですし、新しく記事にして紹介するかもしれません。works の更新頻度を上げれるように個人開発を頑張っていきたいです(๑•̀o•́๑)۶
