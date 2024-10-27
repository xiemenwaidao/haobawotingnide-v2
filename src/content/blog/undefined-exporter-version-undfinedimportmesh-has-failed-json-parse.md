---
title: 【ERROR ⇨ Babylon.js】undfinedimportMesh has failed JSON PARSE
description: Babylon.jsで遭遇したエラーの備忘録
draft: false
featured: false
pubDatetime: 2023-05-23T11:34:05.243Z
modDatetime: 2023-05-23T11:34:09.695Z
tags:
  - BabylonJs
  - Vite
  - JavaScript
postSlug: undefined-exporter-version-undfinedimportmesh-has-failed-json-parse
---

<img src="/assets/img/posts/babylonjs_import_glb_error.png" title="babylonjs error: undefinedimportScene has failed JSON parse" alt="babylonjs error: undefinedimportScene has failed JSON parse" width="2048" height="902" >

## 目次

## 本題

Babylon.jsにてglbファイルをインポートしようとしたところ、エラーが出て解決に時間がかかったので、備忘録を残しておきます。

### 使用パッケージ

| name               | version |
| ------------------ | ------- |
| vite               | 4.3.2   |
| typescript         | 5.0.2   |
| babylonjs          | 6.4.1   |
| babylonjs-loaders  | 6.4.1   |
| @babylonjs/core    | 6.4.1   |
| @babylonjs/loaders | 6.4.1   |

### エラー本文

```bash
 RuntimeError: Unable to load from /model/miku.glb: importScene of undefined from undefined version: undefined, exporter version: undefinedimportScene has failed JSON parse
    at RuntimeError2.BaseError2 [as constructor] (error.ts:7:1)
    at new RuntimeError2 (error.ts:76:9)
    at errorHandler (sceneLoader.ts:968:46)
    at Object.load (babylonFileLoader.ts:1011:17)
    at sceneLoader.ts:1005:39
    at dataCallback (sceneLoader.ts:552:13)
    at fileTools.ts:388:9
    at XMLHttpRequest.onReadyStateChange (fileTools.ts:502:33)
```

### 解決方法

使用パッケージを見てお気づきかもしれないですが、`babylonjs`を使用しているなら`babylonjs-loaders`を、`@babylonjs/core`を使用しているなら`@babylonjs/loaders`を使用すればエラーは出なくなるはずです。。。<br/>
こんなことで数時間取られたのが情けない(T^T)g

当初は以下のようなコードを書いていました。

```ts
import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";

...
```

これを以下のように変更したらうまく3Dモデルが召喚されるはずです。

```ts
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

// or

import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
```

<img src="/assets/img/posts/babylon-miku.gif" title="errorを乗り越えて初音ミクが表示された図" alt="errorを乗り越えて初音ミクが表示された図" width="446" height="121" >

ちゃんと表示されました！！

## 終わりに

今回はBabylon.jsにてglbファイル読み込み時に遭遇したエラーを紹介しました。こんな一瞬で解決できるようなエラーに僕はハマってしまったわけですが、多くの方が一瞬で解決できるよう、備忘録として書き残しました。

現在絶賛Babylon.js入門中なのですが、Three.jsに比べて日本語の技術記事が少なく、何より公式サイトが使いづらいと感じてしまっています。これは慣れ不足なのでしょうか？ちゃんと使いこなせるように精進するとともに、日本語記事を供給するために遭遇したエラーは逐一ここに報告したいと思っています。
