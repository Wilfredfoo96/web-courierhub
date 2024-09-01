"use client";
import { Card, CardContent } from "@/components/ui/card";
import { defineStepper } from "@stepperize/react";
import { Step } from "@/components/stepper/step";
import QuoteForm from "@/app/(dashboard)/send-parcel/form/quote/form";
import Image from "next/image";
import { DataTableDemo } from "./form/quote/data-table";
import { useMutation } from "@tanstack/react-query";
import { getQuote } from "@/lib/api/get-quote";
import { PoslajuGetQuoteSchema } from "@/types/zod/schema-poslaju-quote";
import { toast } from "sonner";
import { ApiError } from "@/lib/errors/api-errors";

const Stepper = defineStepper(
  { id: "1", title: "Create Shipment" },
  { id: "2", title: "Second" },
  { id: "3", title: "Checkout" }
);

export default function Content() {
  const stepper = Stepper.useStepper();

  const {
    mutateAsync,
    isPending,
    data: quoteData,
  } = useMutation({
    mutationFn: getQuote,
  });

  const handleError = (error: unknown) => {
    if (error instanceof ApiError) {
      toast.error(error.title, {
        description: error.message,
      });
    } else if (error instanceof Error) {
      toast.error("Error", {
        description: error.message,
      });
    } else {
      toast.error("Unexpected Error", {
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const onQuote = async ({
    postcodeFrom,
    postcodeTo,
    weight,
  }: PoslajuGetQuoteSchema) => {
    try {
      await mutateAsync({
        postcodeFrom,
        postcodeTo,
        weight,
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Stepper.Scoped>
      <div className="flex flex-col w-full min-h-screen py-6 gap-y-6 md:py-8 md:gap-y-8">
        <ol className="flex items-center w-full justify-center text-xs text-gray-900 font-medium sm:text-base">
          <div className="flex justify-center w-full pl-16 sm:max-w-sm">
            <Step stepId={"1"} step={1} stepper={stepper} />
            <Step stepId={"2"} step={2} stepper={stepper} />
            <Step stepId={"3"} step={3} isLast={true} stepper={stepper} />
          </div>
        </ol>

        <main className="h-full w-full">
          {stepper.when(
            "1",
            () => (
              <div className="flex flex-col gap-y-12">
                <div className="grid gap-4 md:grid-cols-3 w-full">
                  <QuoteForm onQuote={onQuote} isPending={isPending} />
                  <Card className="flex-1 md:col-span-1 h-fit aspect-square">
                    <CardContent className="flex justify-center items-center w-full h-full p-4">
                      <Image
                        priority
                        src="https://s3.ap-southeast-1.amazonaws.com/scontent.easyparcel.com/pcm/image/general/my-booking-page-ads-image-1442-en.png"
                        alt="promo"
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
                <DataTableDemo data={quoteData || []} />
              </div>
            ),
            () => "2"
          )}
        </main>
      </div>
    </Stepper.Scoped>
  );
}
