import useDebounce from "@/hooks/useDebounce";
import useGalleryFilter from "@/hooks/useGalleryFilter";
import { validateHexCode } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import {
  orientationOptions,
  pixabayColorOptions,
  pixabayImageTypes,
} from "../../data";
import TinySelect from "../TinySelect";
import ColorPicker from "./ColorPicker";

export default function () {
  const {
    selectedColor,
    selectedOrientation,
    handleOrientationChange,
    handleColorChange,
    searchedQuery,
    source,
    selectedImageType,
    handleImageTypeChange,
  } = useGalleryFilter();

  const [hexCode, setHexCode] = useState<string>(selectedColor);
  const debouncedHexCode = useDebounce(
    validateHexCode(hexCode) ? hexCode : "",
    500
  );

  const handleHexCodeChange = useCallback((hex: string) => {
    setHexCode(hex);
  }, []);
  useEffect(() => {
    if (debouncedHexCode.length == 6) {
      handleColorChange(debouncedHexCode);
    }
  }, [debouncedHexCode]);
  useEffect(() => {
    if (selectedColor == "") {
      setHexCode("");
    }
  }, [selectedColor]);
  return (
    <div className="mt-4">
      <div
        className={`grid gap-2 ${
          source === "pexels" ? "sm:grid-cols-2" : "sm:grid-cols-3"
        }`}>
        <TinySelect
          disabled={!searchedQuery}
          className={`w-full h-full focus:ring-0 ${
            selectedOrientation != "all" && "bg-gray-100"
          }`}
          value={selectedOrientation}
          options={orientationOptions}
          onValueChange={(opt) => handleOrientationChange(opt)}
        />
        {source === "pexels" ? (
          <ColorPicker
            hexCode={hexCode}
            disabled={!searchedQuery}
            setHexCode={handleHexCodeChange}
          />
        ) : (
          <TinySelect
            className={`w-full h-full focus:ring-0 ${
              selectedColor != "" && "bg-gray-100"
            }`}
            value={selectedColor === "" ? "all" : selectedColor}
            onValueChange={(color) => handleColorChange(color)}
            options={pixabayColorOptions}
          />
        )}
        {source === "pixabay" && (
          <TinySelect
            className={`w-full h-full focus:ring-0 ${
              selectedImageType != "all" && "bg-gray-100"
            }`}
            value={selectedImageType}
            onValueChange={(type) => handleImageTypeChange(type)}
            options={pixabayImageTypes}
          />
        )}
      </div>
    </div>
  );
}
