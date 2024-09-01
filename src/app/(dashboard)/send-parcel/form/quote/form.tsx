"use client";
import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  TruckIcon,
  PlaneIcon,
  CloudLightningIcon,
  Calculator,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import CountryDropdown from "@/components/dropdown/countries-dropdown";
import StateDropdown from "@/components/dropdown/states-dropdown";
import { useSendParcelStore } from "@/lib/store/send-parcel-store";
import { findPostcode } from "malaysia-postcodes";
import states from "@/data/states.json";
import { StateProps } from "@/types/common/state";
import { lowerCase } from "@/lib/utils";
import { PoslajuGetQuoteSchema } from "@/types/zod/schema-poslaju-quote";

interface QuoteFormProps {
  isPending: boolean;
  onQuote: (params: PoslajuGetQuoteSchema) => void;
}

export default function QuoteForm({ onQuote, isPending }: QuoteFormProps) {
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

  const handleQuote = async () => {
    onQuote({
      postcodeFrom: "88200",
      postcodeTo: "88400",
      weight: 2.33,
    });
  };

  return (
    <Card className="flex-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Get Instant Quotes</CardTitle>
      </CardHeader>
      <CardContent>
        ``
        <Tabs
          defaultValue={deliveryMode}
          className="flex flex-col gap-4"
          onValueChange={setDeliveryMode}
        >
          <TabsList className="w-fit">
            <TabsTrigger value="domestic" className="flex items-center gap-x-2">
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
            <Button
              className="w-full bg-pink-500"
              size="lg"
              onClick={handleQuote}
            >
              Quote & Book
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
