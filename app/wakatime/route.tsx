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

    if (!rawdata || rawdata.error) {
      const image = await generateSvg(
        Error(theme, {
          message: rawdata?.error ?? "",
          code: "",
        }),
        {
          width: 500,
          height: 170,
        }
      );

      return Send(image);
    }

    const data: WakaData = {
      user: rawdata.data.username,
      languages: rawdata.data.languages.sort(
        (a, b) => b.total_seconds - a.total_seconds
      ),
    };

    switch (layout) {
      case "bar": {
        const image = await generateSvg(BarWaka(data, theme), {
          width: 300,
          height: 337,
        });

        return Send(image, 0.1, true);
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
  
        return Send(image, 0.1);
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

    return Send(image);
  }
}

export const runtime = "edge";
