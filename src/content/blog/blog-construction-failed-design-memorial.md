---
title: ブログ構築ボツ案供養
description: ""
draft: true
featured: false
pubDatetime: 2023-04-10T08:03:58.000Z
lastmod: 2023-05-06T07:14:21.135Z
tags:
  - AstroJs
  - WordPress
postSlug: blog-construction-failed-design-memorial
---

当ブログを立ち上げる際に結局ボツになった技術スタックをこの記事で供養したいと思います。
途中まで開発をゴリゴリ進めていて勉強になった点も多々あるため、記録としてここに残しておきます。

## 目次

## 構成

```
├── compose.yaml
├── docker
│   ├── nginx
│   │   ├── Dockerfile
│   │   ├── host.conf
│   │   └── nginx.conf
│   └── php
│       └── Dockerfile
└── website
    ├── env
    ├── wordpress
    └── front
```

WordPress+Astro のヘッドレス構成です。Twitter の TL で最近よく見かける構成だったので、ミーハーな僕はすぐ食いつきました。

### 環境構築

Docker 構築はまだまだ初心者なので、ChatGPT に聞きながら構築しました。気をつけた点としては M1 Mac での開発だったので MySQL の導入は色々めんどくさくて代わりに MariaDB を導入したことです。ChatGPT-3.5 に「M1 Mac 用の構築」をお願いしたところ、初回は Apple Silicon を考慮できていない構築の提案をされましたが、「M1 Mac であることを考慮してください」と入力するとちゃんと考慮された構築を出力してくれました（すごい！！）。また今回は phpMyAdmin ではなく[Adminer](https://www.adminer.org/)と言うデータベース管理ツールを使用してみました。phpMyAdmin と同じくパワフルで使い勝手が良さげですが、UI がちょっとごちゃついてる感は否めないなと思いました。

### WordPress

`website/wordpress`に WordPress を展開してます。WordPress はプラグイン管理に Composer が使えて何かと便利なボイラーテンプレートである[Bedrock](https://roots.io/bedrock/)を採用しました。正直現状の WordPress 開発は Bedrock 一択なんじゃないかなと思ってますが、他にも何か良い開発方法がないか模索中です。
WPGraphQL を導入しヘッドレス CMS 化するのですが、デフォルトテーマの「twentytwentythree」のまま開発を進めると、WP 管理画面から graphql IDE がうまく動作しませんでした。翻訳ファイルのアップデートをかけると動作しなくなる様なので、

- 翻訳フ-ァイルをアップデートしない
- 翻訳ファイルをアップデート後、エラーの出ている箇所を自分で修正
- 管理画面の設定言語を英語に変更する
  上記のいずれかを実行すると IDE が動作するようになります。僕は(2)の翻訳ファイルを自分で編集することでエラー回避しました(　 ˙³˙)git のログに「Blank:空白とブログ何ちゃらのカラムを削除（エラー回避のため」とあったので、その辺を編集すれば回避できると思います（うろ覚えですみません）。

### Astro

`website/front`に展開してます。Astro は未履修だったので[公式チュートリアル](https://docs.astro.build/en/tutorial/0-introduction/)から始めました。

## なぜボツになったのか

WordPress を
