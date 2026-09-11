import { iconMark } from "@/app/icon-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon: iOS masks the corners itself, so this fills the square.
export default function AppleIcon() {
  return iconMark(size.width);
}
