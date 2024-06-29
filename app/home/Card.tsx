import Image from "next/image";
import { Themes } from "@/themes";

export default function Card({
  theme = "dark",
  url = "/repo?username=rahuletto&repo=gitMyStat",
  text,
  width,
}: {
  theme?: string;
  url?: string;
  text?: string;
  width?: number;
}) {
  return (
    <div className="flex flex-col items-start justify-center gap-4 lg:items-center">
      <picture className="lg:self-center">
        <source
          srcSet={`${url}&theme=${theme}`}
          media="(prefers-color-scheme: dark)"
        />
        <Image
          className="mx-auto"
          width={width ?? 500}
          height={170}
          loading="lazy"
          src={`${url}&theme=${theme}`}
          alt="GitHub"
        />
      </picture>
      <code
        style={{
          fontSize: text ? "14px" : "18px",
          background: text ? "var(--background)" : Themes[theme].background,
          color: text ? "var(--color)" : Themes[theme].color,
        }}
        className="rounded-xl px-4 py-2 font-bold"
      >
        {text
          ? text.split(new RegExp(`(rahuletto|gitmystat)`, "gi")).map((part, index) =>
              ['rahuletto', 'gitmystat'].includes(part.toLowerCase()) ? (
                <span key={index} className="bg-dark-border rounded-md p-1 text-dark-color">
                  {part}
                </span>
              ) : (
                part
              )
            )
          : theme}
      </code>
    </div>
  );
}
