import { ThemeData } from "@/types/Theme";
import { WakaData } from "@/types/Waka";

export default function NormalWaka(data: WakaData, theme: ThemeData) {
  return (
    <div
      tw={`h-full w-full flex flex-col items-start justify-start bg-[${
        theme.background
      }] border-2 border-solid border-[${theme.border}] rounded-[${
        theme.radius
      }px] py-[${theme.padding}px] px-[${theme.padding * 1.2}px]`}
    >
      <p tw={`text-[${theme.accent}] text-base font-medium`}>@{data.user}</p>
      <div tw="flex w-full flex-col" style={{ gap: 6 }}>
        {data.languages.slice(0, 6).map((language) => (
          <Percent
            key={language.name}
            language={language.name}
            percent={language.percent}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
}

function Percent({
  language,
  percent,
  theme,
}: {
  language: string;
  percent: number;
  theme: ThemeData;
}) {
  return (
    <div tw="flex items-center justify-between w-full">
      <div tw="flex items-center" style={{ gap: 8 }}>
        <span tw={`text-lg text-bold text-[${theme.color}]`}>{language}</span>
      </div>
      <span tw={`text-[${theme.accent}]`}>{percent.toFixed(2)}%</span>
    </div>
  );
}
