"use server";
import { schema } from "@/types/zod/schema-poslaju-token";
import { actionClient } from "@/lib/safe-action";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { PoslajuToken } from "@/types/api/poslaju-token";

export const postPosLajuToken = actionClient
  .schema(schema)
  .action(
    async ({ parsedInput: { clientId, clientSecret, grantType, scope } }) => {
      const supabase = createClient(cookies());

      // Check for existing valid token in Supabase for the specific clientId
      const { data: tokenData, error } = await supabase
        .from("oauth_tokens")
        .select("access_token, expires_date")
        .eq("client_id", clientId)
        .limit(1)
        .single();

      if (tokenData && !error) {
        type TokenDataType = {
          access_token: string;
          expires_date: Date;
        };

        const data: TokenDataType = tokenData;

        const currentTime = new Date().getTime();

        const tokenExpirationTime = new Date(data.expires_date).getTime();

        if (currentTime < tokenExpirationTime) {
          return {
            accessToken: tokenData.access_token,
          };
        }
      }

      // If no valid token found, proceed with the existing code to fetch a new token
      const response = await fetch(`${process.env.API_BASE_URL}/api/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId,
          clientSecret,
          grantType,
          scope,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to get token: ${response.statusText}`);
      }

      const newTokenData: PoslajuToken = await response.json();

      // Store the new token in Supabase
      await supabase
        .from("oauth_tokens")
        .update({
          access_token: newTokenData.accessToken,
          expires_date: newTokenData.expiresDate,
        })
        .match({ client_id: "667e4fbaff8384000e89765f" });

      return {
        accessToken: newTokenData.accessToken,
      };
    }
  );
