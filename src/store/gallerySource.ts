import { create } from "zustand";

interface GallerySourceState {
  source: SourceType;
  setSource: (newSource: SourceType) => void;
}

export const useGalleryStore = create<GallerySourceState>((set) => ({
  source: "pexels",
  setSource: (newSource) => set({ source: newSource }),
}));
