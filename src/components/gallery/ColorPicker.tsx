import { validateHexCode } from "@/lib/utils";
import { ChevronDownIcon, DotFilledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { hexColors } from "../../data";
import { Popover, PopoverContent, PopoverTrigger } from "..//ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ColorPickerInputProps {
  hexCode: string;
  setHexCode: (hex: string) => void;
  disabled?: boolean;
}
const ColorPickerInput: React.FC<ColorPickerInputProps> = ({
  hexCode,
  setHexCode,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleColorSelect = (hex: string) => {
    setHexCode(hex.slice(1));
    setIsOpen(false);
  };

  return (
    <div className="w-full relative">
      <Popover open={isOpen} onOpenChange={disabled ? undefined : setIsOpen}>
        <PopoverTrigger asChild disabled>
          <div className="w-full grid grid-cols-2 border rounded hover:border-gray-400/80">
            <div className="flex items-center justify-center gap-1 px-2">
              <DotFilledIcon
                className="size-4 p-2 rounded-full border"
                style={{ backgroundColor: hexCode }}
              />
              <div className="flex items-center">
                {hexCode && <span className="font-semibold">#</span>}
                <Input
                  disabled={disabled}
                  maxLength={6}
                  onClick={(e) => e.stopPropagation()}
                  value={hexCode}
                  onChange={(e) => {
                    const val = e.target.value
                      .trim()
                      .replace(/[^0-9A-Za-z]/g, "");
                    setHexCode(val);
                  }}
                  placeholder="Enter hex code"
                  className={`placeholder:font-medium placeholder:tracking-normal border-none p-0 font-semibold tracking-wider focus-visible:ring-0 ${
                    !validateHexCode(hexCode) ? "text-rose-600" : ""
                  }`}
                />
              </div>
            </div>
            <Button
              disabled={disabled}
              size={"sm"}
              variant="link"
              className="justify-end items-center h-full">
              <ChevronDownIcon
                className={`size-4 transition-transform ${
                  isOpen && "rotate-180"
                }`}
              />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-2 grid grid-cols-7 gap-2">
          {hexColors.map((color, index) => (
            <div
              key={index}
              role="button"
              aria-label={`Select ${color}`}
              onClick={() => handleColorSelect(color)}
              className="w-8 h-6 rounded cursor-pointer"
              style={{ backgroundColor: color }}
            />
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColorPickerInput;
