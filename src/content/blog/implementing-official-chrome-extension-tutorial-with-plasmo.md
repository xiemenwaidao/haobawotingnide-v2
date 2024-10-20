---
title: Chrome拡張機能公式チュートリアルをPlasmoで実装する
description: Plasmoって知ってっか？なんでも拡張機能がカンタンに作れるんだってな！おら、ワクワクしてきたぞ！！
draft: false
featured: false
pubDatetime: 2023-04-19T08:58:00.000Z
lastmod: 2023-05-06T07:14:44.016Z
tags:
  - chrome-extension
  - JavaScript
  - ReactJs
postSlug: implementing-official-chrome-extension-tutorial-with-plasmo
---

<img src="/assets/img/posts/plasmo_logo.png" title="plasmoロゴ" alt="plasmoロゴ" width="1024" height="281" >

Chrome 用の拡張機能を作ってみたくなったので[公式チュートリアル](https://developer.chrome.com/docs/extensions/mv3/getstarted/)をやってみました。<br>
今回は[Plasmo](https://www.plasmo.com/)というブラウザ拡張機能開発用のフレームワークを使って実装していきます。

## 目次

## Plasmo とは

Plasmo は、拡張機能の構築・テスト・デプロイを支援するブラウザ拡張プラットフォームです。ブラウザ拡張機能に対して深い知識がなくてもすぐに構築できます。<br>
Chrome 公式通りに実装を進めると Vanilla.js なので型が気になりますし、TypeScript を使用するにも Vite.js などでパース環境を 1 から構築する必要があります。また、ブラウザ拡張機能開発では manifest.json という拡張機能に関する情報を記述したファイルを設置しなければならないのですが、v2 と v3 が存在するので振る舞いに注意が必要です。<br>
しかし、Plasmo なら TypeScript 環境がコマンド一発で立ち上がりますし、UI に TSX を使用できます。また manifest.json も自動生成してくれるので、バージョンによる振る舞いの違いをユーザーが気にする必要がないのも魅力です。

## 公式チュートリアル

では実装していきます ٩(　 ᐕ)و
ローカルの拡張機能を有効化する手順は[ドキュメント](https://docs.plasmo.com/framework)を参照してください。<br>
また、基本的に公式チュートリアルで説明されていることには触れないので、公式チュートリアルも並行して見てもらえると理解しやすいかもしれません 🙇🏻‍♂️

### 1.[Reading time](https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-reading-time/)

このチュートリアルでは、記事を読み終えるまでに必要な時間を計算し、サイト上に差し込むプログラムを作ります。<br>
まずは Plasmo でプロジェクトを立ち上げます。src ディレクトリも作りたいのでテンプレートも指定します。

```shellscript
pnpm create plasmo --with-src
```

step1、step2 は manifest.json の作成とアイコン設置についての解説なので飛ばします。plasmo では manifest.json は package.json に記述できますが、現状デフォルトの設定で大丈夫です。また、plasmo はアイコンも自動的に設置してくれます。今回はチュートリアルなので特に変更の必要はないですが、自分で作成したアイコンを設置したい場合は[ドキュメント](https://docs.plasmo.com/framework/icon)を参照してください。

step3 では特定のサイトでスクリプトを実行するために、実行させたいサイトの URL を指定しています。<br>
plasmo では contens.ts 内で指定します。今回は作成したプロジェクトの src/contents/plasmo.tsx に記述します。また、デフォルトでは plasmo.ts と拡張子が`.ts`ですが、UI を JSX で記述したいので`.tsx`に変更しています。

```jsx
// src/contents/plasmo.tsx
export const config: PlasmoCSConfig = {
    matches: [
        "https://developer.chrome.com/docs/extensions/*",
        "https://developer.chrome.com/docs/webstore/*",
    ],
};
```

これで上記 URL に当てはまるサイト以外ではスクリプトが走らなくなりました。

step4 も続けて記述します。

```tsx
// src/contents/plasmo.tsx
const article = document.querySelector("article");

const PlasmoInline = () => {
  let readingTime: number | string = "?";
  if (article) {
    const text = article.textContent;
    const wordMatchRegExp = /[^\s]+/g; // Regular expression
    const words = text.matchAll(wordMatchRegExp);
    // matchAll returns an iterator, convert to array to get word count
    const wordCount = [...words].length;
    readingTime = Math.round(wordCount / 200);
  }

  return <Badge readingTime={readingTime} />;
};
export default PlasmoInline;
```

```ts
// src/features/badge.ts
export const Badge = ({ readingTime }: { readingTime: string | number }) => {
    return (
        <p className="color-secondary-text type--caption">
            {`⏱️ ${readingTime} min read`}
        </p>
    );
};
```

特段変わったことはしていませんが、`.createElement()`で記述していた UI 部分を切り出してコンポーネントにしています。<br>
また、src/popup.tsx が存在していると contents.tsx のスクリプトが起動しないことがある（私だけ？）ので、削除しましょう。
<img src="/assets/img/posts/chrome_extensions_tut-reading-time.png" title="「⏱️6 min read」と表示された画像" alt="「⏱️6 min read」と表示された画像" width="1024" height="401" >

うまく挿入されました乁( ˙ω˙ 乁)ｳｨｰ!

### 2.[Focus mode](https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-focus-mode/)

このチュートリアルでは、ページにスタイルを挿入するスクリプトを作成します。
1 のプロジェクトをそのまま流用します。

step1 は例の如く割愛し、step2 から見ていきます。<br>
plasmo では manifest.json に Service Worker の登録は不要で、background.ts をルートに配置し任意のコードを記述すれば動きます。

```ts
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});
```

これで拡張機能アイコンに「OFF」テキストが表示されたはずです。

step3<br>
**activeTab**パーミッションの追加ですが、plasmo では package.json 内で manifest.json をオーバーライドします。<br>
解説が前後しますが。step5 で動的に Style 書き換えを行うのに必要な**scripting**パーミッションも一緒に追加しておきましょう。

```js
// package.json
...
"manifest": {
    "host_permissions": [
        "https://*/*"
    ],
    "permissions": [
        "activeTab",
        "scripting"
    ]
}
```

step4、step5 は同時に解説します。まずは拡張機能をクリックした際の ON/OFF テキストの切り替えとスタイルの変更処理を追加します。<br>
focus-mode.css は公式チュートリアル通りに設置しておきましょう。

```ts
// src/background.ts
import css from "data-text:~focus-mode.css"
...
const extensions = "https://developer.chrome.com/docs/extensions"
const webstore = "https://developer.chrome.com/docs/webstore"


// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
        // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id })
        // Next state will always be the opposite
        const nextState = prevState === "ON" ? "OFF" : "ON"


        // Set the action badge to the next state
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState
        })


        if (nextState === "ON") {
            // Insert the CSS file when the user turns the extension on
            await chrome.scripting.insertCSS({
                css: css,
                target: { tabId: tab.id }
            })
        } else if (nextState === "OFF") {
            // Remove the CSS file when the user turns the extension off
            await chrome.scripting.removeCSS({
                css: css,
                target: { tabId: tab.id }
            })
        }
    }
})
```

公式チュートリアルと違う部分は、CSS の挿入/削除部分で CSS ファイルのスタイルをテキストとして処理している点です。<br>
最初は公式と同じようにファイルで読み込もうとしていたのですが、plasmo ではビルド後のファイルにはハッシュ値がファイル名に付くため、ファイル名指定で読み込むタイプのこのメソッドとは相性が悪いようです。ビルド後のファイル名を取得する方法がわからなかったので、テキストとしてスタイルを指定することにしました。

これで拡張機能が期待通りに動くはずです！やったね ᐠ( ᐛ )ᐟ

余談なんですが、動作テストで background.ts にて`console.log()`等は普段使っている開発者ツールのコンソールには出力されません。<br>
拡張機能を管理ページの「ビューを検証 Service Worker」をクリックして表示されるコンソールに出力されます。
<img src="/assets/img/posts/chrome_extensions_service_worker_console.png" title="拡張機能管理ページの「ビューを検証 Service Worker」と表示してある部分" alt="拡張機能管理ページの「ビューを検証 Service Worker」と表示してある部分" width="977" height="556" >

### 3.[Tabs manager](https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-tabs-manager/)

後日やります。

## 終わりに

ちょっと作りたいものがあったので軽い気持ちで Chrome 拡張機能開発に入門してみましたが、Plasmo を使うことによって快適な開発体験が得られそうで大満足です。<br>
3 つ目のチュートリアルやってないけど、悪くないよね(。´･ω･)
