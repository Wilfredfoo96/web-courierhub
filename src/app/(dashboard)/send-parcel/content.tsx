"use client";
import { Card, CardContent } from "@/components/ui/card";
import { defineStepper } from "@stepperize/react";
import { Step } from "@/components/stepper/step";
import QuoteForm from "@/app/(dashboard)/send-parcel/form/quote/form";
import Image from "next/image";
import { DataTableDemo } from "./form/quote/data-table";
import { useAction } from "next-safe-action/hooks";
import { postPosLajuToken } from "@/action/common/post-poslaju-token";

const Stepper = defineStepper(
  { id: "1", title: "Create Shipment" },
  { id: "2", title: "Second" },
  { id: "3", title: "Checkout" }
);

export default function Content() {
  const stepper = Stepper.useStepper();

  const { execute, result, isPending } = useAction(postPosLajuToken);

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
                  <QuoteForm
                    onQuote={() =>
                      execute({
                        clientId:
                          process.env
                            .NEXT_PUBLIC_POSLAJU_DOMESTIC_BY_POSTCODE_CLIENT_ID ||
                          "667e4fbaff8384000e89765f",
                        clientSecret:
                          process.env
                            .NEXT_PUBLIC_POSLAJU_DOMESTIC_BY_POSTCODE_CLIENT_SECRET ||
                          "y76m0uoL5dh//GDWhXlbEaP+Lqy5tsDX1+WMz8Jf9RA=",
                        grantType:
                          process.env
                            .NEXT_PUBLIC_POSLAJU_DOMESTIC_BY_POSTCODE_GRANT_TYPE ||
                          "client_credentials",
                        scope:
                          process.env
                            .NEXT_PUBLIC_POSLAJU_DOMESTIC_BY_POSTCODE_SCOPE ||
                          "as2corporate.poslaju-domestic-by-postcode.all",
                      })
                    }
                  />
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
                <DataTableDemo />
              </div>
            ),
            () => "2"
          )}
        </main>
      </div>
    </Stepper.Scoped>
  );
}
