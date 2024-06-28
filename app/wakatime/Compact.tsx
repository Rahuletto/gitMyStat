import { ThemeData } from "@/types/Theme";
import { Repo } from "@/types/Repo";
import { GoRepo, GoRepoForked, GoStar } from "react-icons/go";

export default function CompactWaka(data: Repo, theme: ThemeData) {
  const sliced = data.description.slice(0, 110);
  return (
    <div
      tw={`h-full w-full flex flex-col items-start justify-between bg-[${
        theme.background
      }] border-2 border-solid border-[${theme.border}] rounded-[${
        theme.radius
      }px] py-[${theme.padding}px] px-[${theme.padding * 1.2}px]`}
    >
      <div style={{ gap: 8 }} tw="flex flex-col items-start">
        <div style={{ gap: 8 }} tw="flex flex-row items-center">
          <GoRepo color={theme.color} size={28} />
          <div tw={`flex text-[${theme.color}] text-3xl font-bold`}>
            {data.name}
          </div>
        </div>
        <div
          tw={`flex ml-9 text-[${theme.accent}]`}
          style={{ lineClamp: 2, overflow: "hidden" }}
        >
          {sliced.length === data.description.length
            ? data.description
            : sliced + "..."}
        </div>
      </div>

      <div tw="flex ml-8 mt-2 flex-col" style={{ gap: 4 }}>
        <div tw={`flex flex-row mt-3`} style={{ gap: 32 }}>
          <div tw="flex items-center justify-center" style={{ gap: 8 }}>
            <div
              tw={`h-3 w-7 rounded-full bg-[${data.primaryLanguage.color}]`}
            />
            <span tw={`text-sm font-bold text-[${theme.color}]`}>
              {data.primaryLanguage.name}
            </span>
          </div>
          <div tw="flex items-center justify-center" style={{ gap: 8 }}>
            <GoStar color={theme.tip} size={18} />
            <div tw={`flex text-[${theme.accent}]`}>{data.stargazerCount}</div>
          </div>

          <div tw="flex items-center justify-center" style={{ gap: 8 }}>
            <GoRepoForked color={theme.tip} size={18} />
            <div tw={`flex text-[${theme.accent}]`}>{data.forkCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
