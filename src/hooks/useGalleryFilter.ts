import { generateQueryParams } from "@/lib/utils";
import { useGalleryStore } from "@/store/gallerySource";
import { useSearchParams } from "react-router-dom";

export default function useGalleryFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { source, setSource } = useGalleryStore();
  const selectedOrientation = searchParams.get("orientation") || "all";
  const selectedColor = searchParams.get("color") || "";
  const searchedQuery = searchParams.get("q") || "";
  const currentPage = Number(searchParams.get("page") || 1);
  const selectedImageType = searchParams.get("image_type") || "all";
  const orderBy = searchParams.get("order_by") || "relevant";
  // Function to update search parameters
  const updateSearchParams = (newParams: Record<string, string | null>) => {
    const updatedSearchParams = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "" || value === "all") {
        updatedSearchParams.delete(key);
      } else {
        updatedSearchParams.set(key, value);
      }
    });

    setSearchParams(updatedSearchParams);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    updateSearchParams({ page: page.toString() });
  };

  // Handle gcolor change
  const handleColorChange = (color: string) => {
    updateSearchParams({ color, page: "1" });
  };

  // Handle OrderBy change
  const handleOrderByChange = (orderBy: string) => {
    updateSearchParams({ order_by: orderBy, page: "1" });
  };
  // Handle search query
  const handleSearch = (query: string) => {
    updateSearchParams({ q: query, page: "1", color: "", orientation: "" });
  };

  // Handle image type change
  const handleImageTypeChange = (imageType: string) => {
    updateSearchParams({ image_type: imageType, page: "1" });
  };

  // Handle orientation change
  const handleOrientationChange = (orientation: string) => {
    updateSearchParams({ orientation, page: "1" });
  };

  const handleResetFilters = () => {
    updateSearchParams({
      q: searchedQuery,
      page: "1",
      color: "",
      orientation: "",
      image_type: "all",
      order_by: "",
    });
  };

  const appliedFilters = [
    selectedColor ? selectedColor : null,
    selectedOrientation && selectedOrientation != "all"
      ? selectedOrientation
      : null,
    selectedImageType && selectedImageType != "all",
    orderBy && orderBy != "relevant",
  ].filter(Boolean) as string[];

  const finalPixabayQuery = generateQueryParams(
    ["q", "per_page", "page", "orientation", "colors", "image_type"],
    [
      searchedQuery,
      50,
      currentPage,
      selectedOrientation == "portrait"
        ? "vertical"
        : selectedOrientation == "landscape"
        ? "horizontal"
        : selectedOrientation,
      selectedColor,
      selectedImageType,
    ]
  );
  const finalPexelQuery = generateQueryParams(
    ["query", "per_page", "page", "color", "orientation"],
    [searchedQuery, 50, currentPage, selectedColor, selectedOrientation]
  );
  const finalUnsplashQuery = generateQueryParams(
    ["query", "per_page", "page", "color", "orientation", "order_by"],
    [
      searchedQuery,
      30,
      currentPage,
      selectedColor,
      selectedOrientation == "square" ? "squarish" : selectedOrientation,
      orderBy,
    ]
  );
  return {
    selectedOrientation,
    selectedColor,
    searchedQuery,
    currentPage,
    handlePageChange,
    handleColorChange,
    handleSearch,
    handleOrientationChange,
    handleImageTypeChange,
    handleResetFilters,
    handleOrderByChange,
    finalQuery:
      source === "pexels"
        ? finalPexelQuery
        : source === "pixabay"
        ? finalPixabayQuery
        : finalUnsplashQuery,
    appliedFilters,
    setSource,
    source,
    selectedImageType,
    orderBy,
  };
}
