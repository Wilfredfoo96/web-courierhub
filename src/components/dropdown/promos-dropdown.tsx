"use client";

/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn, lowerCase } from "@/lib/utils";
import promos from "@/data/promos.json";

import { PromoProps } from "@/lib/types";

interface PromosDropdownProps {
  disabled?: boolean;
  onSelect: (data: any) => void;
}

const PromosDropdown = ({ disabled, onSelect }: PromosDropdownProps) => {
  const P = promos as PromoProps[];

  const [promoValue, setPromoValue] = useState("ch100");
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100px] justify-between rounded-[6px] bg-orange-500 text-white"
          disabled={disabled}
          size="sm"
        >
          <span>
            {promoValue ? (
              <div className="flex items-end gap-2">
                <span>
                  {promos.find((promo) => promo.name === promoValue)?.name}
                </span>
              </div>
            ) : (
              <span>Select Promo Package...</span>
            )}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] rounded-[6px] p-0">
        <Command>
          <CommandInput placeholder="Search promo package..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-[300px] w-full">
                {P.map((promo) => (
                  <CommandItem
                    key={promo.name}
                    value={promo.name}
                    onSelect={(currentValue) => {
                      if (lowerCase(currentValue) === lowerCase(promo.name)) {
                        onSelect(promo.name);
                        setPromoValue(promo.name);
                      } else {
                        onSelect("");
                        setPromoValue("");
                      }
                      setOpen(false);
                    }}
                    className="flex cursor-pointer items-center justify-between text-xs hover:!bg-[#27272a] hover:!text-white"
                  >
                    <span className="">{promo.name}</span>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        promoValue === promo.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PromosDropdown;
