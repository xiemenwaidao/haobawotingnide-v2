---
title: 【Google Maps Platform】Autocompleteを使いたい（1）料金編
description: 検索窓付きのマップをサイトに導入したくてGoogle Maps Platformのドキュメントを覗いたのですが、そこは迷宮の入り口でした。
draft: false
featured: false
pubDatetime: 2023-06-17T07:16:35.983Z
modDatetime: 2023-06-17T21:10:41.762Z
tags:
  - googlemap
  - JavaScript
postSlug: google-maps-platform-autocomplete-1-pricing
---

<img src="/assets/img/posts/google_maps_platform_pricing_top.png" title="" alt="" width="1024" height="507" >

## 目次

## はじめに

検索窓付きのマップをサイトに導入したくてGoogle Maps Platformのドキュメントを覗いたのですが、情報が散らばり過ぎていてパニパニパニックになったので、自分用にまとめました（まとめます）。

## 使いたい機能

- 地図を表示するやつ（Maps JavaScript API）
- 検索するやつ（Autocomplete）

## 使いたい機能の料金

ここから沼りました。Google Maps Platformは従量課金制を採用しているので、しっかり理解してから使用しないと、いつの間にか莫大な料金を請求されていることになります。毎月200ドルまでは無料で使えるので、個人開発で使用する場合は、出来るだけ無料枠内で使いたいです。

しかし、この料金計算がなかなかの曲者です。<br/>
今回はAutocompleteを使いたいので、Autocompleteの料金を調べてみます。

### Autocompleteの料金

Autocompleteの料金は、以下のようになっています。

<a href="https://mapsplatform.google.com/intl/ja/pricing/" target="_blank"><img src="&#x2F;assets&#x2F;img&#x2F;posts&#x2F;google_map_platform_autocomplete_pricing.png" alt="Autocompleteの料金表。
Autocomplete - リクエスト単位+：$2.83&#x2F;1000リクエスト
Autocomplete + Place Details - セッション単位+：$17&#x2F;1000リクエスト" title="google_map_platform_autocomplete_pricing" width="1024" height="219" ></a>

一つ目の方は「Maps JavaScript API の Place Autocomplete サービス」と書いてあるので、おそらくAutocompleteを呼び出す毎に課金されるんでしょうか？「Maps Static API」というGoogle Maps Platformで一番安い指定の地図画像を返すAPIに次いで安いので、現時点ではあまり気にしないこととします。

