import useApiMutations from "@/api/mutations";
import LazyloadImage from "./LazyloadImage";
import LoadingButton from "../ui/loading-button";
import { cn } from "@/lib/utils";
import GalleryImageOverlay from "./GalleryImageOverlay";

interface GalleryCardProps {
  className?: string;
  image: PexelImage | PixabayImage;
}

export default function ({ className, image }: GalleryCardProps) {
  const { downloadImageMutation } = useApiMutations();
  const handleDownload = (url: string, filename: string) => {
    downloadImageMutation.mutate({ url, filename });
  };
  const isPexelImage = "avg_color" in image;
  return (
    <div
      className={cn(
        "relative w-full h-full rounded-md overflow-hidden group",
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
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-sm p-2 transition-transform duration-200 ease-in-out sm:translate-y-10 group-hover:translate-y-0">
          Photo by{" "}
          <a
            title="View Photographer Profile"
            target="_blank"
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
      <div className="absolute top-0 right-0 m-2 sm:opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
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
          className="bg-white text-black hover:bg-gray-200">
          Download
        </LoadingButton>
      </div>
    </div>
  );
}
