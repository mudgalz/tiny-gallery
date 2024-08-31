import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateQueryParams(keys: string[], values: any[]): string {
  if (keys.length !== values.length || keys.length === 0 || values.length === 0)
    return "";
  return keys
    .map((key, index) =>
      values[index] !== "all" && values[index] !== ""
        ? `${key}=${values[index]}`
        : null
    )
    .filter(Boolean)
    .join("&");
}

export const validateHexCode = (hex: string): boolean => {
  return /^[0-9A-F]{6}$/i.test(hex);
};

export const pluralize = (word: string, count: number) => {
  return count === 1 ? word : `${word}s`;
};
