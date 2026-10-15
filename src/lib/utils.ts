import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// twMerge lets a className passed to a component override its defaults
// (e.g. a custom bg on <Card>) instead of both classes fighting in the CSS.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
