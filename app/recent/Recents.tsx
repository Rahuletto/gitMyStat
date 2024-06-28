import { ThemeData } from "@/types/Theme";
import { RecentData } from "@/types/Recents";
import { GoRepo } from "react-icons/go";
import Container from "../Container";

export default function Recents(data: RecentData, theme: ThemeData) {
  return (
    <Container theme={theme}>
      <p tw={`text-[${theme.accent}] text-base font-medium`}>
        @{theme.user} is currently working on
      </p>
      <div style={{ gap: 8 }} tw="flex flex-row items-center">
        <GoRepo color={theme.color} size={28} />
        <p tw={`text-[${theme.color}] text-3xl font-bold`}>{data.name}</p>
      </div>
    </Container>
  );
}
