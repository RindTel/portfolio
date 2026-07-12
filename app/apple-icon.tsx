import { iconMark } from "@/app/components/icon-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon. Same mark as the PWA icons, scaled — iOS masks the corners
// itself, so this fills the square rather than rounding it. icon-mark.tsx holds
// this icon's original 180px geometry as ratios, so the output is unchanged.
export default function AppleIcon() {
  return iconMark(size.width);
}
