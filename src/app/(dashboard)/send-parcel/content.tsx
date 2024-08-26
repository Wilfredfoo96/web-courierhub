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
        <main className="grid gap-4 md:grid-cols-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Get Instant Quotes</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="domestic">
                <TabsList>
                  <TabsTrigger value="domestic">
                    <TruckIcon className="w-4 h-4" />
                    Domestic
                  </TabsTrigger>
                  <TabsTrigger value="international">
                    <PlaneIcon className="w-4 h-4" />
                    International
                  </TabsTrigger>
                  <TabsTrigger value="on-demand">
                    <CloudLightningIcon className="w-4 h-4" />
                    On-Demand
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="domestic">
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label>FROM:</Label>
                        <div className="flex items-center space-x-2">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="MALAYSIA" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="malaysia">MALAYSIA</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input placeholder="Sabah" />
                        </div>
                      </div>
                      <Input placeholder="88300" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label>TO:</Label>
                        <div className="flex items-center space-x-2">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="MALAYSIA" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="malaysia">MALAYSIA</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input placeholder="State" />
                        </div>
                      </div>
                      <Input placeholder="Postcode" />
                    </div>
                    <div>
                      <Label>WEIGHT:</Label>
                      <div className="flex items-center space-x-2">
                        <Input placeholder="kg (eg:0.1)" />
                        <Button variant="outline">
                          <CalendarIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full bg-pink-500">Quote & Book</Button>
                    <div className="text-sm text-muted-foreground">
                      <RocketIcon className="w-4 h-4" />
                      Send more parcels at a time?{" "}
                      <a href="#" className="text-pink-500 underline">
                        View more
                      </a>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center p-4 bg-blue-100 rounded">
                  <h2 className="text-lg font-bold">
                    Top Up Higher Package at Lower Price
                  </h2>
                  <Button className="mt-4 bg-blue-500">Top Up Now</Button>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-red-100 rounded">
                  <h2 className="text-lg font-bold">
                    Top Up Full Packages For FREE Credits
                  </h2>
                  <p className="mt-2 text-sm">From 15th - 31st August 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </Stepper.Scoped>
  );
}
