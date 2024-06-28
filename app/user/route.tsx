import generateSvg from "@/helpers/generateSvg";
import Send from "@/helpers/send";
import { getData } from "@/helpers/getData";
import { ThemeData } from "@/types/Theme";
import Error from "../Error";
import UserData from "@/utils/users";
import { parseGitHubData } from "@/helpers/calculateRank";
import UserComp from "./User";

// /user?user=rahuletto
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

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
    const rawdata = await UserData(
      user || "rahuletto"
    );

    if (rawdata.errors && rawdata.errors[0]) {
      const image = await generateSvg(
        Error(theme, {
          message: rawdata.errors[0].message,
          code: rawdata.errors[0].type,
        }),
        {
          width: 500,
          height: 170,
        }
      );

      return Send(image);
    }

    const data = parseGitHubData(rawdata)

    const image = await generateSvg(UserComp(data, theme), {
      width: 285,
      height: 340,
    });

    return Send(image);
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
