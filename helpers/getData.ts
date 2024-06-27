import { Themes } from "@/templates";

export function getData(searchParams: URLSearchParams) {
  const username = searchParams.has("username");
  const user = username ? searchParams.get("username") : "rahuletto";

  const hasTheme = searchParams.has("theme");
  let theme = hasTheme ? searchParams.get("theme") : "default";
  if (!theme || !Themes[theme as string]?.accent) theme = "default";

  const hasColor = searchParams.has("color");
  const color = hasColor
    ? searchParams.get("color")
    : hasTheme
      ? Themes[theme as string].color
      : "#E6EDF3";

  const hasAccent = searchParams.has("accent");
  const accent = hasAccent
    ? decodeURIComponent(searchParams.get("accent") as string).replaceAll(
        "0x",
        "#"
      )
    : hasTheme
      ? Themes[theme as string].accent
      : "#8D96A0";

  const hasBg = searchParams.has("background");
  const background = hasBg
    ? decodeURIComponent(searchParams.get("background") as string).replaceAll(
        "0x",
        "#"
      )
    : hasTheme
      ? Themes[theme as string].background
      : "#0D1116";

  const hasBorder = searchParams.has("border");
  const border = hasBorder
    ? decodeURIComponent(searchParams.get("border") as string).replaceAll(
        "0x",
        "#"
      )
    : hasTheme
      ? Themes[theme as string].border
      : "#30363D";

  const hasTip = searchParams.has("tip");
  const tip = hasTip
    ? decodeURIComponent(searchParams.get("tip") as string).replaceAll(
        "0x",
        "#"
      )
    : hasTheme
      ? Themes[theme as string].tip
      : "#30363D";

  const hasRad = searchParams.has("radius");
  const radius = hasRad
    ? Number(searchParams.get("radius"))
    : hasTheme
      ? Themes[theme as string].radius
      : 24;

  const hasPad = searchParams.has("padding");
  const padding = hasPad
    ? Number(searchParams.get("padding"))
    : hasTheme
      ? Themes[theme as string].padding
      : 24;

  return {
    theme,
    user,
    color,
    accent,
    background,
    border,
    tip,
    radius,
    padding,
  };
}
