import { iconMark } from "@/app/icon-mark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon: the monogram fills the square since 32px leaves no room for padding.
export default function Icon() {
  return iconMark(size.width, 0.92);
}
