export class ApiError extends Error {
  constructor(public title: string, public message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export function createApiError(title: string, message: string): ApiError {
  return new ApiError(title, message);
}

export function createInvalidInputError(errors: string[]): ApiError {
  return new ApiError("Invalid Input", errors.join(", "));
}

export function createUnexpectedError(message: string): ApiError {
  return new ApiError("Unexpected Error", message);
}

export function createUnknownError(): ApiError {
  return new ApiError("Unknown Error", "An unexpected error occurred");
}
