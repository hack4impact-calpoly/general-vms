import { ErrorResponse } from "../../src/errors";
import * as supertest from "supertest";
import { z } from "zod";

export type IValidationError = z.ZodIssue[];

export interface IValidationProblem {
  path: string[];
  message: string;
}

export interface IValidationTestOptions {
  req: supertest.Test;
  expectedErrors?: IValidationProblem[];
}

export async function runValidationTest({ req, expectedErrors }: IValidationTestOptions) {
  const res = await req.expect(400);

  assertValidationErrors(res.text, expectedErrors);

  return {
    req,
    res,
  };
}

function assertValidationErrors(
  validationMessage: string,
  expectedErrors: IValidationProblem[],
): void {
  let err: ErrorResponse;

  if (validationMessage.length === 0 && expectedErrors.length > 0) {
    fail(new Error("No response text given but expected errors"));
  }

  try {
    err = JSON.parse(validationMessage) as ErrorResponse;
  } catch (e) {
    fail(new Error(`Could not parse ${validationMessage} into an 'ErrorResponse' object`));
  }

  expect(err.details).not.toBeUndefined();
  expect(err.status).toBe(400);

  const issues = JSON.parse(err.details.message) as IValidationError;
  expect(issues.length).toBe(expectedErrors.length);

  issues.forEach((iss, i) => {
    expect(iss.path).toEqual(expectedErrors[i].path);
    expect(iss.message).toEqual(expectedErrors[i].message);
  });
}
