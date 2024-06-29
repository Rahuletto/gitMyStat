import RepoList from "@/utils/repositories";
import Recents from "./Recents";
import generateSvg from "@/helpers/generateSvg";
import Send from "@/helpers/send";
import { getData } from "@/helpers/getData";
import { ThemeData } from "@/types/Theme";
import Error from "../Error";

// /recent?username=rahuletto
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
  try {
    const rawdata = await RepoList(user || "rahuletto");

    if(!rawdata.data.user?.repositories) {
      const image = await generateSvg(
        Error(theme, {
          message: rawdata.errors
            ? rawdata.errors[0]?.message
            : `There are user with username "${user}"`,
          code: rawdata.errors ? rawdata.errors[0]?.type : "NO_USER",
        }),
        {
          width: 500,
          height: 170,
        }
      );

      return Send(image, {error: true});
    }
    if (
      rawdata.data.user.repositories.edges.length == 0 ||
      (rawdata.errors && rawdata.errors[0])
    ) {
      const image = await generateSvg(
        Error(theme, {
          message: rawdata.errors
            ? rawdata.errors[0]?.message
            : `There are no repositories for "${user}"`,
          code: rawdata.errors ? rawdata.errors[0]?.type : "NO_REPO",
        }),
        {
          width: 500,
          height: 170,
        }
      );

      return Send(image, {error: true});
    }

    const recent = {
      name: rawdata.data.user.repositories.edges[0].node.name as string,
      url: rawdata.data.user.repositories.edges[0].node.url as string,
    };

    const image = await generateSvg(Recents(recent, theme), {
      width: 410,
      height: 110,
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

    return Send(image, {error: true});
  }
}

export const runtime = "edge";
