import { ThemeData } from "@/types/Theme";
import { LanguageStat } from "@/types/Languages";
import Container from "../Container";

export default function CompactTop(data: LanguageStat[], theme: ThemeData) {
  return (
    <Container theme={theme}>
      <div tw={`flex text-[${theme.accent}] text-base font-medium`}>
        @{theme.user} has worked alot with
      </div>
      <div style={{ gap: 6 }} tw="flex mt-3 flex-row items-baseline">
        <div
          tw={`flex text-[${data[0].color}] text-3xl font-bold`}
        >
          {data[0].name}
        </div>
        <div tw={`flex text-[${theme.color}] text-lg font-medium`}>
            {`(${data[0].percent}%)`}
        </div>
      </div>
    </Container>
  );
}
