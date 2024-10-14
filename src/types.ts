import type socialIcons from "@assets/socialIcons";

export type Site = {
  website: string;
  author: string;
  profile: string;
  desc: string;
  title: string;
  ogImage?: string;
  lightAndDarkMode: boolean;
  postPerIndex: number;
  postPerPage: number;
  scheduledPostMargin: number;
  showArchives?: boolean;
  editPost?: {
    url?: URL["href"];
    text?: string;
    appendFilePath?: boolean;
  };
};

export type SocialObjects = {
  name: keyof typeof socialIcons;
  href: string;
  active: boolean;
  linkTitle: string;
}[];

export interface HitokotoResponse {
  id: string; // 一言标识
  hitokoto: string; // 一言正文。编码方式 unicode。使用 utf-8。
  type: string; // 类型。请参考第三节参数的表格
  from: string; // 一言的出处
  from_who: string; // 一言的作者
  creator: string; // 添加者
  creator_uid: string; // 添加者用户标识
  reviewer: string; // 审核员标识
  uuid: string; // 一言唯一标识；可以链接到 https://hitokoto.cn?uuid=[uuid] 查看这个一言的完整信息
  commit_from: string; // 提交方式
  created_at: string; // 添加时间
  length: string; // 句子长度
}
