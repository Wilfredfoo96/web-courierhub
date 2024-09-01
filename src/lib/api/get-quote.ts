import { QuoteResponse } from "@/types/api/quote-response";
import {
  PoslajuGetQuoteSchema,
  schema,
} from "@/types/zod/schema-poslaju-quote";
import { ZodError } from "zod";
import {
  createInvalidInputError,
  createUnexpectedError,
  createUnknownError,
} from "@/lib/errors/api-errors";

// New generic API error class
export class ApiError extends Error {
  constructor(public title: string, public message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function getQuote(
  params: PoslajuGetQuoteSchema
): Promise<QuoteResponse[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/quote`;

    const queryParams = new URLSearchParams({
      postcodeFrom: params.postcodeFrom,
      postcodeTo: params.postcodeTo,
      weight: params.weight.toString(),
    });

    const response = await fetch(`${url}?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.message === "Invalid input" && data.errors) {
      throw new ZodError(data.errors);
    }

    return data;
  } catch (error) {
    if (error instanceof ZodError) {
      throw createInvalidInputError(error.errors.map((e) => e.message));
    }
    if (error instanceof Error) {
      throw createUnexpectedError(error.message);
    }
    throw createUnknownError();
  }
}
