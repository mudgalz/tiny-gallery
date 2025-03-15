const orientationOptions = [
  { label: "All Orientations", value: "all" },
  { label: "Square", value: "square" },
  { label: "Vertical", value: "portrait" },
  { label: "Horizontal", value: "landscape" },
];

const imageSourceOptions = [
  { label: "Pexels", value: "pexels" },
  { label: "Pixabay", value: "pixabay" },
  { label: "Unsplash", value: "unsplash" },
];

const hexColors = [
  "#795548",
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#9E9E9E",
  "#607D8B",
  "#000000",
  "#FFFFFF",
];
const commonColors = [
  { label: "All Colors", value: "all" },
  { label: "Black", value: "black" },
  { label: "White", value: "white" },
  { label: "Yellow", value: "yellow" },
  { label: "Orange", value: "orange" },
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
];

const pixabayExtraColors = [
  { label: "Grayscale", value: "grayscale" },
  { label: "Transparent", value: "transparent" },
  { label: "Turquoise", value: "turquoise" },
  { label: "Lilac", value: "lilac" },
  { label: "Pink", value: "pink" },
  { label: "Gray", value: "gray" },
  { label: "Brown", value: "brown" },
];

const unsplashExtraColors = [
  { label: "Black and White", value: "black_and_white" },
  { label: "Purple", value: "purple" },
  { label: "Magenta", value: "magenta" },
  { label: "Teal", value: "teal" },
];

const pixabayImageTypes = [
  { label: "All Types", value: "all" },
  { label: "Photo", value: "photo" },
  { label: "Illustration", value: "illustration" },
  { label: "Vector", value: "vector" },
];
const unsplashOrderByOptions = [
  { label: "Relevant", value: "relevant" },
  { label: "Latest", value: "latest" },
];
const pixabayColorOptions = [...commonColors, ...pixabayExtraColors];
const unsplashColorOptions = [...commonColors, ...unsplashExtraColors];
export {
  unsplashOrderByOptions,
  orientationOptions,
  hexColors,
  imageSourceOptions,
  pixabayColorOptions,
  unsplashColorOptions,
  pixabayImageTypes,
};
