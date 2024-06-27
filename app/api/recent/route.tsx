import RepoList from "@/utils/repositories";
import Recents from "./Recents";
import generateSvg from "@/helpers/generateSvg";
import Send from "@/helpers/send";
import { getData } from "@/helpers/getData";
import { ThemeData } from "@/types/Preset";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { user, color, accent, background, border, radius, padding } =
    getData(searchParams);

  const data = await RepoList(user || "rahuletto");

  if (data.data.user.repositories.edges.length === 0) {
    return new Response(
      JSON.stringify({
        error: "No repositories found",
      }),
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }

  const recent = {
    name: data.data.user.repositories.edges[0].node.name as string,
    url: data.data.user.repositories.edges[0].node.url as string,
  };

  const theme: ThemeData = {
    user: user ?? "rahuletto",
    color: color ?? "#E6EDF3",
    accent: accent ?? "#8D96A0",
    background: background ?? "#0D1116",
    border: border ?? "#30363D",
    radius: radius ?? 24,
    padding: padding ?? 24,
  }

  try {
    const image = await generateSvg(Recents(recent, theme), {
      width: 410,
      height: 110,
    });

    return Send(image);
  } catch (err: any) {
    console.warn(err);
    return new Response(
      JSON.stringify({
        error: err.stack,
      }),
      {
        status: 500,
        statusText: "Server Error",
      }
    );
  }
}

export const runtime = "edge";