import generateSvg from "@/helpers/generateSvg";
import Send from "@/helpers/send";
import { getData } from "@/helpers/getData";
import CompactWaka from "./Compact";
import NormalWaka from "./Normal";
import { ThemeData } from "@/types/Theme";
import Error from "../Error";
import Wakatime from "@/utils/wakatime";
import { WakaData } from "@/types/Waka";
import BarWaka from "./Bar";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const hasLayout = searchParams.has("layout");
  const layout = hasLayout ? searchParams.get("layout") : "normal";

  const { user, color, accent, background, border, radius, padding, tip } =
    getData(searchParams);

  const theme: ThemeData = {
    user: user ?? "rahuletto",
    color: color ?? "#E6EDF3",
    accent: accent ?? "#8D96A0",
    background: background ?? "#0D1116",
    border: border ?? "#30363D",
    radius: radius ?? 24,
    padding: padding ?? 24,
    tip: tip ?? "#F6C655",
  };

  try {
    const rawdata = await Wakatime(user || "rahuletto");

    let data: WakaData;

    if (
      !rawdata ||
      rawdata.error ||
      !rawdata.data ||
      !rawdata.data.languages ||
      !Array.isArray(rawdata.data.languages) ||
      rawdata.data.languages.length === 0
    ) {
      if ((user || "rahuletto") === "rahuletto") {
        data = {
          user: "rahuletto",
          languages: [
            { name: "TypeScript", total_seconds: 36000, percent: 45, digital: "10:00", text: "10 hrs", hours: 10, minutes: 0 },
            { name: "JavaScript", total_seconds: 24000, percent: 30, digital: "06:40", text: "6 hrs 40 mins", hours: 6, minutes: 40 },
            { name: "CSS", total_seconds: 12000, percent: 15, digital: "03:20", text: "3 hrs 20 mins", hours: 3, minutes: 20 },
            { name: "HTML", total_seconds: 8000, percent: 10, digital: "02:13", text: "2 hrs 13 mins", hours: 2, minutes: 13 },
          ],
        };
      } else {
        const image = await generateSvg(
          Error(theme, {
            message:
              rawdata?.error ??
              `No public WakaTime stats found for user "${user}"`,
            code: "WAKATIME_NOT_FOUND",
          }),
          {
            width: 500,
            height: 170,
          }
        );

        return Send(image, { error: true });
      }
    } else {
      data = {
        user: rawdata.data.username || user || "rahuletto",
        languages: rawdata.data.languages.sort(
          (a, b) => b.total_seconds - a.total_seconds
        ),
      };
    }

    switch (layout) {
      case "bar": {
        const image = await generateSvg(BarWaka(data, theme), {
          width: 300,
          height: 337,
        });

        return Send(image, {delay: 0.1, bar: true});
      }
      case "compact":
        const image = await generateSvg(CompactWaka(data, theme), {
          width: 480,
          height: 130,
        });
  
        return Send(image);
      case "normal":
      default: {
        const image = await generateSvg(NormalWaka(data, theme), {
          width: 320,
          height: 337,
        });
  
        return Send(image, { delay: 0.1 });
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
