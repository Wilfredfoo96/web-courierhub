import Link from "next/link";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          COPYRIGHT © 2024
          <Link
            href="https://courierhub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 mx-2"
          >
            COURIERHUB SDN. BHD.
          </Link>
          All Rights Reserved
        </p>
      </div>
    </div>
  );
}
