import { ThemeData } from "@/types/Theme";
import { colors } from "@/utils/colors";
import { WakaData } from "@/types/Waka";
import Container from "../Container";

export default function CompactWaka(data: WakaData, theme: ThemeData) {
  return (
    <Container theme={theme}>
      <div tw={`flex text-[${theme.accent}] text-base font-medium`}>
        @{theme.user} has worked with
      </div>
      <div style={{ gap: 6 }} tw="flex mt-3 flex-row items-baseline">
        <div
          tw={`flex text-[${colors[data.languages[0].name] || theme.color}] text-3xl font-bold`}
        >
          {data.languages[0].name}
        </div>
        <div tw={`flex text-[${theme.color}] text-lg font-medium`}>
          for {data.languages[0].hours} hours
        </div>
      </div>

      <div tw={`absolute bottom-2 text-sm text-[${theme.tip}] right-3`}>
        wakatime
      </div>
    </Container>
  );
}
