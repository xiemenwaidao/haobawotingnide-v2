---
title: 羊肉串専門のレビューサイトを作りました
description: 気の迷いでとてもニッチなサイト作っちゃった話
draft: false
featured: false
pubDatetime: 2023-07-26T16:29:52.084Z
modDatetime: 2023-07-26T16:29:53.950Z
tags:
  - googlemap
  - JavaScript
  - NextJs
  - ReactJs
  - T3Stack
  - TypeScript
  - Vercel
  - Zustand
  - tRPC
postSlug: deployed-yangrouchuan-love
---

<a href="yangrouchuan.love" target="_blank"><img src="&#x2F;assets&#x2F;img&#x2F;posts&#x2F;yangrouchuan_love_top.png" alt="羊肉串倶楽部トップページ" title="羊肉串倶楽部トップページ" width="1024" height="764" ></a>

## 目次

## はじめに

何を血迷ったのか、[羊肉串倶楽部](https://yangrouchuan.love) というサイトを作ってしまいました。もっと作りたいサービスがあったはずなのに、気づいたらこのサイトを作っていました。今回は羊肉串倶楽部の制作にあたっての経緯など諸々を書いていきます。

## 制作経緯

サイトタイトルにもある「羊肉串」という単語を聞いてもパッとしない人が多いのではないでしょうか？実際に日本語的には「ラム肉の串焼き」と表記した方がいいのかもしれません。しかし、中国語では「羊肉串」が一般的な表記であり、ほとんどの「羊肉串」愛好家は中国経由で羊肉串に出会っていると推測されることから、このサイトのタイトルは「羊肉串倶楽部」としました。

さて、なぜこのサイトを作ったのかというと、私が羊肉串が大好きだからです。しかし日本では羊肉串を食べることができる店舗が少なく、ガチ中華（中国人経営の中華料理屋）に入っても羊肉串があるとは限りません。そこで、羊肉串を食べたいと思った時に、羊肉串が食べられるお店を探すことができるサイトがあればいいなと思い、このサイトを作ることにしました。

## 技術スタック

大筋は[T3Stack](https://create.t3.gg/)で構築しています。Vercelでホスティングし、認証はNextAuthではなく[Clerk](https://clerk.com/)を使用、データベースは[PlanetScale](https://planetscale.com/)を使用しています。画像保存は[Supabase](https://supabase.com/)と迷ったのですが、最終的に[Cloudflare Images](https://www.cloudflare.com/ja-jp/developer-platform/cloudflare-images/)にアップロードしています。また、GoogleMapを使用してお店の位置情報を表示しています。GoogleMap関連のAPIで従量課金の無料枠を超えない限りは、Cloudflare Imagesへの$6〜/月の支払いで運用できるようになっています😭

## 開発にあたっての苦労

開発中に苦労した点をいくつか紹介します。

### スタイリング / UIライブラリ

CSSは非常に悩みました。T3Stackでは[Tailwindcss](https://tailwindcss.com/)を推奨しているので当初はTailwindでスタイリングしようと思ったのですが、当サービスを作るにあたって絶対実装したかった住所検索機能を実装するためには[ComboBox](https://wa3.i-3-i.info/word11628.html)を実装する必要があり、ComboBox実装のために[MUI](https://mui.com/)を導入するとTailwindが窮屈になってしまうため、最終的にはTailwindを採用しませんでした。Tailwindと親和性のある[RedixUI](https://www.radix-ui.com/)（[shadcn/ui](https://ui.shadcn.com/)）も検討しましたが、今度は当サービスで採用している[React Hook Form](https://react-hook-form.com/)と相性が悪かったため、採用しませんでした。[ChakraUI](https://chakra-ui.com/)（最近パクリ騒動もあって印象が悪い）や[DaisyUI](https://daisyui.com/)も試してみたのですが、採用には至りませんでした。結局、当サービスではMUIを採用しています。

### GoogleMap関連

#### 料金体制の理解

まず、Google Maps Platformの料金体制の理解が難しかったです。これに関してはまず使用してみて課金感覚を掴んでみるのが一番理解が早いと思います。

#### ライブラリ選定

Next.js上で楽に動かしたいのでReact製のラッパーライブラリを探したのですが、現時点ではどのライブラリもパッとしませんでした。OSSを使わせていただいている身としてライブラリの作者の方々には申し訳ないのですが、現状どのライブラリも不安定で、非常に心許ないです。Google Maps Platformの[公式YouTubeチャンネル](https://www.youtube.com/@GoogleMapsPlatform)でもReactを使用したGoogleMapの各種実装方法を紹介しているのですが、回を重ねるごとにライブラリを変更しており、公式自体もどのライブラリを推奨しているのかわからない状態です。GoogleがReact用のライブラリを公式で提供してくれることを切に願います。

今回はMapのロード等の全体で[@react-google-map/api](https://github.com/JustFly1984/react-google-maps-api)を採用し、Place APIのリクエスト（検索ボックス）で[use-places-autocomplete](https://github.com/wellyshen/use-places-autocomplete)、マーカーのクラスタリング（店舗一覧）で[@googlemaps/markerclusterer](https://github.com/googlemaps/js-markerclusterer)を採用しました。@react-google-map/apiはドキュメントが充実しているかと思いきや、[突然ドキュメントを削除](https://github.com/JustFly1984/react-google-maps-api/issues/3261)してしまったりと非常に不安定なライブラリという印象です。もっと強いエンジニアになってGoogleMapのReactラッパーライブラリを自作したいと思わされます。

### React Hook Form

React Hook Formは今回初めて使いしました。Zodとの組み合わせが非常に強力がゆえに制限も多く、何度も躓きました。MUIとの連携も非常にややこしく、知見が多くたまったかなと思います。

## まとめ

一応開発が1段落したということで、今回の記事を書いてみました。今後はこのサイトをどう運用していくか考えていきたいと思います。ブックマーク機能やユーザーページに投稿数に応じて変化するバナー、ゲストブックなども実装したいと考えています。
