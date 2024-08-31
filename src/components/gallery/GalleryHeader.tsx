import { imageSourceOptions } from "@/data";
import useGalleryFilter from "@/hooks/useGalleryFilter";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import AsyncAutocomplete from "../AsyncAutocomplete";
import TinySelect from "../TinySelect";
import { Button } from "../ui/button";
import { CommandShortcut } from "../ui/command";
import FilterToggleButton from "./FilterToggleButton";
import GalleryFilters from "./GalleryFilters";

interface Props {
  totalData?: number;
  loading?: boolean;
}
export default function ({ totalData = 0, loading }: Props) {
  const [showFilters, setShowFilters] = useState(false);
  const { searchedQuery, handleSearch, handleResetFilters, setSource, source } =
    useGalleryFilter();
  return (
    <>
      <div className="py-1 flex flex-col md:flex-row gap-4 justify-between items-center">
        <h2 className="text-3xl font-medium">
          {loading
            ? "Finding Photos..."
            : !searchedQuery
            ? `Free ${totalData} Stock Photos`
            : `Found ${totalData} ${searchedQuery} Photos`}
        </h2>
        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap md:flex-nowrap">
          {/* Search Button */}
          <AsyncAutocomplete<string>
            type="normal"
            onItemClick={(q) => handleSearch(q)}
            triggerElement={
              <Button
                className="text-gray-600 text-start justify-start gap-2 h-full basis-full"
                variant="outline">
                <MagnifyingGlassIcon className="size-4" />
                Search Photos
                <CommandShortcut className="hidden md:block">
                  ⌘+K
                </CommandShortcut>
              </Button>
            }
          />

          {/* Filter Button */}
          <FilterToggleButton
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />

          {/* API Source Button */}
          <TinySelect
            className="flex-1"
            value={source}
            onValueChange={(v) => {
              handleResetFilters();
              setSource(v as "pexels" | "pixabay");
            }}
            options={imageSourceOptions}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="transition-wrapper" data-open={showFilters}>
        <div className="overflow-hidden">
          <GalleryFilters />
        </div>
      </div>
    </>
  );
}
