import satori from "satori";
import type { CollectionEntry } from "astro:content";
import { SITE } from "@config";
import loadGoogleFonts, { type FontOptions } from "../loadGoogleFont";

export default async (post: CollectionEntry<"blog">) => {
  return satori(
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "1200px",
        height: "630px",
        backgroundColor: "#c4b98d",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          width: "1140px",
          height: "570px",
          display: "flex",
          flexFlow: "column",
        }}
      >
        <div
          style={{
            height: "70%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#a33206",
            fontSize: "40px",
            fontWeight: "bold",
            padding: "10px",
          }}
        >
          {post.data.title}
        </div>
        <div
          style={{
            height: "30%",
            width: "100%",
            display: "flex",
          }}
        >
          <img
            src="https://blog.haobawotingnide.xyz/ogImage.png"
            style={{
              margin: "auto",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: (await loadGoogleFonts(
        post.data.title + post.data.author + SITE.title + "by"
      )) as FontOptions[],
    }
  );
};
