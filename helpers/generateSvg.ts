import { ReactNode } from "react";
import satori from "satori";
import { getIconCode, loadEmoji } from "./emoji";

const urbanistFetch = fetch(
  new URL("../assets/Urbanist-SemiBold.ttf", import.meta.url),
  {
    cache: "force-cache",
  }
).then((res) => res.arrayBuffer());

const boldFetch = fetch(
  new URL("../assets/Urbanist-Bold.ttf", import.meta.url),
  {
    cache: "force-cache",
  }
).then((res) => res.arrayBuffer());

export default async function generateSvg(
  fn: ReactNode,
  options: { width: number; height: number }
) {
  const urbanist = await urbanistFetch;
  const urbanistBold = await boldFetch;

  const data = await satori(fn, {
    width: options.width,
    height: options.height,
    fonts: [
      {
        weight: 500,
        style: "normal",
        data: urbanist,
        name: "Urbanist",
      },
      {
        weight: 600,
        style: "normal",
        data: urbanistBold,
        name: "Urbanist",
      },
    ],
    loadAdditionalAsset: async (code: string, segment: string) => {
      if (code === "emoji") {

        return `data:image/svg+xml;base64,${btoa(await loadEmoji(getIconCode(segment)))}`;
      }


      // if segment is normal text
      return code;
    }
  
  });

  return data;
}
