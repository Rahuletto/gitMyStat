import { ThemeData } from "@/types/Preset";

export default function Error(theme: ThemeData, error: { message: string, code: string }) {
  return (
    <div
      tw={`h-full w-full flex flex-col items-start justify-between bg-[${
        theme.background
      }] border-4 border-solid border-[${theme.color}] rounded-[${
        theme.radius
      }px] py-[${theme.padding}px] px-[${theme.padding * 1.2}px]`}
    >
      <div tw="flex flex-col" style={{ gap: 3 }}>
        <div
          tw={`text-3xl text-[${theme.color}] font-bold`}
          style={{ fontWeight: 600 }}
        >
          Error
        </div>
        <div tw={`text-md text-[${theme.accent}]`}>
          {error.message || "There is no error? Wait what"}
        </div>
      </div>
      <div tw={`flex flex-col text-[${theme.color}]`}>{error.code || "Uhm?"}</div>
    </div>
  );
}
