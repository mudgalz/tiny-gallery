import { FilterIcon } from "@/assets/icons";
import useGalleryFilter from "@/hooks/useGalleryFilter";
import { Cross1Icon } from "@radix-ui/react-icons";
import TinyTooltip from "../TinyTooltip";
import { Button } from "../ui/button";
type Props = {
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function ({ setShowFilters, showFilters }: Props) {
  const { searchedQuery, handleResetFilters, appliedFilters } =
    useGalleryFilter();
  const isFilterApplied = appliedFilters.length > 0;

  return (
    <div className="flex basis-1/2">
      <TinyTooltip
        content={!searchedQuery ? "Available on search results" : ""}>
        <span className="w-full">
          <Button
            disabled={!searchedQuery}
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className={`flex items-center justify-center gap-2 w-full ${
              isFilterApplied ? "rounded-r-none" : ""
            }`}>
            <FilterIcon
              className={`transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
            Filters {isFilterApplied ? `(${appliedFilters.length})` : ""}
          </Button>
        </span>
      </TinyTooltip>
      {isFilterApplied && (
        <Button
          onClick={() => handleResetFilters()}
          size="icon"
          variant={"outline"}
          className="rounded-l-none">
          <Cross1Icon />
        </Button>
      )}
    </div>
  );
}
