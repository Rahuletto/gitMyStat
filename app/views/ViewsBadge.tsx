import { ThemeData } from "@/types/Theme";
import { GoEye } from "react-icons/go";

interface ViewsBadgeProps {
  label: string;
  views: number;
  size: "small" | "medium" | "large";
  nobg: boolean;
  samp?: boolean;
  showIcon?: boolean;
  theme: ThemeData;
}

export default function ViewsBadge({
  label,
  views,
  size,
  nobg,
  samp = false,
  showIcon,
  theme,
}: ViewsBadgeProps) {
  const isIconVisible = showIcon ?? !samp;
  const formattedViews = views.toLocaleString();

  const fontSizes = {
    small: 14,
    medium: 18,
    large: 24,
  };

  const iconSizes = {
    small: 16,
    medium: 20,
    large: 26,
  };

  const selectedSize = fontSizes[size] || fontSizes.small;
  const iconSize = iconSizes[size] || iconSizes.small;
  const fontFamily = samp ? "Roboto Mono, monospace" : "Urbanist";

  const iconColor = samp ? "#FFFFFF" : (theme.tip || theme.accent);
  const labelColor = samp ? "#FFFFFF" : theme.accent;
  const valueColor = samp ? "#FFFFFF" : theme.color;

  const iconMarginTop = size === "large" ? 3 : size === "medium" ? 2.5 : 2;

  const content = (
    <div
      tw="flex items-center justify-center h-full w-full"
      style={{
        fontFamily,
        fontSize: `${selectedSize}px`,
        fontWeight: samp ? 400 : 600,
        lineHeight: 1,
        gap: 6,
      }}
    >
      {isIconVisible && (
        <div
          tw="flex items-center justify-center"
          style={{ display: "flex", marginTop: `${iconMarginTop}px` }}
        >
          <GoEye color={iconColor} size={iconSize} />
        </div>
      )}
      <div tw="flex items-center" style={{ color: labelColor }}>
        {label}:
      </div>
      <div tw="flex items-center" style={{ color: valueColor }}>
        {formattedViews}
      </div>
    </div>
  );

  if (nobg) {
    return content;
  }

  // Normal badge: pill layout
  const borderRadius = size === "small" ? 6 : size === "medium" ? 8 : 12;

  return (
    <div
      tw="flex items-center justify-center h-full w-full"
      style={{
        backgroundColor: theme.background,
        border: `1px solid ${theme.border}`,
        borderRadius: `${borderRadius}px`,
      }}
    >
      {content}
    </div>
  );
}
