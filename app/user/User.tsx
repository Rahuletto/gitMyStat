import { ThemeData } from "@/types/Theme";


import { UserStats } from "@/types/UserStats";

export default function UserComp(data: UserStats, theme: ThemeData) {

  return (
    <div
      tw={`h-full w-full flex flex-col items-start justify-between bg-[${
        theme.background
      }] border-2 border-solid border-[${theme.border}] rounded-[${
        theme.radius
      }px] py-[${theme.padding}px] px-[${theme.padding * 1.2}px]`}
    >
      
    </div>
  );
}
