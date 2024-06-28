import Error from "../Error";
import generateSvg from "@/helpers/generateSvg";
import Send from "@/helpers/send";
import { getData } from "@/helpers/getData";
import NormalTop from "./Normal";
import LangData from "@/utils/languages";
import { ThemeData } from "@/types/Theme";
import BarTop from "./Bar";
import calculateLanguageStats from "@/helpers/calculateLanguage";
import CompactTop from "./Compact";

// /top?username=rahuletto&layout=bar
// /top?username=rahuletto&layout=normal
// /top?username=rahuletto&layout=compact

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { user, color, accent, background, border, radius, padding } =
    getData(searchParams);

  const theme: ThemeData = {
    user: user ?? "rahuletto",
    color: color ?? "#E6EDF3",
    accent: accent ?? "#8D96A0",
    background: background ?? "#0D1116",
    border: border ?? "#30363D",
    radius: radius ?? 24,
    padding: padding ?? 24,
  };

  const hasLayout = searchParams.has("layout");
  const layout = hasLayout ? searchParams.get("layout") : "normal";

  try {
    const rawdata = await LangData(user || "rahuletto");

    if (
      rawdata.data.user.repositories.edges.length == 0 ||
      (rawdata.errors && rawdata.errors[0])
    ) {
      const image = await generateSvg(
        Error(theme, {
          message: rawdata.errors
            ? rawdata.errors[0]?.message
            : `There is no user with username "${user}"`,
          code: rawdata.errors ? rawdata.errors[0]?.type : "NOT_FOUND",
        }),
        {
          width: 500,
          height: 170,
        }
      );

      return Send(image, {error: true});
    }

    const result = calculateLanguageStats(rawdata);

    switch (layout) {
      case "bar": {
        const image = await generateSvg(BarTop(result, theme), {
          width: 300,
          height: 327,
        });

        return Send(image, {delay:0.1, bar: true});
      }
      case "compact":
        const image = await generateSvg(CompactTop(result, theme), {
          width: 480,
          height: 130,
        });

        return Send(image);
      case "normal":
      default: {
        const image = await generateSvg(NormalTop(result, theme), {
          width: 300,
          height: 260,
        });

        return Send(image, {delay: 0.1});
      }
    }
  } catch (err: any) {
    console.warn(err);
    const image = await generateSvg(
      Error(theme, {
        message: (err as Error).message,
        code: (err as Error).name,
      }),
      {
        width: 500,
        height: 170,
      }
    );

    return Send(image, {error: true});
  }
}

export const runtime = "edge";
