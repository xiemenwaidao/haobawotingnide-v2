---
title: nodenvからvoltaへ移行した
description: node.jsのパッケージ管理ツールをnodenvからvoltaへ移行しました。
draft: false
featured: false
pubDatetime: 2023-05-10T07:51:41.135Z
lastmod: 2023-05-10T07:51:43.903Z
tags:
  - NodeJs
  - Tool-Manager
  - M1Mac
postSlug: migrated-from-nodenv-to-volta
---

<img src="/assets/img/posts/volta_logo.png" title="Voltaロゴ" alt="Voltaロゴ" width="840" height="373" >

node.jsのパッケージ管理をnodenvからvoltaに移行したのでメモを残しておきます。なんだかんだで毎年node.jsのパッケージ管理ツールを移行したりインストールしたりする中で沼ってます。

## 目次

## さらばnodenv

Homebrew経由でAnyenvをインストールしており、そこからさらにnodenvをインストールして使っていました。いや、正直そこまで使いこなしていませんでした。Windows環境でVoltaを使用していたこともあったのでVoltaを調べてみると、Macでも普通に動くらしいので（なぜか今までM1では動かないと誤認していた）早速nodenvからおさらばします。

```shell
nodenv -v # 一応存在確認

anyenv uninstall nodenv # 削除

# node.jsも消えてるか一応確認
ls ~/.anyenv/envs/nodenv/versions/
# シェルを再読み込み
source ~/.bashrc # bashを使用している場合
source ~/.zshrc # zshを使用している場合

node -v # 一応消えてるか確認
```

anyenvを使用している場合、`.zshrc(.bashrc)`に`eval "$(anyenv init -)`の記述があると思いますが、この行は消さないように注意しましょう。

## ようこそVolta!

ではnodenvも綺麗さっぱりなくなったことですし、心機一転、Voltaをインストールしましょう。

```shell
curl https://get.volta.sh | bash
volta -v # voltaがインストールされたか確認

cat ~/.zshrc # pathが通っているか確認
source ~/.zshrc # シェル再起動

volta install node
volta install npm
volta install yarn

volta list all # 上記がちゃんとインストールされたか確認
```

voltaはプロジェクト毎にパッケージのバージョン指定ができるんですよね。最高かよ！

```shell
volta pin node@18.14.0
```

## 余談

Voltaをインストール後にSourceTreeでコミットしようとしたところ、huskyで躓きました。

```shell
npm: command not found
husky - pre-commit hook exited with code 127 (error)
```

色々調べたところ、[こちらの記事](https://qiita.com/mog_03/items/c46d1976e2c2d43f44bc)にあるように、`.huskyrc`を作成したらコミットできました！

```shell
echo "export PATH=\"$(dirname $(which node)):\$PATH\"" > ~/.huskyrc
```

## 終わりに

環境構築ってどうしても躓きがちになるので、今後も躓いたら当ブログで供養したいと思います。
