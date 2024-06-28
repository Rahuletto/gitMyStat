import { ThemeData } from "@/types/Theme";
import { colors } from "@/utils/colors";
import { WakaData } from "@/types/Waka";

export default function CompactWaka(data: WakaData, theme: ThemeData) {
  return (
    <div
      tw={`h-full relative w-full flex flex-col items-start justify-start bg-[${
        theme.background
      }] border-2 border-solid border-[${theme.border}] rounded-[${
        theme.radius
      }px] py-[${theme.padding}px] px-[${theme.padding * 1.2}px] `}
    >
      <div tw={`flex text-[${theme.accent}] text-base font-medium`}>
        @{theme.user} has worked with
      </div>
      <div style={{ gap: 6 }} tw="flex mt-3 flex-row items-baseline">
        <div
          tw={`flex text-[${colors[data.languages[0].name] || theme.color}] text-3xl font-bold`}
        >
          {data.languages[0].name}
        </div>
        <div tw={`flex text-[${theme.accent}] text-lg font-medium`}>
          for {data.languages[0].hours} hours
        </div>
      </div>

      <div tw={`absolute bottom-2 text-sm text-[${theme.tip}] right-3`}>
        wakatime
      </div>
    </div>
  );
}
