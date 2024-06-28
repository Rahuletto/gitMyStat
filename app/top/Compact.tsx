import { ThemeData } from "@/types/Theme";
import { LanguageStat } from "@/types/Languages";

export default function CompactTop(data: LanguageStat[], theme: ThemeData) {
  return (
    <div
      tw={`h-full relative w-full flex flex-col items-start justify-start bg-[${
        theme.background
      }] border-2 border-solid border-[${theme.border}] rounded-[${
        theme.radius
      }px] py-[${theme.padding}px] px-[${theme.padding * 1.2}px] `}
    >
      <div tw={`flex text-[${theme.accent}] text-base font-medium`}>
        @{theme.user} has worked alot with
      </div>
      <div style={{ gap: 6 }} tw="flex mt-3 flex-row items-baseline">
        <div
          tw={`flex text-[${data[0].color}] text-3xl font-bold`}
        >
          {data[0].name}
        </div>
        <div tw={`flex text-[${theme.accent}] text-lg font-medium`}>
            {`(${data[0].percent}%)`}
        </div>
      </div>
    </div>
  );
}
