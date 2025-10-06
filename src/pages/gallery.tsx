import {
  fetchPexelImages,
  fetchPixabayImages,
  fetchUnsplashImages,
} from "@/api";
import GalleryCard from "@/components/gallery/GalleryCard";
import GalleryHeader from "@/components/gallery/GalleryHeader";
import GallerySkeleton from "@/components/gallery/GallerySkeleton";
import { AbsoluteCenteredWrapper } from "@/components/loader";
import PaginationSelector from "@/components/ui/PaginationSelector";
import useGalleryFilter from "@/hooks/useGalleryFilter";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

// Define the response types
type GalleryResponse = PexelResponse | PixabayResponse | UnsplashResponse;

export default function Gallery() {
  const { currentPage, searchedQuery, finalQuery, handlePageChange, source } =
    useGalleryFilter();
  const apiUrl = useMemo(() => {
    switch (source) {
      case "pexels":
        return `https://api.pexels.com/v1/${
          searchedQuery ? `search?${finalQuery}` : `curated?${finalQuery}`
        }`;
      case "pixabay":
        return `?${finalQuery}`;
      case "unsplash":
        return searchedQuery
          ? `search/photos?${finalQuery}`
          : `photos?${finalQuery}`;
      default:
        return "";
    }
  }, [source, searchedQuery, finalQuery]);

  const { data, isLoading } = useQuery<GalleryResponse>({
    queryKey: ["gallery", source, finalQuery],
    queryFn: async () => {
      switch (source) {
        case "pexels":
          return await fetchPexelImages(apiUrl);
        case "pixabay":
          return await fetchPixabayImages(apiUrl);
        case "unsplash":
          return await fetchUnsplashImages(apiUrl, !!searchedQuery);
      }
    },
    refetchOnMount: false,
  });

  // Safely handle the data depending on the source
  const { flatData, totalResults } = useMemo(() => {
    if (!data) return { flatData: [], totalResults: 0 };

    if (source === "pexels" && "photos" in data) {
      return { flatData: data.photos, totalResults: data.total_results };
    } else if (source === "pixabay" && "hits" in data) {
      return { flatData: data.hits, totalResults: data.totalHits };
    } else if (source === "unsplash" && "results" in data) {
      return { flatData: data.results, totalResults: data.total };
    }
    return { flatData: [], totalResults: 0 };
  }, [data, source]);

  return (
    <div className="w-full p-4 2xl:px-0 flex-grow">
      <GalleryHeader totalData={totalResults} loading={isLoading} />
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 mt-4">
        {isLoading ? (
          <GallerySkeleton />
        ) : (
          flatData?.map((image) => <GalleryCard key={image.id} image={image} />)
        )}
      </div>
      {!isLoading && !flatData?.length && (
        <AbsoluteCenteredWrapper className="text-xl">
          No Photos Found
        </AbsoluteCenteredWrapper>
      )}
      {!isLoading && totalResults !== undefined && flatData?.length ? (
        <PaginationSelector
          currentPage={currentPage}
          onPageChange={(page) => handlePageChange(page)}
          pages={Math.ceil(totalResults / (source === "unsplash" ? 30 : 50))}
        />
      ) : null}
    </div>
  );
}
