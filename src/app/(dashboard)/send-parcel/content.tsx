"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  TruckIcon,
  PlaneIcon,
  CloudLightningIcon,
  Calculator,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { defineStepper } from "@stepperize/react";
import { Step } from "@/components/stepper/step";
import CountryDropdown from "@/components/dropdown/countries-dropdown";
import StateDropdown from "@/components/dropdown/states-dropdown";
import { useSendParcelStore } from "@/lib/store/send-parcel-store";
import { useEffect } from "react";
import { findPostcode } from "malaysia-postcodes";
import states from "@/data/states.json";
import { StateProps } from "@/lib/types";
import { lowerCase } from "@/lib/utils";

const Stepper = defineStepper(
  { id: "1", title: "Create Shipment" },
  { id: "2", title: "Second" },
  { id: "3", title: "Checkout" }
);

export default function Content() {
  const stepper = Stepper.useStepper();

  const SD = states as StateProps[];

  const {
    fromCountry,
    setFromCountry,
    fromState,
    setFromState,
    fromPostcode,
    setFromPostcode,
    toCountry,
    setToCountry,
    toState,
    setToState,
    toPostcode,
    setToPostcode,
    deliveryMode,
    setDeliveryMode,
  } = useSendParcelStore();

  useEffect(() => {
    if (deliveryMode === "domestic") {
      setFromCountry("MY");
      setFromState("Sabah");

      setToCountry("MY");
      setToState("Sabah");
    } else if (deliveryMode === "international") {
      setFromCountry("MY");
      setFromState("Sabah");

      setToCountry("SG");
      setToState("");
    }
  }, [deliveryMode]);

  useEffect(() => {
    if (fromCountry === "MY" && fromPostcode) {
      const location = findPostcode(fromPostcode);
      if (location.found) {
        const res = SD.find(
          (state) => lowerCase(state.name) === lowerCase(location.state || "")
        );
        if (res) {
          setFromState(res.name);
        }
      }
    }
  }, [fromCountry, fromPostcode]);

  useEffect(() => {
    if (toCountry === "MY" && toPostcode) {
      const location = findPostcode(toPostcode);
      if (location.found) {
        const res = SD.find(
          (state) => lowerCase(state.name) === lowerCase(location.state || "")
        );
        if (res) {
          setToState(res.name);
        }
      }
    }
  }, [toCountry, toPostcode]);

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
          {stepper.when(
            "1",
            () => (
              <>
                <Card className="flex-1 md:col-span-2">
                  <CardHeader>
                    <CardTitle>Get Instant Quotes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs
                      defaultValue={deliveryMode}
                      className="flex flex-col gap-4"
                      onValueChange={setDeliveryMode}
                    >
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
                      <TabsContent
                        value="domestic"
                        className="flex flex-col gap-4"
                      >
                        {/* FROM */}
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-x-2">
                            <Label>FROM:</Label>
                            <CountryDropdown
                              countryValue={fromCountry}
                              onSelect={setFromCountry}
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <StateDropdown
                              stateValue={fromState}
                              countryValue={fromCountry}
                              onSelect={setFromState}
                            />
                            <Input
                              value={fromPostcode}
                              placeholder="Postcode"
                              onChange={(e) => setFromPostcode(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* To */}
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-x-2">
                            <Label>TO:</Label>
                            <CountryDropdown
                              countryValue={toCountry}
                              onSelect={setToCountry}
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <StateDropdown
                              stateValue={toState}
                              countryValue={toCountry}
                              onSelect={setToState}
                            />
                            <Input
                              value={toPostcode}
                              placeholder="Postcode"
                              onChange={(e) => setToPostcode(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* WEIGHT */}
                        <div className="flex flex-col gap-y-2">
                          <Label>WEIGHT:</Label>
                          <div className="flex items-center space-x-2">
                            <Input placeholder="kg (eg:0.1)" />
                            <Button variant="outline">
                              <Calculator className="size-4" />
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
                      priority
                      src="https://s3.ap-southeast-1.amazonaws.com/scontent.easyparcel.com/pcm/image/general/my-booking-page-ads-image-1442-en.png"
                      alt="promo"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </CardContent>
                </Card>
              </>
            ),
            () => "2"
          )}
        </main>
      </div>
    </Stepper.Scoped>
  );
}
