import generateSvg from "@/helpers/generateSvg";
import Send from "@/helpers/send";
import { getData } from "@/helpers/getData";
import RepoComp from "./Repo";
import { ThemeData } from "@/types/Theme";
import Repository from "@/utils/repo";
import { Repo } from "@/types/Repo";
import Error from "../Error";

// /repo?user=rahuletto&repo=AcademiaPro
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

  let repo = searchParams.get("repo");
  if (!repo) {
    const image = await generateSvg(
      Error(theme, {
        message: "You didn't provide a repository name",
        code: "MISSING_FIELD",
      }),
      {
        width: 500,
        height: 170,
      }
    );

    return Send(image, {error: true});
  }

  try {
    const rawdata = await Repository(
      user || "rahuletto",
      repo || "AcademiaPro"
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

      return Send(image, {error: true});
    }

    const data: Repo = {
      name: rawdata.data.repositoryOwner.repository.name,
      description: rawdata.data.repositoryOwner.repository.description,
      primaryLanguage: rawdata.data.repositoryOwner.repository.primaryLanguage,
      stargazerCount: rawdata.data.repositoryOwner.repository.stargazerCount,
      forkCount: rawdata.data.repositoryOwner.repository.forkCount,
    };

    const image = await generateSvg(RepoComp(data, theme), {
      width: 500,
      height: 170,
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
