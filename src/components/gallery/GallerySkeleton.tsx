import React from "react";
import { Skeleton } from "../ui/skeleton";

// Helper function to generate random heights
const getRandomHeight = () => {
  const minHeight = 200; // Minimum height for small images
  const maxHeight = 450; // Maximum height for large images
  return Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
};

const GallerySkeleton: React.FC = () => {
  // Create an array with 20 items for the skeleton placeholders
  const placeholderArray = Array.from({ length: 15 }, (_, index) => index);

  return (
    <>
      {placeholderArray.map((_, index) => (
        <Skeleton
          key={index}
          className="rounded mb-2 w-full"
          style={{ height: `${getRandomHeight()}px` }} // Dynamic height
        />
      ))}
    </>
  );
};

export default GallerySkeleton;
