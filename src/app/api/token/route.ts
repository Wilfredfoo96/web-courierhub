import { NextResponse } from "next/server";
import { PoslajuToken } from "@/types/api/poslaju-token";
import { schema } from "@/types/zod/schema-poslaju-token";
import { z } from "zod";
import { addSeconds, formatISO } from "date-fns";

const MAX_RETRIES = 3;
const RETRY_DELAY = 100; // 100ms

interface GetValidTokenProps {
  clientId: string;
  clientSecret: string;
  scope: string;
  grantType?: string;
  retryCount?: number;
}

async function getValidToken({
  clientId,
  clientSecret,
  scope,
  grantType = "client_credentials",
  retryCount = 0,
}: GetValidTokenProps): Promise<PoslajuToken> {
  try {
    const response = await fetch(
      "https://gateway-usc.pos.com.my/security/connect/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: grantType,
          scope,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Convert expires_in to expires_date using date-fns
    return {
      accessToken: data.access_token,
      // set expiresDate in 11 hours as suggested from PosLaju doc
      expiresDate: formatISO(addSeconds(new Date(), data.expires_in - 3600)),
    };
  } catch (error) {
    console.log("raw error: ", error);
    if (retryCount < MAX_RETRIES) {
      console.log(
        `Retrying to get token. Attempt ${retryCount + 1} of ${MAX_RETRIES}`
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return getValidToken({
        clientId,
        clientSecret,
        scope,
        grantType,
        retryCount: retryCount + 1,
      });
    } else {
      throw error;
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsedInput = schema.parse(body);

    // Get PosLaju token
    const data = await getValidToken({
      clientId: parsedInput.clientId,
      clientSecret: parsedInput.clientSecret,
      scope: parsedInput.scope,
      grantType: parsedInput.grantType,
    });

    return NextResponse.json(
      {
        accessToken: data.accessToken,
        expiresDate: data.expiresDate,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending parcel:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input", errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Failed to authenticate" },
      { status: 401 }
    );
  }
}
