import { create } from "zustand";

interface GallerySourceState {
  source: "pexels" | "pixabay";
  setSource: (newSource: "pexels" | "pixabay") => void;
}

export const useGalleryStore = create<GallerySourceState>((set) => ({
  source: "pexels",
  setSource: (newSource) => set({ source: newSource }),
}));
