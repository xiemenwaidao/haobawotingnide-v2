---
title: ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with 〜エラー
description: Vercelデプロイ時にエラーに遭遇したので備忘録として残しておきます。
draft: false
featured: false
pubDatetime: 2023-04-10T16:20:00.000Z
lastmod: 2023-05-10T12:56:04.661Z
tags:
  - Vercel
postSlug: err-pnpm-outdated-lockfile-cannot-install-with-frozen-lockfile-because-pnpm-lock-yaml-is-not-up-to-date-with-package-json
---

## 目次

## 本題

<img src="/assets/img/posts/vercel_error_230410.png" title="vercel build時のエラー" alt="vercel build時のエラー" width="1024" height="508" >

Vercel デプロイ時にこのようなエラーが発生しました。

```shellscript
[22:52:17.564] ERR_PNPM_OUTDATED_LOCKFILE Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json
[22:52:17.564]
[22:52:17.564] Note that in CI environments this setting is true by default. If you still need to run install in such cases, use "pnpm install --no-frozen-lockfile"
[22:52:17.591] Error: Command "pnpm install" exited with 1
[22:52:17.946] BUILDUTILSSPAWN_1: Command "pnpm install" exited with 1
```

最近、エラー発生時には ChatGPT 様にお伺いを立てる用にしているので、即座にコピペで伺いました。以下 ChatGPT の回答です。

> 上記のエラーメッセージは、 pnpm を使用して依存関係をインストールしようとしているときに発生したエラーです。メッセージの最後に BUILDUTILSSPAWN_1: Command "pnpm install" exited with 1 とあるように、pnpm install コマンドが失敗していることを示しています。また、ERR_PNPM_OUTDATED_LOCKFILE というエラーメッセージが表示されています。これは、 pnpm-lock.yaml ファイルが package.json ファイルと最新の状態でないため、 frozen-lockfile オプションを使用して依存関係をインストールすることができないことを意味しています。この問題を解決するには、 pnpm-lock.yaml ファイルを package.json ファイルと同期させる必要があります。まず、ローカルマシンで pnpm install コマンドを実行し、依存関係を更新します。次に、更新された pnpm-lock.yaml ファイルをリポジトリにコミットして、再度 vercel でビルドを実行してください。もう 1 つのオプションとして、 --no-frozen-lockfile オプションを使用して pnpm install コマンドを実行することができます。これにより、 pnpm-lock.yaml ファイルが最新でなくても依存関係をインストールできます。ただし、このオプションを使用すると、パッケージの依存関係が変更される可能性があるため、開発環境でのみ使用することをお勧めします。

実はデプロイする前に package-lock.json と pnpm-lock.json を削除（どこかのタイミングで 2 種類の lock ファイルが生成されていて、気持ちが悪かった）しており、その差分をコミットに含めていませんでした。すぐさま更新後の package.json と lock ファイルをデプロイするとビルドが通りました〜！

## 最後に

無事ビルドが通ってよかったです。本当に ChatGPT 様様です。ChatGPT の出現により開発体験がガラッと変わった気がします。ただ、上記の回答以外にも何回か Regenerate response していたのですが、

> Vercel の Environment Variables に、SKIPPREFLIGHTCHECK=true を追加します。
> プロジェクトルートに、.npmrc というファイルを作成し、unsafe-perm=true を追加します。

などといった欲しい答えではない回答をすることもありました。GPT-3.5 を使用しているためかもしれませんが、返答の真偽性をちゃんと見極める必要がありそうです。

## 追記（23/4/14）

Vercel のビルドログにてまだエラーが出ているのに気づきました。ビルドは成功しているのでおかしいなぁと思っていたところ、og 画像生成プログラムの部分で当記事のタイトル名.png を`console.info()`で出力している箇所にてログの文字色が赤色に設定されていたため、エラーじゃないのにエラーっぽく見えていただけでした。<br>
おそらく「ERR」の文字を認識して文字色を変えているのかと思うので、今後タイトルには気をつけたいです 😓
