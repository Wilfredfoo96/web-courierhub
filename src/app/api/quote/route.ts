import { getToken } from "@/lib/api/get-token";
import { DomesticByPostcodeResponse } from "@/types/api/domestic-by-postcode-response";
import { schema } from "@/types/zod/schema-poslaju-quote";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postcodeFrom = searchParams.get("postcodeFrom");
    const postcodeTo = searchParams.get("postcodeTo");
    const weight = searchParams.get("weight");

    const parsedInput = schema.parse({
      postcodeFrom,
      postcodeTo,
      weight,
    });

    const token = await getToken({
      clientId: process.env.POSLAJU_DOMESTIC_BY_POSTCODE_CLIENT_ID!,
      clientSecret: process.env.POSLAJU_DOMESTIC_BY_POSTCODE_CLIENT_SECRET!,
      grantType: process.env.POSLAJU_DOMESTIC_BY_POSTCODE_GRANT_TYPE!,
      scope: process.env.POSLAJU_DOMESTIC_BY_POSTCODE_SCOPE!,
    });

    const url = new URL(
      "https://gateway-usc.pos.com.my/staging/as2corporate/poslaju-domestic-by-postcode/v1/TariffWebApi/api/DomesticPoslajubyPostcode"
    );
    url.searchParams.append("postcodeFrom", parsedInput.postcodeFrom);
    url.searchParams.append("postcodeTo", parsedInput.postcodeTo);
    url.searchParams.append("weight", parsedInput.weight.toString());

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const quotes = data.map((d: DomesticByPostcodeResponse) => {
      return {
        provider: "poslaju",
        courier: {
          url: "https://seller.tracking.my/img/courier/pos.jpg",
        },
        rate: d.totalAmount,
        promoRate: (+d.totalAmount * 0.8).toString(),
        serviceInfo: {
          pickup: true,
          requirePrint: true,
          serviceLevelAgreement: d.SLA,
          zone: d.zone,
        },
      };
    });

    return NextResponse.json(quotes, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: error.errors,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
