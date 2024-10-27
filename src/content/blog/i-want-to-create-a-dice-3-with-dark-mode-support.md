---
title: サイコロを作りたい（3）ダークモード対応
description: サイコロシーンの背景やマテリアルのダークモード対応機能を実装しました。
draft: false
featured: false
pubDatetime: 2023-05-09T05:46:15.051Z
modDatetime: 2023-05-10T13:02:09.968Z
tags:
  - JavaScript
  - React-three-fiber
  - ReactJs
  - ThreeJs
  - AstroJs
postSlug: i-want-to-create-a-dice-3-with-dark-mode-support
---

<img src="/assets/img/posts/logo_cube_potsuri.png" title="ロゴを立方体にしたもの" alt="ロゴを立方体にしたもの" width="1024" height="527" >

モードによってシーン背景とマテリアルの色を変更する機能を実装していきます。

## 目次

## 技術スタック

| パッケージ名   | バージョン |
| -------------- | ---------- |
| astro          | 2.3.4      |
| @astrojs/react | 2.1.2      |
| react          | 18.2.0     |
| tailwindcss    | 3.3.2      |

3D関連のパッケージは前回と同じです。

## モード切り替え機能の仕様

よくあるヘッダー横にボタンがあり、クリックするとモードが切り替わります。スタイルの切り替えはtailwindcssを使用しており、`<html>`にdata属性を付与することにより、全体のスタイル切り替えを行います。またこのモード切り替え用のjsはAstroのテーマ「[AstroPaper](https://astro-paper.pages.dev/)」を参照しています。あまりスタイルをいじっていないのでお気づきだとは思いますが、当ブログもAstroPaperがベースとなっています。非常に優れたブログテンプレートなのでおすすめです。

```js
// toggle-theme.js
const primaryColorScheme = ""; // "light" | "dark"

// ローカルストレージからテーマデータを取得
const currentTheme = localStorage.getItem("theme");

function getPreferTheme() {
  // ローカルストレージにテーマが設定されていればその値を返す
  if (currentTheme) return currentTheme;

  // primaryColorScheme が設定されていればその値を返す
  if (primaryColorScheme) return primaryColorScheme;

  // ユーザーのデバイスのカラースキームを返す
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

let themeValue = getPreferTheme();

function setPreference() {
  localStorage.setItem("theme", themeValue);
  reflectPreference();
}

function reflectPreference() {
  document.firstElementChild.setAttribute("data-theme", themeValue);

  document.querySelector("#theme-btn")?.setAttribute("aria-label", themeValue);
}

// 画面の点滅やCSSの更新を防ぐために初期化
reflectPreference();

window.onload = () => {
  // screen readerがボタンの最新の値を取得できるようにロード時に初期化
  reflectPreference();

  // テーマボタンのクリックを監視
  document.querySelector("#theme-btn")?.addEventListener("click", () => {
    themeValue = themeValue === "light" ? "dark" : "light";
    setPreference();
  });
};

// システムのカラースキーム変更を同期
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    themeValue = isDark ? "dark" : "light";
    setPreference();
  });
```

すぐにモードを適用させるために`<head>`に直接展開するようにAstrojsの`is:inline`を指定しています（ページを開いた際に白いちらつきを防げる）。

## Reactからモードの状態管理

前項の通り、モードの管理はVannilaで実装されています。しかし、今回は`React-Three-Fiber`で作成した3Dシーンでモード情報を取得したいです。

モードを管理する`useMode`というHooksを作成します。

```ts
// useMode.ts
const useMode = () => {
  const [mode, setMode] = useState<"dark" | "light">("dark");

  const themeBtnClick = useCallback(() => {
    setMode(mode === "dark" ? "light" : "dark");
  }, [mode]);

  useEffect(() => {
    document
      .querySelector<HTMLButtonElement>("#theme-btn")
      ?.addEventListener("click", themeBtnClick);

    return () => {
      document
        .querySelector<HTMLButtonElement>("#theme-btn")
        ?.removeEventListener("click", themeBtnClick);
    };
  }, [themeBtnClick]);

  useEffect(() => {
    const m = document.firstElementChild!.getAttribute("data-theme");
    if (m === "dark" || m === "light") {
      setMode(m);
    }
  }, []);

  return mode;
};
```

初回だけ`toggle-theme.js`によって`<html>`に設定されるデータ属性の`data-theme`を参照して現在のモードを取得しています。<br>
あとはモード変更ボタンに`useEffect()`からイベントを付与し、クリックされたら`State`が変更される仕組みです。<br>
以前、別件でVanillaで書かれたシステムにReactで実装されたアプリケーションの組み込みを担当したことがあったのですが、その際にアプリケーションの起動トリガーをどうするか悩んだ末に今回のような`useEffect()`を使用した実装に落ち着きました。これが正解なのかはわからないので、もっといい案がある方はこっそり教えていただきたいです。

モードの取得ができたので、あとはこれをモードを参照したい場所でインポートするだけです。

```tsx
export default function MyGL() {
    const mode = useMode();
    return (
        ...省略
        <color
            attach="background"
            args={[
                mode === "dark"
                    ? darkParams.bgColor
                    : lightParams.bgColor,
            ]}
        />
        ...省略
    )
}
```

(ノ≧∀≦)ノ

## 終わりに

今回はReactからVanillaを参照して3Dシーンのダークモード対応する機能を実装しました。ダークモードって個人的には必須なんですけど、中にはデフォルトのライトモードしか普段使用していない方もいると思うので、なかなか難しいですね。レイアウトも今回みたいな一工夫が必要になってくるので、ホムペなどのWeb制作界隈などでは、あまり実装しているサイトは見かけません。ないよりかはあったほうが嬉しい機能ではあるので、これからも積極的にダークモード実装していきたいです。
