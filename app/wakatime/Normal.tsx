import { ThemeData } from "@/types/Theme";
import { WakaData } from "@/types/Waka";

// /wakatime?username=rahuletto&layout=compact
// /wakatime?username=rahuletto&layout=normal

export default function NormalWaka(data: WakaData, theme: ThemeData) {
  return (
    <div
      tw={`h-full w-full flex flex-col items-start justify-start bg-[${
        theme.background
      }] border-2 border-solid border-[${theme.border}] rounded-[${
        theme.radius
      }px] py-[${theme.padding}px] px-[${theme.padding * 1.2}px]`}
    >
      <div tw={`flex mb-3 text-[${theme.accent}] text-base font-medium`}>
        @{data.user}
      </div>
      <div tw="flex w-full flex-col" style={{ gap: 6 }}>
        {data.languages.slice(0, 6).map((language) => (
          <Time
            key={language.name}
            language={language.name}
            seconds={language.total_seconds}
            theme={theme}
          />
        ))}
      </div>
      <div tw={`absolute bottom-2 text-sm text-[${theme.tip}] right-3`}>
        wakatime
      </div>
    </div>
  );
}

function Time({
  language,
  seconds,
  theme,
}: {
  language: string;
  seconds: number;
  theme: ThemeData;
}) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return (
    <div tw="flex items-center justify-between w-full">
      <div tw="flex items-center" style={{ gap: 8 }}>
        <span tw={`text-lg font-bold text-[${theme.color}]`}>{language}</span>
      </div>
      <span tw={`text-[${theme.accent}]`}>
       {hours}h {minutes}m
      </span>
    </div>
  );
}
