import type { Quad, Triplet } from "@react-three/cannon";
import type { CollectionEntry } from "astro:content";

/** htmlタグ削除 */
export const removeHtmlTag = (text: string) => {
  return text.replace(/(<([^>]+)>)/gi, "");
  // .trim()
  // .replace(/\s+/g, "")
};

export const fetcher = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "X-Content-Type-Options": "nosniff",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  // console.log(response);
  // レスポンスヘッダーに「X-Content-Type-Options」ヘッダーを設定する
  // response.headers.set("X-Content-Type-Options", "nosniff");

  const data = await response.json();
  return data;
};

/** vec3用 */
export const tripletsAlmostEqual = (
  t1: Triplet,
  t2: Triplet,
  epsilon: number
): boolean => {
  const distance = Math.sqrt(
    Math.pow(t2[0] - t1[0], 2) +
      Math.pow(t2[1] - t1[1], 2) +
      Math.pow(t2[2] - t1[2], 2)
  );
  return distance < epsilon;
};

/** vec4用 */
export const quadsAlmostEqual = (
  q1: Quad,
  q2: Quad,
  epsilon: number
): boolean => {
  const distance = Math.sqrt(
    Math.pow(q2[0] - q1[0], 2) +
      Math.pow(q2[1] - q1[1], 2) +
      Math.pow(q2[2] - q1[2], 2) +
      Math.pow(q2[3] - q1[3], 2)
  );
  return distance < epsilon;
};

/** 下書き記事を開発環境で表示させる */
export const toggleDisplayDraft = ({
  data,
}: {
  data: CollectionEntry<"blog">["data"];
}) => {
  if (process.env.MODE === "production") {
    return !data.draft;
  }

  return true;
};

/** -1 or 1 */
export const getRandomSign = () => {
  return Math.random() < 0.5 ? -1 : 1;
};

export const getFormatDatetime = (datetime: string | Date) => {
  const pubdate = new Date(datetime);
  const date = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(pubdate);
  const time = new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tokyo",
  }).format(pubdate);

  return { date, time };
};
