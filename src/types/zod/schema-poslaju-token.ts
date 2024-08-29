import { z } from "zod";

export const schema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
  grantType: z.string(),
  scope: z.string(),
});
