import PromosDropdown from "@/components/dropdown/promos-dropdown";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Check,
  Clock,
  Info,
  MoreHorizontal,
  PrinterCheck,
} from "lucide-react";
import Image from "next/image";
// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

export const columns: ColumnDef<any>[] = [
  {
    id: "No.",
    header: "No.",
    cell: ({ row }) => <span>{`#${Number(row.id) + 1}`}</span>,
  },
  {
    accessorKey: "courier",
    header: "Courier",
    cell: ({ row }) => (
      <div className="aspect-square size-16">
        <Image
          src={row.getValue("courier")}
          alt="courier"
          className="w-full h-full object-cover"
          width={100}
          height={100}
        />
      </div>
    ),
  },
  {
    accessorKey: "serviceInfo",
    header: "Service Info",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-2">
          <Check className="size-4" />
          <span>Pickup from Doorstep</span>
        </div>
        <div className="flex gap-x-2">
          <Clock className="size-4" />
          <span>1 - 3 working days</span>
        </div>
        <div className="flex gap-x-2">
          <PrinterCheck className="size-4" />
          <span>Yes</span>
        </div>
        <div className="flex gap-x-2">
          <Info className="size-4" />
          <span className="underline decoration-dotted">More service info</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "rate",
    header: "Your Rate",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("rate"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-MY", {
        style: "currency",
        currency: "MYR",
      }).format(amount);

      return <div className="font-medium text-orange-500">{formatted}</div>;
    },
  },
  {
    accessorKey: "promoRate",
    header: () => (
      <div className="flex items-center gap-x-2">
        <span>Promo Rate</span>
        <PromosDropdown onSelect={() => {}} />
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("promoRate"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-MY", {
        style: "currency",
        currency: "MYR",
      }).format(amount);

      return (
        <div className="font-medium underline decoration-dotted cursor-pointer">
          {formatted}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <Button
          variant="outline"
          size="lg"
          className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
        >
          Select
        </Button>
      );
    },
  },
];
