import { RecentData } from "@/types/Recents";
import { GoRepo } from "react-icons/go";

export default function Recents(data: RecentData) {
  return (
    <div
      tw={`h-full w-full flex flex-col items-start justify-center bg-[${
        data.background
      }] border-2 border-solid border-[${data.border}] rounded-[${
        data.radius
      }px] py-[${data.padding}px] px-[${data.padding * 1.2}px] `}
    >
      <p tw={`text-[${data.accent}] text-base font-medium`}>
        @{data.user} is currently working on
      </p>
      <div style={{ gap: 8 }} tw="flex flex-row items-center">
        <GoRepo color={data.color} size={28} />
        <p tw={`text-[${data.color}] text-3xl font-bold`}>{data.name}</p>
      </div>
    </div>
  );
}
