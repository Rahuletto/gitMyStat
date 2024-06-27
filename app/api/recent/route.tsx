import RepoData from "@/utils/repos";
import Recents from "./Recents";
import satori from "satori";

export const runtime = "edge";

const urbanistFetch = fetch(
  new URL("../../../assets/Urbanist-SemiBold.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

const boldFetch = fetch(
  new URL("../../../assets/Urbanist-Bold.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

export async function GET(request: Request) {
  const urbanist = await urbanistFetch;
  const urbanistBold = await boldFetch;

  const { searchParams } = new URL(request.url);

  const { user, color, accent, background, border, radius, padding } =
    getData(searchParams);

  const data = await RepoData(user || "rahuletto");

  if (data.data.user.repositories.edges.length === 0) {
    return new Response(
      JSON.stringify({
        error: "No repositories found",
      }),
      {
        status: 404,
        statusText: "Not Found",
      },
    );
  }

  const recent = {
    name: data.data.user.repositories.edges[0].node.name as string,
    url: data.data.user.repositories.edges[0].node.url as string,
    user: user || "rahuletto",
    color: color || "#E6EDF3",
    accent: accent || "#8D96A0",
    background: background || "#0D1116",
    border: border || "#30363D",
    radius: radius || 24,
    padding: padding || 24,
  };

  try {
    const image = await satori(Recents(recent), {
      width: 410,
      height: 110,
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

    return new Response(image, {
      headers: {
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "cache-control": "private, maxage=86400",
        "Content-Type": "image/svg+xml",
      },
    });
  } catch (err: any) {
    console.warn(err);
    return new Response(
      JSON.stringify({
        error: err.stack,
      }),
      {
        status: 500,
        statusText: "Server Error",
      },
    );
  }
}

function getData(searchParams: URLSearchParams) {
  const username = searchParams.has("username");
  const user = username ? searchParams.get("username") : "rahuletto";

  const hasColor = searchParams.has("color");
  const color = hasColor ? searchParams.get("color") : "#E6EDF3";

  const hasAccent = searchParams.has("accent");
  const accent = hasAccent
    ? decodeURIComponent(searchParams.get("accent") as string).replaceAll(
        "0x",
        "#",
      )
    : "#8D96A0";

  const hasBg = searchParams.has("background");
  const background = hasBg
    ? decodeURIComponent(searchParams.get("background") as string).replaceAll(
        "0x",
        "#",
      )
    : "#0D1116";

  const hasBorder = searchParams.has("border");
  const border = hasBorder
    ? decodeURIComponent(searchParams.get("border") as string).replaceAll(
        "0x",
        "#",
      )
    : "#30363D";

  const hasRad = searchParams.has("radius");
  const radius = hasRad ? Number(searchParams.get("radius")) : 24;

  const hasPad = searchParams.has("padding");
  const padding = hasPad ? Number(searchParams.get("padding")) : 24;

  return { user, color, accent, background, border, radius, padding };
}
