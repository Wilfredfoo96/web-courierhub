import { NextResponse } from "next/server";
import { PoslajuToken } from "@/types/api/poslaju-token";
import { schema } from "@/types/zod/schema-poslaju-token";
import { z } from "zod";
import { addSeconds, formatISO } from "date-fns";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

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

    const supabase = createClient(cookies());

    // Check for existing valid token in Supabase
    const { data: tokenData, error } = await supabase
      .from("oauth_tokens")
      .select("access_token, expires_date")
      .eq("client_id", parsedInput.clientId)
      .limit(1)
      .single();

    if (tokenData && !error) {
      const currentTime = new Date().getTime();
      const tokenExpirationTime = new Date(tokenData.expires_date).getTime();

      if (currentTime < tokenExpirationTime) {
        return NextResponse.json(
          {
            accessToken: tokenData.access_token,
            expiresDate: tokenData.expires_date,
          },
          { status: 200 }
        );
      }
    }

    // If no valid token found or token expired, get a new one
    const newTokenData = await getValidToken({
      clientId: parsedInput.clientId,
      clientSecret: parsedInput.clientSecret,
      scope: parsedInput.scope,
      grantType: parsedInput.grantType,
    });

    // Store the new token in Supabase
    await supabase
      .from("oauth_tokens")
      .update({
        access_token: newTokenData.accessToken,
        expires_date: newTokenData.expiresDate,
      })
      .eq("client_id", parsedInput.clientId);

    return NextResponse.json(newTokenData, { status: 200 });
  } catch (error) {
    console.error("Error getting token:", error);
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
