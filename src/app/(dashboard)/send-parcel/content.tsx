"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  TruckIcon,
  PlaneIcon,
  CloudLightningIcon,
  CalendarIcon,
  RocketIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { defineStepper } from "@stepperize/react";
import { Step } from "@/components/stepper/step";
import CountryDropdown from "@/components/dropdown/countries-dropdown";
import StateDropdown from "@/components/dropdown/states-dropdown";

const Stepper = defineStepper(
  { id: "1", title: "Create Shipment" },
  { id: "2", title: "Second" },
  { id: "3", title: "Checkout" }
);

export default function Content() {
  const stepper = Stepper.useStepper();

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

        {/* next button */}
        {/* <Button onClick={stepper.next}>          
          {stepper.when(
            "1",
            () => "Next",
            () => "2",
          )}
          {stepper.when(
            "2",
            () => "Next",
            () => "3",
          )}
          {stepper.when(
            "3",
            () => "Submit",
            () => "",
          )}
        </Button> */}
        <main className="grid gap-4 md:grid-cols-3 w-full">
          <Card className="flex-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Get Instant Quotes</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="domestic" className="flex flex-col gap-4">
                <TabsList className="w-fit">
                  <TabsTrigger
                    value="domestic"
                    className="flex items-center gap-x-2"
                  >
                    <TruckIcon className="w-4 h-4" />
                    Domestic
                  </TabsTrigger>
                  <TabsTrigger
                    value="international"
                    className="flex items-center gap-x-2"
                  >
                    <PlaneIcon className="w-4 h-4" />
                    International
                  </TabsTrigger>
                  <TabsTrigger
                    value="on-demand"
                    className="flex items-center gap-x-2"
                  >
                    <CloudLightningIcon className="w-4 h-4" />
                    On-Demand
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="domestic" className="flex flex-col gap-4">
                  {/* FROM */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-x-2">
                      <Label>FROM:</Label>
                      <CountryDropdown />
                    </div>
                    <div className="flex items-center space-x-2">
                      <StateDropdown />
                      <Input placeholder="88300" />
                    </div>
                  </div>
                  {/* TO */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-x-2">
                      <Label>TO:</Label>
                      <CountryDropdown />
                    </div>
                    <div className="flex items-center gap-x-2">
                      <StateDropdown />
                      <Input placeholder="88300" />
                    </div>
                  </div>
                  {/* WEIGHT */}
                  <div className="flex flex-col gap-y-2">
                    <Label>WEIGHT:</Label>
                    <div className="flex items-center space-x-2">
                      <Input placeholder="kg (eg:0.1)" />
                      <Button variant="outline">
                        <CalendarIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full bg-pink-500" size="lg">
                    Quote & Book
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card className="flex-1 md:col-span-1 h-fit aspect-square">
            <CardContent className="flex justify-center items-center w-full h-full p-4">
              <Image
                src="https://s3.ap-southeast-1.amazonaws.com/scontent.easyparcel.com/pcm/image/general/my-booking-page-ads-image-1442-en.png"
                alt="promo"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </CardContent>
          </Card>
        </main>
      </div>
    </Stepper.Scoped>
  );
}
