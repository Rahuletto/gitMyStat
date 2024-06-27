import { Presets } from "@/template";

export function getData(searchParams: URLSearchParams) {
  const username = searchParams.has("username");
  const user = username ? searchParams.get("username") : "rahuletto";

  const hasPreset = searchParams.has("preset");
  let preset = hasPreset ? searchParams.get("preset") : "default";
  if (!preset || !Presets[preset as string]?.accent) preset = "default";

  const hasColor = searchParams.has("color");
  const color = hasColor
    ? searchParams.get("color")
    : hasPreset
      ? Presets[preset as string].color
      : "#E6EDF3";

  const hasAccent = searchParams.has("accent");
  const accent = hasAccent
    ? decodeURIComponent(searchParams.get("accent") as string).replaceAll(
        "0x",
        "#"
      )
    : hasPreset
      ? Presets[preset as string].accent
      : "#8D96A0";

  const hasBg = searchParams.has("background");
  const background = hasBg
    ? decodeURIComponent(searchParams.get("background") as string).replaceAll(
        "0x",
        "#"
      )
    : hasPreset
      ? Presets[preset as string].background
      : "#0D1116";

  const hasBorder = searchParams.has("border");
  const border = hasBorder
    ? decodeURIComponent(searchParams.get("border") as string).replaceAll(
        "0x",
        "#"
      )
    : hasPreset
      ? Presets[preset as string].border
      : "#30363D";

      const hasTip = searchParams.has("tip");
      const tip = hasTip
        ? decodeURIComponent(searchParams.get("tip") as string).replaceAll(
            "0x",
            "#"
          )
        : hasPreset
          ? Presets[preset as string].tip
          : "#30363D";

  const hasRad = searchParams.has("radius");
  const radius = hasRad
    ? Number(searchParams.get("radius"))
    : hasPreset
      ? Presets[preset as string].radius
      : 24;

  const hasPad = searchParams.has("padding");
  const padding = hasPad
    ? Number(searchParams.get("padding"))
    : hasPreset
      ? Presets[preset as string].padding
      : 24;

  return { preset, user, color, accent, background, border, tip, radius, padding };
}
