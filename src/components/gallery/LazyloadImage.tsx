import useResizeObserver from "@/hooks/useResizer";
import { memo } from "react";

interface LazyLoadImageProps {
  image: PexelImage | PixabayImage;
  className?: string;
}

const LazyLoadImage: React.FC<LazyLoadImageProps> = ({ image, className }) => {
  const { ref, width } = useResizeObserver();
  const isPexelImage = "avg_color" in image;
  const alt = isPexelImage ? image.alt : image.tags;
  const i_width = isPexelImage ? image.width : image.webformatWidth;
  const height = isPexelImage ? image.height : image.webformatHeight;

  // Calculate the aspect ratio and height dynamically based on the container width
  const aspectRatio = height / i_width;
  const calculatedHeight = width ? Math.round(aspectRatio * width) : 0;

  // Construct the srcSet string with different image resolutions
  const srcSet = `
    ${isPexelImage ? image.src.tiny : image.previewURL} 200w,
    ${isPexelImage ? image.src.small : image.webformatURL} 400w,
    ${isPexelImage ? image.src.medium : image.webformatURL} 800w,
    ${isPexelImage ? image.src.large : image.webformatURL} 1200w,
    ${isPexelImage ? image.src.large : image.webformatURL} 1600w,
  `;

  // Define the sizes attribute based on typical viewport widths
  const sizes = `
    (max-width: 600px) 480px,
    (max-width: 1200px) 800px,
    1200px
  `;
  return (
    <div
      ref={ref}
      className={className}
      style={{
        height: `${calculatedHeight}px`,
        backgroundColor: isPexelImage ? image.avg_color : "#f6f6f6",
      }}>
      <img
        className="object-cover"
        src={isPexelImage ? image.src.medium : image.webformatURL}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading="lazy"
        width={"100%"}
      />
    </div>
  );
};

// Export the component wrapped in React.memo for performance optimization
export default memo(LazyLoadImage);
