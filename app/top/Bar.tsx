import { LanguageStat } from "@/types/Languages";
import { ThemeData } from "@/types/Theme";
import Container from "../Container";

export default function BarTop(data: LanguageStat[], theme: ThemeData) {
  return (
    <Container theme={theme}>
      <div tw={`text-[${theme.accent}] text-base font-medium mb-4`}>
        Most used languages
      </div>

      <div tw="flex h-2 w-full bg-[${theme.border}] rounded-lg overflow-hidden">
        {data.map((language, index) => (
          <div
            key={index}
            style={{
              width: `${language.percent}%`,
              backgroundColor: language.color,
            }}
            tw="flex justify-center items-center text-white text-xs"
            title={`${language.name}: ${language.percent.toFixed(2)}%`}
          />
        ))}
      </div>
      <div tw="flex w-full flex-col mt-6" style={{ gap: 6 }}>
        {data.slice(0, 6).map((language) => (
          <Percent
            key={language.name}
            language={language.name}
            percent={language.percent}
            color={language.color}
            theme={theme}
          />
        ))}
      </div>
    </Container>
  );
}

function Percent({
  language,
  percent,
  color,
  theme,
}: {
  language: string;
  percent: number;
  color: string;
  theme: ThemeData;
}) {
  return (
    <div tw="flex items-center justify-between w-full">
      <div tw="flex items-center" style={{ gap: 8 }}>
        <div tw={`h-2 w-2 rounded-full bg-[${color}]`} />
        <span tw={`text-lg text-bold text-[${theme.color}]`}>{language}</span>
      </div>
      <div tw={`flex text-[${theme.accent}] text-base opacity-80`}>{percent.toFixed(2)}%</div>
    </div>
  );
}
