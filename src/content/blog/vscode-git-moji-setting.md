---
title: vscodeのgit moji設定（日本語化）
description: vscodeからコミットする際に絵文字をいい感じに入れたくてgitmojiを導入してみました。
draft: false
featured: false
pubDatetime: 2023-05-29T04:56:14.665Z
lastmod: 2023-06-13T03:25:57.953Z
tags:
  - VSCode
  - git
postSlug: vscode-git-moji-setting
---

<img src="/assets/img/posts/gitemoji_website_top.png" title="gitemojiのサイトトップ" alt="gitemojiのサイトトップ" width="1023" height="512" >

## 目次

## 追記（23/6/13）

日本語翻訳差分のPRを出したところ、無事マージされました。これで設定をいじらなくてもデフォルトで日本語の絵文字の説明が表示されるようになりました！初めてのPRで緊張しましたが、無事マージされてよかったです。他の日本人の方にPRページにて翻訳等のご指摘もいただき、とても勉強になりました。ありがとうございました！

## 経緯

[こちらの記事](https://zenn.dev/mi0256/articles/1332e1d041cab4)に触発されました。普段からコミットメッセージに絵文字を入れることはあったのですが、ちゃんとしたルールに沿って絵文字を選んでいたわけではなく、この際[git moji](https://gitmoji.dev/)を導入したいと思ったわけです。

vscodeの拡張機能である、「[Gitmoji](https://marketplace.visualstudio.com/items?itemName=seatonjiang.gitmoji-vscode)」を導入してみたのですが、標準の絵文字が多すぎる問題と、絵文字の説明が英語だと絵文字の選択が瞬時にできない問題に直面したので、なんとか使いやすいようにこれらの問題を解決しようと思います。

以降、「gitmoji」は「vscode拡張機能のgitmoji」を指します。

## 方針

個人的にはせっかくデフォルトの絵文字がたくさん設定してあるので、それらを使いこなせるようになりたいです。使いこなしやすくなるように、翻訳から着手します。

## 設定変更

gitmojiの絵文字一覧ファイルは[こちら](https://github.com/seatonjiang/gitmoji-vscode/blob/main/src/gitmoji.ts)から参照します。現在gitmojiでは日本語対応していないため、デフォルト絵文字を表示させないために自分で設定した絵文字のみを表示するようにvscodeのsetting.jsonを変更します。

```json
{
  "gitmoji.onlyUseCustomEmoji": true
}
```

続いて、デフォルトの絵文字説明文を翻訳したものを設定します。一覧ファイルからコピペしたものを貼り付けるとシングルクォーテーション等でエラーになるため、一旦ChatGPTに一括変換してもらいます。

```json
下記はvscode拡張機能gitmojiの絵文字一覧ファイルです。このままsetting.jsonに貼り付けるとエラーになるので、jsonのkeyをダブルクォーテーションで囲み、valueもシングルクォーテーションをダブルクォーテーションに変更してください。また、descriptionのvscode.l10n.t()の引数に指定ある値を日本語に翻訳し、翻訳後の文字列をdescriptionに指定してください。

{
    emoji: '🎨',
    code: ':art:',
    description: vscode.l10n.t('Improve structure/format of the code'),
},
...省略
```

変換後（一応目視で漏れと変な翻訳がないか確認しました）

```json
{
    ...
    "gitmoji.addCustomEmoji": [
        {
            "emoji": "🎨",
            "code": ":art:",
            "description": "コードの構造/形式の改善"
        },
        {
            "emoji": "⚡️",
            "code": ":zap:",
            "description": "パフォーマンス改善"
        },
        {
            "emoji": "🔥",
            "code": ":fire:",
            "description": "コードやファイルを削除"
        },
        {
            "emoji": "🐛",
            "code": ":bug:",
            "description": "バグの修正"
        },
        {
            "emoji": "🚑",
            "code": ":ambulance:",
            "description": "重大なホットフィックス"
        },
        {
            "emoji": "✨",
            "code": ":sparkles:",
            "description": "新機能の導入"
        },
        {
            "emoji": "📝",
            "code": ":memo:",
            "description": "ドキュメンテーションの追加/更新"
        },
        {
            "emoji": "🚀",
            "code": ":rocket:",
            "description": "デプロイ"
        },
        {
            "emoji": "💄",
            "code": ":lipstick:",
            "description": "UIやスタイルファイルの追加/更新"
        },
        {
            "emoji": "🎉",
            "code": ":tada:",
            "description": "プロジェクト開始"
        },
        {
            "emoji": "✅",
            "code": ":white_check_mark:",
            "description": "テストの追加/更新/パス"
        },
        {
            "emoji": "🔒️",
            "code": ":lock:",
            "description": "セキュリティ問題の修正"
        },
        {
            "emoji": "🔐",
            "code": ":closed_lock_with_key:",
            "description": "シークレットの追加/更新"
        },
        {
            "emoji": "🔖",
            "code": ":bookmark:",
            "description": "リリース/バージョンタグ"
        },
        {
            "emoji": "🚨",
            "code": ":rotating_light:",
            "description": "コンパイラ/リンターの警告を修正"
        },
        {
            "emoji": "🚧",
            "code": ":construction:",
            "description": "作業中"
        },
        {
            "emoji": "💚",
            "code": ":green_heart:",
            "description": "CIビルドの修正"
        },
        {
            "emoji": "⬇️",
            "code": ":arrow_down:",
            "description": "依存関係のダウングレード"
        },
        {
            "emoji": "⬆️",
            "code": ":arrow_up:",
            "description": "依存関係のアップグレード"
        },
        {
            "emoji": "📌",
            "code": ":pushpin:",
            "description": "依存関係を特定のバージョンに固定"
        },
        {
            "emoji": "👷",
            "code": ":construction_worker:",
            "description": "CIビルドシステムの追加/更新"
        },
        {
            "emoji": "📈",
            "code": ":chart_with_upwards_trend:",
            "description": "分析またはトラッキングコードの追加/更新"
        },
        {
            "emoji": "♻️",
            "code": ":recycle:",
            "description": "コードのリファクタリング"
        },
        {
            "emoji": "➕",
            "code": ":heavy_plus_sign:",
            "description": "依存関係の追加"
        },
        {
            "emoji": "➖",
            "code": ":heavy_minus_sign:",
            "description": "依存関係の削除"
        },
        {
            "emoji": "🔧",
            "code": ":wrench:",
            "description": "設定ファイルの追加/更新"
        },
        {
            "emoji": "🔨",
            "code": ":hammer:",
            "description": "開発スクリプトの追加/更新"
        },
        {
            "emoji": "🌐",
            "code": ":globe_with_meridians:",
            "description": "国際化/ローカライズ"
        },
        {
            "emoji": "✏️",
            "code": ":pencil2:",
            "description": "タイポ修正"
        },
        {
            "emoji": "💩",
            "code": ":poop:",
            "description": "改善が必要な悪いコード"
        },
        {
            "emoji": "⏪",
            "code": ":rewind:",
            "description": "変更を元に戻す"
        },
        {
            "emoji": "🔀",
            "code": ":twisted_rightwards_arrows:",
            "description": "ブランチをマージ"
        },
        {
            "emoji": "📦",
            "code": ":package:",
            "description": "コンパイル済みファイルやパッケージの追加/更新"
        },
        {
            "emoji": "👽️",
            "code": ":alien:",
            "description": "外部APIの変更によりコードを更新"
        },
        {
            "emoji": "🚚",
            "code": ":truck:",
            "description": "リソース (例：ファイル、パス、ルート) を移動/名称変更"
        },
        {
            "emoji": "📄",
            "code": ":page_facing_up:",
            "description": "ライセンスの追加/更新"
        },
        {
            "emoji": "💥",
            "code": ":boom:",
            "description": "破壊的な変更の導入"
        },
        {
            "emoji": "🍱",
            "code": ":bento:",
            "description": "アセットの追加/更新"
        },
        {
            "emoji": "♿️",
            "code": ":wheelchair:",
            "description": "アクセシビリティ改善"
        },
        {
            "emoji": "💡",
            "code": ":bulb:",
            "description": "新しいアイデアまたはコードのコメントを追加"
        },
        {
            "emoji": "🍻",
            "code": ":beers:",
            "description": "酔った勢いでコードを書く"
        },
        {
            "emoji": "💬",
            "code": ":speech_balloon:",
            "description": "ドキュメンテーションを更新"
        },
        {
            "emoji": "🗃️",
            "code": ":card_file_box:",
            "description": "データベース関連の作業"
        },
        {
            "emoji": "🔊",
            "code": ":loud_sound:",
            "description": "ログの追加/改善"
        },
        {
            "emoji": "🔇",
            "code": ":mute:",
            "description": "ログ削除"
        },
        {
            "emoji": "👥",
            "code": ":busts_in_silhouette:",
            "description": "コントリビューター追加"
        },
        {
            "emoji": "🚸",
            "code": ":children_crossing:",
            "description": "UX/ユーザビリティ改善"
        },
        {
            "emoji": "🏗️",
            "code": ":building_construction:",
            "description": "アーキテクチャに関する作業"
        },
        {
            "emoji": "📱",
            "code": ":iphone:",
            "description": "レスポンシブデザイン"
        },
        {
            "emoji": "🤡",
            "code": ":clown_face:",
            "description": "モック関連の作業"
        },
        {
            "emoji": "🥚",
            "code": ":egg:",
            "description": "イースターエッグ追加"
        },
        {
            "emoji": "🙈",
            "code": ":see_no_evil:",
            "description": ".gitignore追加"
        },
        {
            "emoji": "📸",
            "code": ":camera_flash:",
            "description": "スクリーンショット追加/更新"
        },
        {
            "emoji": "⚗️",
            "code": ":alembic:",
            "description": "実験的な新機能"
        },
        {
            "emoji": "🔍",
            "code": ":mag:",
            "description": "SEO改善"
        },
        {
            "emoji": "🏷️",
            "code": ":label:",
            "description": "型の追加/更新"
        },
        {
            "emoji": "🌱",
            "code": ":seedling:",
            "description": "シードファイルの追加/更新"
        },
        {
            "emoji": "🚩",
            "code": ":triangular_flag_on_post:",
            "description": "フィーチャーフラグの追加/更新/削除"
        },
        {
            "emoji": "🥅",
            "code": ":goal_net:",
            "description": "エラーのキャッチ"
        },
        {
            "emoji": "💫",
            "code": ":dizzy:",
            "description": "アニメーションとトランジションの追加/更新"
        },
        {
            "emoji": "🗑️",
            "code": ":wastebasket:",
            "description": "クリーンアップが必要なコードの非推奨化"
        },
        {
            "emoji": "🛂",
            "code": ":passport_control:",
            "description": "認証/ロール/パーミッションに関連するコードの作業"
        },
        {
            "emoji": "🩹",
            "code": ":adhesive_bandage:",
            "description": "重大でない問題に対する簡単な修正"
        },
        {
            "emoji": "🧐",
            "code": ":monocle_face:",
            "description": "データの探索/検査"
        },
        {
            "emoji": "⚰️",
            "code": ":coffin:",
            "description": "デッドコード削除"
        },
        {
            "emoji": "🧪",
            "code": ":test_tube:",
            "description": "失敗するテストの追加"
        },
        {
            "emoji": "👔",
            "code": ":necktie:",
            "description": "ビジネスロジックの追加/更新"
        },
        {
            "emoji": "🩺",
            "code": ":stethoscope:",
            "description": "ヘルスチェックの追加/更新"
        },
        {
            "emoji": "🧱",
            "code": ":bricks:",
            "description": "インフラ関連の変更"
        },
        {
            "emoji": "🧑‍💻",
            "code": ":technologist:",
            "description": "DX改善"
        },
        {
            "emoji": "💸",
            "code": ":money_with_wings:",
            "description": "スポンサーやお金に関するインフラの追加"
        },
        {
            "emoji": "🧵",
            "code": ":thread:",
            "description": "マルチスレッドや並行処理に関連するコードの追加/更新"
        },
        {
            "emoji": "🦺",
            "code": ":safety_vest:",
            "description": "検証に関連するコードの追加/更新"
        }
    ]
}
```

<img src="/assets/img/posts/gitmoji_translate_japanese.png" title="日本語変換成功" alt="日本語変換成功" width="720" height="453" >

ちゃんと設定が反映されました🥳

## 終わりに

今回はgitmojiの日本語化をしてみました。勇気が出ればPR出してみようと思います！