2つ目はMap表示で使われる「Maps JavaScript API」の$7.00/1000リクエストよりも約2倍高いので、慎重に使わなければなりません。<br/>
[ドキュメント](https://developers.google.com/maps/documentation/javascript/places-autocomplete?hl=ja#:~:text=%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%81%8C%E9%81%B8%E6%8A%9E%E3%81%97%E3%81%9F%20PlaceResult%20%E3%81%AE%20Place%20Details%20%E3%83%AC%E3%82%B9%E3%83%9D%E3%83%B3%E3%82%B9%E3%81%AB%E5%90%AB%E3%81%BE%E3%82%8C%E3%82%8B%E3%83%87%E3%83%BC%E3%82%BF%E9%85%8D%E5%88%97%20fields%E3%80%82%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%81%8C%E8%A8%AD%E5%AE%9A%E3%81%95%E3%82%8C%E3%81%A6%E3%81%84%E3%81%AA%E3%81%84%E5%A0%B4%E5%90%88%E3%80%81%E3%81%BE%E3%81%9F%E3%81%AF%20%5B%27ALL%27%5D%20%E3%81%8C%E6%B8%A1%E3%81%95%E3%82%8C%E3%81%9F%E5%A0%B4%E5%90%88%E3%81%AF%E3%80%81%E4%BD%BF%E7%94%A8%E5%8F%AF%E8%83%BD%E3%81%AA%E3%83%95%E3%82%A3%E3%83%BC%E3%83%AB%E3%83%89%E3%81%8C%E3%81%99%E3%81%B9%E3%81%A6%E8%BF%94%E3%81%95%E3%82%8C%E3%80%81%E8%AA%B2%E9%87%91%E3%81%95%E3%82%8C%E3%81%BE%E3%81%99%EF%BC%88%E6%9C%AC%E7%95%AA%E7%92%B0%E5%A2%83%E3%81%AE%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4%E3%81%A7%E3%81%AF%E6%8E%A8%E5%A5%A8%E3%81%95%E3%82%8C%E3%81%BE%E3%81%9B%E3%82%93%EF%BC%89%E3%80%82%E3%83%95%E3%82%A3%E3%83%BC%E3%83%AB%E3%83%89%E3%81%AE%E4%B8%80%E8%A6%A7%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E3%81%AF%E3%80%81PlaceResult%20%E3%82%92%E3%81%94%E8%A6%A7%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%E3%80%82)にてこのような記述がありました。

> An array of data fields to be included in the Place Details response for the user's selected PlaceResult. If the property is not set or if ['ALL'] is passed in, all available fields are returned and billed for (this is not recommended for production deployments). For a list of fields, see PlaceResult.<br/>
> ユーザーが選択したPlaceResultのPlace Detailsレスポンスに含まれるデータフィールドの配列です。このプロパティが設定されていない場合、または ['ALL'] が渡された場合、利用可能なすべてのフィールドが返され、課金されます（これは本番環境では推奨されません）。フィールドの一覧は、PlaceResultを参照してください。

どうやらフィールドを指定すると課金されてしまうようです。そのフィールドについて調べていきましょう。<br/>
指定できるフィールドの一覧は[こちら](https://developers.google.com/maps/documentation/javascript/reference/places-service?hl=ja#PlaceResult)から閲覧できるようです。<br/>
しかし、フィールド指定の課金についての詳細は記載していないので再度調べてみると、[Places API の使用量と請求額](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing?hl=ja#autocomplete)を説明しているページの[SKU: Atmosphere Data](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing?hl=ja#atmosphere-data)セクションに[フィールド（Place Details）](https://developers.google.com/maps/documentation/javascript/places?hl=ja#place_details_fields)というリンクがありました。情報のたらい回しすぎて目が回ります。

| Basic                                                                                                                                                                                                    | Contact                                                                    | Atmosphere                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------ |
| address_component、adr_address、business_status、formatted_address、geometry、icon、icon_mask_base_uri、icon_background_color、name、photo、place_id、plus_code、type、url、utc_offset_minutes、vicinity | formatted_phone_number、international_phone_number、opening_hours、website | price_level、rating、reviews、user_ratings_total |

上記がフィールドで指定できるものの振り分けです。

> Basic フィールドは基本レートで課金され、追加料金はかかりません。Contact フィールドと Atmosphere フィールドはより高いレートで課金されます。詳細については、価格表をご覧ください。

とあるように、Basicフィールドを指定する限りは追加料金はかからないようです。また[価格表](https://mapsplatform.google.com/intl/ja/pricing/)を見てみましたが、ContactフィールドとAtmosphereフィールドに関する記述はありませんでした。もうよく分かりません。

## 結論

今回の調査で分かったのは、検索窓付きのマップをサイトに導入する際には「Maps JavaScript API」の料金に加えて、「Autocomplete - リクエスト単位+」（$2.83/1000リクエスト）と「Autocomplete + Place Details - セッション単位+」（$17/1000リクエスト）の料金がかかり、さらに「Place Details」のフィールドを指定すると、指定した項目によっては追加料金がかかるということです。これらの料金を考慮して、サイトに導入するかどうかを判断する必要があります。何にせよ料金体制が複雑すぎる且つサイトが分かりづらいので、GoogleはGoogle Map Platformの料金体制についての情報をChatGPTに喰わせてプラグインとして提供してほしいですね。
