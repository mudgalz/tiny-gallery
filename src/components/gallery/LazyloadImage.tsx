import useResizeObserver from "@/hooks/useResizer";
import { getImageAttr } from "@/lib/utils";
import { memo } from "react";

interface LazyLoadImageProps {
  image: PexelImage | PixabayImage | UnsplashImage;
  className?: string;
}

const LazyLoadImage: React.FC<LazyLoadImageProps> = ({ image, className }) => {
  const { ref, width } = useResizeObserver();
  const {
    src,
    width: img_width,
    height: img_height,
    alt,
    color,
    srcSet,
  } = getImageAttr(image);
  const i_width = img_width;
  const height = img_height;

  // Calculate the aspect ratio and height dynamically based on the container width
  const aspectRatio = height / i_width;
  const calculatedHeight = width ? Math.round(aspectRatio * width) : 0;

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
        backgroundColor: color,
      }}>
      <img
        className="object-cover"
        src={src}
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
