import { ThemeData } from "@/types/Theme";
import { colors } from "@/utils/colors";
import { WakaData } from "@/types/Waka";
import Container from "../Container";

export default function CompactWaka(data: WakaData, theme: ThemeData) {
  const topLanguage = data.languages && data.languages.length > 0 ? data.languages[0] : null;

  if (!topLanguage) {
    return (
      <Container theme={theme}>
        <div tw={`flex text-[${theme.accent}] text-base font-medium`}>
          @{theme.user}
        </div>
        <div tw={`flex text-[${theme.color}] text-lg font-medium mt-3`}>
          No WakaTime language stats available
        </div>

        <div tw={`absolute bottom-2 text-sm text-[${theme.tip}] right-3`}>
          wakatime
        </div>
      </Container>
    );
  }

  return (
    <Container theme={theme}>
      <div tw={`flex text-[${theme.accent}] text-base font-medium`}>
        @{theme.user} has worked with
      </div>
      <div style={{ gap: 6 }} tw="flex mt-3 flex-row items-baseline">
        <div
          tw={`flex text-[${colors[topLanguage.name] || theme.color}] text-3xl font-bold`}
        >
          {topLanguage.name}
        </div>
        <div tw={`flex text-[${theme.color}] text-lg font-medium`}>
          for {topLanguage.hours} hours
        </div>
      </div>

      <div tw={`absolute bottom-2 text-sm text-[${theme.tip}] right-3`}>
        wakatime
      </div>
    </Container>
  );
}
