import { PoslajuTokenSchema } from "@/types/zod/schema-poslaju-token";
import { PoslajuToken } from "@/types/api/poslaju-token";

export async function getToken(
  params: PoslajuTokenSchema
): Promise<PoslajuToken> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/token`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error(`Failed to get token: ${response.statusText}`);
  }

  return response.json();
}
