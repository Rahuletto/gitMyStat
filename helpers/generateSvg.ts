import { ReactNode } from "react";
import satori from "satori";

const urbanistFetch = fetch(
  new URL("../assets/Urbanist-SemiBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const boldFetch = fetch(
  new URL("../assets/Urbanist-Bold.ttf", import.meta.url)
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
  });

  return data;
}
