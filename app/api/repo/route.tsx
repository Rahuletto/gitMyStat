import RepoData from "@/utils/repositories";
import generateSvg from "@/helpers/generateSvg";
import Send from "@/helpers/send";
import { getData } from "@/helpers/getData";
import RepoComp from "./Repo";
import { ThemeData } from "@/types/Preset";
import Repository from "@/utils/repo";
import { Repo } from "@/types/Repo";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  let repo = searchParams.get("repo");
  if (!repo) repo = "AcademiaPro";

  const { user, color, accent, background, border, radius, padding, tip } =
    getData(searchParams);

  const rawdata = await Repository(user || "rahuletto", repo || "AcademiaPro");

  const data: Repo = {
    name: rawdata.data.user.repository.name,
    description: rawdata.data.user.repository.description,
    primaryLanguage: rawdata.data.user.repository.primaryLanguage,
    stargazerCount: rawdata.data.user.repository.stargazerCount,
    forkCount: rawdata.data.user.repository.forkCount,
  };

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
    const image = await generateSvg(RepoComp(data, theme), {
      width: 500,
      height: 170,
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
