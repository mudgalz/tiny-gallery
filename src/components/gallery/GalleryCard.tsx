import useApiMutations from "@/api/mutations";
import LazyloadImage from "./LazyloadImage";
import LoadingButton from "../ui/loading-button";
import { cn } from "@/lib/utils";
import GalleryImageOverlay from "./GalleryImageOverlay";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { useGalleryStore } from "@/store/gallerySource";

interface GalleryCardProps {
  className?: string;
  image: PexelImage | PixabayImage;
}

export default function ({ className, image }: GalleryCardProps) {
  const { downloadImageMutation } = useApiMutations();
  const { setSelectedImageUrl } = useGalleryStore();
  const isPexelImage = "avg_color" in image;
  const handleDownload = (url: string, filename: string) => {
    downloadImageMutation.mutate({ url, filename });
  };
  const handleViewImage = () => {
    setSelectedImageUrl(isPexelImage ? image.src.large : image.largeImageURL);
  };
  return (
    <div
      onClick={handleViewImage}
      className={cn(
        "relative w-full h-full rounded-md overflow-hidden group hover:cursor-pointer",
        className
      )}>
      {/* Image Container with Shadow */}
      <div className="relative w-full h-full">
        <LazyloadImage
          className="w-full h-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105 shadow-md"
          image={image}
        />
        <GalleryImageOverlay className="group-hover:opacity-100 transition-opacity" />
        {/* Photographer Info */}
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-xs sm:text-sm p-1 px:2 sm:p-2 transition-transform duration-200 ease-in-out translate-y-10 group-hover:translate-y-0 whitespace-nowrap overflow-hidden text-ellipsis">
          Photo by{" "}
          <a
            title="View Photographer Profile"
            target="_blank"
            tabIndex={-1}
            className="underline"
            href={
              isPexelImage
                ? image.photographer_url
                : `https://pixabay.com/users/${image.user_id}`
            }>
            {isPexelImage ? image.photographer : image.user}
          </a>
        </div>
      </div>

      {/* Download Button */}
      <div className="absolute top-0 right-0 m-2 sm:opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 ">
        <LoadingButton
          size="sm"
          title="Download Image"
          isLoading={downloadImageMutation.isPending}
          onClick={() =>
            handleDownload(
              isPexelImage ? image.src.original : image.largeImageURL,
              `tiny-image-${image.id}.png`
            )
          }
          className="bg-white text-black hover:bg-gray-200 h-6 px-2 sm:h-8 sm:px-3">
          <span className="hidden sm:block">Download</span>
          <ArrowDownIcon className="sm:hidden" />
        </LoadingButton>
      </div>
    </div>
  );
}
