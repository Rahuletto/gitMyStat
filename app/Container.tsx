import { ThemeData } from "@/types/Theme";
import { ReactNode } from "react";

export default function Container({
  children,
  theme,
}: {
  children: ReactNode;
  theme: ThemeData;
}) {
  return (
    <div
      tw={`h-full w-full flex flex-col items-start justify-start bg-[${
        theme.background
      }] border-2 border-solid border-[${theme.border}] rounded-[${
        theme.radius
      }px] py-[${theme.padding}px] px-[${theme.padding * 1.2}px]`}
    >
      {children}
    </div>
  );
}
