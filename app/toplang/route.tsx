import Error from "../Error";
import generateSvg from "@/helpers/generateSvg";
import Send from "@/helpers/send";
import { getData } from "@/helpers/getData";
import NormalTop from "./Normal";
import LangData from "@/utils/languages";
import { ThemeData } from "@/types/Theme";
import BarTop from "./Bar";
import calculateLanguageStats from "@/helpers/calculate";


// /NormalTop?username=rahuletto&layout=bar
// /NormalTop?username=rahuletto&layout=normal
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

    if (rawdata.data.user.repositories.edges.length == 0 || (rawdata.errors && rawdata.errors[0])) {
      const image = await generateSvg(
        Error(theme, {
          message: (rawdata.errors ? rawdata.errors[0]?.message : `There is no user with username "${user}"`),
          code: (rawdata.errors ? rawdata.errors[0]?.type : "NOT_FOUND"),
        }),
        {
          width: 500,
          height: 170,
        }
      );

      return Send(image);
    }

    const result = calculateLanguageStats(rawdata);

    if (layout === "bar") {
      const image = await generateSvg(BarTop(result, theme), {
        width: 300,
        height: 327,
      });

      return Send(image);
    } else {
      const image = await generateSvg(NormalTop(result, theme), {
        width: 300,
        height: 260,
      });

      return Send(image);
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

    return Send(image);
  }
}

export const runtime = "edge";