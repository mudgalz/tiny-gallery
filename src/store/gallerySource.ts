import { create } from "zustand";

interface GallerySourceState {
  source: "pexels" | "pixabay";
  selectedImageUrl: string | null;
  setSelectedImageUrl: (url: string) => void;
  setSource: (newSource: "pexels" | "pixabay") => void;
}

export const useGalleryStore = create<GallerySourceState>((set) => ({
  source: "pexels",
  selectedImageUrl: null,
  setSelectedImageUrl: (selectedImageUrl) => set({ selectedImageUrl }),
  setSource: (newSource) => set({ source: newSource }),
}));
