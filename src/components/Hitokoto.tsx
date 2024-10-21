import { fetcher } from "@utils/helper";
import useSWR from "swr";
import type { HitokotoResponse } from "types";

const Hitokoto = () => {
  const { data, isLoading } = useSWR<HitokotoResponse>(
    // "https://international.v1.hitokoto.cn/",
    "https://v1.hitokoto.cn",
    fetcher
  );

  // console.log({ data });

  if (isLoading) {
    return (
      <div className="">
        <svg
          className="-ml-1 mr-3 h-5 w-5 animate-spin fill-none text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            // stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="fill-skin-hongse opacity-75"
            // fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span className="text-xs">loading...</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <span className="animate-marquee font-zh inline-block whitespace-nowrap pl-[100%]">
        {data?.hitokoto ?? "无"}{" "}
        <span className="">by:{data?.from ?? "无"}</span>
      </span>
    </div>
  );
};

export default Hitokoto;
