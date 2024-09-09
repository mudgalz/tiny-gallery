import { fetchPexelImages, fetchPixabayImages } from "@/api";
import GalleryCard from "@/components/gallery/GalleryCard";
import GalleryHeader from "@/components/gallery/GalleryHeader";
import GallerySkeleton from "@/components/gallery/GallerySkeleton";
import { AbsoluteCenteredWrapper } from "@/components/loader";
import PaginationSelector from "@/components/ui/PaginationSelector";
import useGalleryFilter from "@/hooks/useGalleryFilter";
import { useGalleryStore } from "@/store/gallerySource";
import { useQuery } from "@tanstack/react-query";
import Viewer from "react-viewer";
// Define the response types
type GalleryResponse = PexelResponse | PixabayResponse;

export default function Gallery() {
  const { currentPage, searchedQuery, finalQuery, handlePageChange, source } =
    useGalleryFilter();
  const { selectedImageUrl, setSelectedImageUrl } = useGalleryStore();
  const pexelApiUrl = !!searchedQuery
    ? `search?${finalQuery}`
    : `curated?${finalQuery}`;
  const pixabayApiUrl = `?${finalQuery}`; // Adjusted

  const { data, isLoading } = useQuery<GalleryResponse>({
    queryKey: ["gallery", source, finalQuery],
    queryFn: async () => {
      if (source === "pexels") {
        return await fetchPexelImages(
          `https://api.pexels.com/v1/${pexelApiUrl}`
        );
      } else {
        return await fetchPixabayImages(pixabayApiUrl);
      }
    },
    refetchOnMount: false,
  });

  // Safely handle the data depending on the source
  let flatData: PexelImage[] | PixabayImage[] | undefined = [];
  let totalResults: number | undefined;

  if (source === "pexels" && data && "photos" in data) {
    flatData = data.photos;
    totalResults = data.total_results;
  } else if (source === "pixabay" && data && "hits" in data) {
    flatData = data.hits;
    totalResults = data.totalHits;
  }
  return (
    <>
      <div className="w-full p-4 xl:px-0 flex-grow">
        <GalleryHeader totalData={totalResults} loading={isLoading} />
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mt-4">
          {isLoading ? (
            <GallerySkeleton />
          ) : (
            flatData?.map((image) => (
              <GalleryCard key={image.id} image={image} />
            ))
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
            pages={Math.ceil(totalResults / 30)}
          />
        ) : null}
      </div>
      <Viewer
        images={[{ src: selectedImageUrl!, alt: "Image Preview" }]}
        visible={!!selectedImageUrl}
        onClose={() => setSelectedImageUrl("")}
        noToolbar
        noFooter
        zoomSpeed={0.05}
        className="z-20 relative"
      />
    </>
  );
}
