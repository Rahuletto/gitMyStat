import generateSvg from "@/helpers/generateSvg";
import { getData } from "@/helpers/getData";
import { ThemeData } from "@/types/Theme";
import { getViews } from "@/helpers/getViews";
import { animate } from "@/helpers/animate";
import ViewsBadge from "./ViewsBadge";
import Error from "../Error";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const { user, color, accent, background, border, radius, padding, tip } =
    getData(searchParams);

  const theme: ThemeData = {
    user: user ?? "rahuletto",
    color: color ?? "#E6EDF3",
    accent: accent ?? "#8D96A0",
    background: background ?? "#0D1116",
    border: border ?? "#30363D",
    radius: radius ?? 24,
    padding: padding ?? 24,
    tip: tip ?? "#30363D",
  };

  const label = searchParams.get("label") || "views";
  const size = (searchParams.get("size") || "small") as "small" | "medium" | "large";
  const nobg = searchParams.get("nobg") === "true" || searchParams.get("no_bg") === "true";
  const samp = searchParams.get("samp") === "true" || searchParams.get("font") === "samp";
  
  const hasIconParam =
    searchParams.has("icon") ||
    searchParams.has("showIcon") ||
    searchParams.has("noicon") ||
    searchParams.has("no_icon");

  let showIcon = !samp;

  if (hasIconParam) {
    const iconValue = searchParams.get("icon");
    const showIconValue = searchParams.get("showIcon");
    if (iconValue === "true" || showIconValue === "true") {
      showIcon = true;
    } else if (
      iconValue === "false" ||
      showIconValue === "false" ||
      searchParams.get("noicon") === "true" ||
      searchParams.get("no_icon") === "true" ||
      iconValue === "none"
    ) {
      showIcon = false;
    }
  }

  try {
    const views = await getViews(theme.user);
    const formattedViews = views.toLocaleString();
    const text = `${label}: ${formattedViews}`;

    // Estimate layout dimensions dynamically
    let width = 0;
    let height = 0;
    const textLength = text.length;
    const extraIconWidth = showIcon ? (size === "large" ? 32 : size === "medium" ? 26 : 22) : 0;

    if (size === "large") {
      height = nobg ? 34 : 52;
      width = nobg
        ? textLength * (samp ? 15 : 14) + extraIconWidth
        : textLength * (samp ? 15 : 14) + 40 + extraIconWidth;
    } else if (size === "medium") {
      height = nobg ? 26 : 40;
      width = nobg
        ? textLength * (samp ? 11.5 : 10.5) + extraIconWidth
        : textLength * (samp ? 11.5 : 10.5) + 32 + extraIconWidth;
    } else {
      // small (default)
      height = nobg ? 20 : 30;
      width = nobg
        ? textLength * (samp ? 9 : 8) + extraIconWidth
        : textLength * (samp ? 9 : 8) + 24 + extraIconWidth;
    }

    width = Math.max(Math.ceil(width), nobg ? 40 : 80);
    height = Math.ceil(height);

    const image = await generateSvg(
      <ViewsBadge
        label={label}
        views={views}
        size={size}
        nobg={nobg}
        samp={samp}
        showIcon={showIcon}
        theme={theme}
      />,
      {
        width,
        height,
      }
    );

    const animatedImage = animate(image, { delay: 0.1 });

    return new Response(animatedImage, {
      headers: {
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Cache-Control": "max-age=0, no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "Content-Type": "image/svg+xml",
      },
    });
  } catch (err: any) {
    console.warn(err);
    const image = await generateSvg(
      Error(theme, {
        message: (err as Error).message,
        code: (err as Error).name,
      }),
      {
        width: 500,
        height: 170,
      }
    );

    return new Response(image, {
      headers: {
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Cache-Control": "max-age=0, no-cache, no-store, must-revalidate",
        "Content-Type": "image/svg+xml",
      },
    });
  }
}

export const runtime = "edge";
