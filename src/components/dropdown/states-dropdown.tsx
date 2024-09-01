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
import states from "@/data/states.json";

import { StateProps } from "@/types/common/state";

interface StateDropdownProps {
  countryValue: string;
  stateValue: string;
  onSelect: (state: string) => void;
}

const StateDropdown = ({
  countryValue,
  stateValue,
  onSelect,
}: StateDropdownProps) => {
  const [open, setOpen] = useState(false);

  const SD = states as StateProps[];
  const S = SD.filter((state) => state.country_code === countryValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] cursor-pointer justify-between rounded-[6px] border  disabled:!cursor-not-allowed disabled:!opacity-50"
          disabled={!countryValue || S.length === 0}
        >
          {stateValue ? (
            <div className="flex items-end gap-2">
              <span>
                {
                  S.find(
                    (state) => lowerCase(state.name) === lowerCase(stateValue)
                  )?.name
                }
              </span>
            </div>
          ) : (
            <span>Select State...</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] rounded-[6px] border border-[#27272a] p-0">
        <Command>
          <CommandInput placeholder="Search state..." />
          <CommandList>
            <CommandEmpty>No state found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-[300px] w-full">
                {S.map((state) => (
                  <CommandItem
                    key={state.id}
                    value={state.name}
                    onSelect={(currentValue) => {
                      if (lowerCase(currentValue) === lowerCase(state.name)) {
                        onSelect(state.name);
                      } else {
                        onSelect("");
                      }
                      setOpen(false);
                    }}
                    className="flex cursor-pointer items-center justify-between text-xs hover:!bg-[#27272a] hover:!text-white"
                  >
                    <div className="flex items-end gap-2">
                      <span className="">{state.name}</span>
                    </div>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        lowerCase(stateValue) === lowerCase(state.name)
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

export default StateDropdown;
