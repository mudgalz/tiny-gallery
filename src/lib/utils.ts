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

export const getImageAttr = (image: any) => {
  const defaults = {
    type: "unknown",
    photographer: "Unknown",
    profileUrl: "#",
    download: "#",
    width: 0,
    height: 0,
    src: "#",
    alt: "Unknown",
    color: "#f6f6f6",
    srcSet: "",
  };

  if (!image) return defaults;

  if ("avg_color" in image) {
    return {
      type: "pexels",
      photographer: image.photographer || defaults.photographer,
      profileUrl: image.photographer_url || defaults.profileUrl,
      download: image.src?.original || defaults.download,
      width: image.width || defaults.width,
      height: image.height || defaults.height,
      src: image.src?.medium || defaults.src,
      alt: image.alt || defaults.alt,
      color: image.avg_color || defaults.color,
      srcSet: `
        ${image.src?.tiny} 200w,
        ${image.src?.small} 400w,
        ${image.src?.medium} 800w,
        ${image.src?.medium} 1200w,
        ${image.src?.medium} 1600w
      `.trim(),
    };
  }

  if ("alt_description" in image) {
    return {
      type: "unsplash",
      photographer: image.user?.name || defaults.photographer,
      profileUrl: image.user?.links?.html || "https://unsplash.com",
      download: image.urls?.raw,
      width: image.width || defaults.width,
      height: image.height || defaults.height,
      src: image.urls?.small || defaults.src,
      alt: image.alt_description || defaults.alt,
      color: image.color || defaults.color,
      srcSet: `
        ${image.urls?.thumb} 200w,
        ${image.urls?.small_s3} 400w,
        ${image.urls?.small} 800w,
        ${image.urls?.regular} 1200w,
        ${image.urls?.regular} 1600w
      `.trim(),
    };
  }

  if ("webformatURL" in image) {
    return {
      type: "pixabay",
      photographer: image.user || defaults.photographer,
      profileUrl: `https://pixabay.com/users/${image.user_id || ""}`,
      download: image.largeImageURL || defaults.download,
      width: image.webformatWidth || defaults.width,
      height: image.webformatHeight || defaults.height,
      src: image.webformatURL || defaults.src,
      alt: image.tags || defaults.alt,
      color: "#f6f6f6",
      srcSet: `
        ${image.previewURL} 200w,
        ${image.webformatURL} 400w,
        ${image.webformatURL} 800w
      `.trim(),
    };
  }

  return defaults;
};
