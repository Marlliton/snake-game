import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function mergeClasseNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
