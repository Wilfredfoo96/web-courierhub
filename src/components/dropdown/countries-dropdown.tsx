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
import countries from "@/data/countries.json";

import { CountryProps } from "@/lib/types";

interface CountryDropdownProps {
  disabled?: boolean;
  countryValue: string;
  onSelect: (country: string) => void;
}

const CountryDropdown = ({
  disabled,
  countryValue,
  onSelect,
}: CountryDropdownProps) => {
  const C = countries as CountryProps[];

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between rounded-[6px] border"
          disabled={disabled}
        >
          <span>
            {countryValue ? (
              <div className="flex items-end gap-2">
                <span>
                  {
                    countries.find((country) => country.iso2 === countryValue)
                      ?.emoji
                  }
                </span>
                <span>
                  {
                    countries.find((country) => country.iso2 === countryValue)
                      ?.name
                  }
                </span>
              </div>
            ) : (
              <span>Select Country...</span>
            )}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] rounded-[6px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-[300px] w-full">
                {C.map((country) => (
                  <CommandItem
                    key={country.id}
                    value={country.name}
                    onSelect={(currentValue) => {
                      if (lowerCase(currentValue) === lowerCase(country.name)) {
                        onSelect(country.iso2);
                      } else {
                        onSelect("");
                      }
                      setOpen(false);
                    }}
                    className="flex cursor-pointer items-center justify-between text-xs hover:!bg-[#27272a] hover:!text-white"
                  >
                    <div className="flex items-end gap-2">
                      <span>{country.emoji}</span>
                      <span className="">{country.name}</span>
                    </div>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        countryValue === country.iso2
                          ? "opacity-100"
                          : "opacity-0"
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

export default CountryDropdown;
