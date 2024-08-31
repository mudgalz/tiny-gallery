import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import {
  cloneElement,
  isValidElement,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { Loader } from "./loader";
import { DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

type AutocompleteType = "datafetching" | "normal";

interface AutocompleteProps<T> {
  triggerElement?: ReactElement<{ onClick: () => void }>;
  fetchMethod?: (query: string) => Promise<T[]>;
  renderItem?: (item: T) => React.ReactNode;
  onItemClick?: (item: T) => void;
  debounceDelay?: number;
  type: AutocompleteType;
  placeholder?: string;
}

export default function <T>({
  triggerElement,
  fetchMethod,
  debounceDelay,
  onItemClick,
  renderItem,
  type,
  placeholder,
}: AutocompleteProps<T>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQry = useDebounce(query.trim(), debounceDelay ?? 1500);

  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["search", debouncedQry],
    queryFn: () => fetchMethod?.(debouncedQry),
    enabled: type === "datafetching" && Boolean(debouncedQry),
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleItemClick = (item: T | string) => {
    if (type === "datafetching" && typeof item !== "string") {
      onItemClick?.(item); // Ensures the correct type is passed to onItemClick
    } else if (type === "normal" && typeof item === "string") {
      onItemClick?.(item.trimStart() as unknown as T); // Cast string to T
    }
    setOpen(false);
  };

  const fetchedData = data || [];

  return (
    <>
      {isValidElement(triggerElement) &&
        cloneElement(triggerElement, { onClick: () => setOpen(true) })}
      <CommandDialog open={open} onOpenChange={setOpen} hideCloseIcon>
        <DialogTitle hidden></DialogTitle>
        <Command shouldFilter={false}>
          <div
            className={
              type == "normal" ? "flex justify-between items-center" : ""
            }>
            <CommandInput
              className="text-base"
              value={query}
              onValueChange={(q) => setQuery(q)}
              placeholder={placeholder ?? "Type something to search..."}
              onKeyDown={(e) => {
                if (e.key === "Enter" && type === "normal") {
                  handleItemClick(query);
                }
              }}
            />
            {type == "normal" && (
              <Button
                size="sm"
                onClick={() => handleItemClick(query)}
                variant="outline"
                className="mr-4 relative">
                Search
              </Button>
            )}
          </div>
          <CommandList>
            {type === "datafetching" && (
              <>
                <CommandEmpty>
                  {isLoading ? (
                    <Loader className="border size-5" />
                  ) : isFetched && fetchedData.length === 0 ? (
                    "No results found"
                  ) : (
                    ""
                  )}
                </CommandEmpty>

                {fetchedData.map((item: T, idx: number) => (
                  <CommandItem
                    onSelect={() => handleItemClick(item)}
                    className="static"
                    key={idx}>
                    {renderItem?.(item)}
                  </CommandItem>
                ))}
              </>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
