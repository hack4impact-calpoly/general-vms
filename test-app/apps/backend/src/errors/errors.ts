import { Response } from "express";

export interface ErrorResponse {
  details: {
    message: string;
  };
  status: number;
}

export interface ISendErrorResponseOptions {
  e?: Error;
  message?: string;
  status: number;
}

export function sendErrorResponse(
  res: Response,
  { message, e, status }: ISendErrorResponseOptions,
): void {
  const errorResponse: ErrorResponse = {
    details: {
      message: message ?? e?.message,
    },
    status: status,
  };
  res.status(status).json(errorResponse);
}

const UNEXPECTED_ERROR_RESPONSE: ErrorResponse = {
  details: {
    message: "An unexpected error occurred",
  },
  status: 500,
};

export function sendUnexpectedError(res: Response): void {
  // inject logger and log
  res.status(UNEXPECTED_ERROR_RESPONSE.status).json(UNEXPECTED_ERROR_RESPONSE);
}
