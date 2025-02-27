import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarToggleButtonProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggleButton({
  isOpen,
  setIsOpen,
}: SidebarToggleButtonProps) {
  return (
    <div className="invisible lg:visible absolute top-[12px] -right-[16px] z-20">
      <Button
        onClick={() => setIsOpen?.()}
        className="rounded-full size-8"
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            "size-4 transition-transform ease-in-out duration-700",
            isOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
}
