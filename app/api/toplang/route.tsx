import RepoData from "@/utils/repositories";
import generateSvg from "@/helpers/generateSvg";
import Send from "@/helpers/send";
import { getData } from "@/helpers/getData";
import TopLang from "./TopLang";
import LangData from "@/utils/languages";
import { ThemeData } from "@/types/Preset";
import BarLang from "./BarLang";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { user, color, accent, background, border, radius, padding, tip } =
    getData(searchParams);

  const data = await LangData(user || "rahuletto");

  const theme: ThemeData = {
    user: user ?? "rahuletto",
    color: color ?? "#E6EDF3",
    accent: accent ?? "#8D96A0",
    background: background ?? "#0D1116",
    border: border ?? "#30363D",
    radius: radius ?? 24,
    padding: padding ?? 24,
  };

  const hasBar = searchParams.has("bar");
  const bar = hasBar ? searchParams.get("bar") : "false";

  try {
    if (bar === "true") {
      const image = await generateSvg(BarLang(data, theme), {
        width: 300,
        height: 327,
      });

      return Send(image);
    } else {
      const image = await generateSvg(TopLang(data, theme), {
        width: 300,
        height: 227,
      });

      return Send(image);
    }
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
