"use server";
import { schema } from "@/types/zod/schema-poslaju-token";
import { actionClient } from "@/lib/safe-action";

export const postPosLajuToken = actionClient
  .schema(schema)
  .action(
    async ({ parsedInput: { clientId, clientSecret, grantType, scope } }) => {
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

      return await response.json();
    }
  );
