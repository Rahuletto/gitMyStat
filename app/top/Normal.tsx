import { LanguageStat } from "@/types/Languages";
import { ThemeData } from "@/types/Theme";
import Container from "../Container";

export default function NormalTop(data: LanguageStat[], theme: ThemeData) {
  return (
    <Container theme={theme}>
      <div tw="flex w-full flex-col" style={{ gap: 6 }}>
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
        <span tw={`text-lg text-bold text-[${theme.color}]`}>
          {language}
        </span>
      </div>
      <span tw={`text-[${theme.accent}]`}>{percent.toFixed(2)}%</span>
    </div>
  );
}
