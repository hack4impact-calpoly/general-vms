import { getMockReq, getMockRes } from "@jest-mock/express";
import { MockResponse } from "@jest-mock/express/src/response";
import { NextFunction, Response } from "express";
import { container } from "src/env/provider";
import { TYPES } from "src/types";
import { bodyValidate, paramValidate } from "src/validators/middleware";
import {
  IValidateAttrs,
  SchemaRequestInputValidator,
} from "src/validators/request-input-validator";
import { flushPromises } from "test/test-utils";

describe("Validation middleware", () => {
  function setup() {
    const validateMock = jest.fn();
    const validatorMock = <jest.Mock<SchemaRequestInputValidator>>jest
      .fn()
      .mockImplementation(() => ({
        validate: validateMock,
      }))();

    container.rebind(TYPES.RequestInputValidator).toConstantValue(validatorMock);

    const mockReq = getMockReq();
    const { res: mockRes, next } = getMockRes();

    return {
      validateMock,
      nextFnMock: next as jest.Mock<NextFunction>,
      validatorMock,
      flush: flushPromises,
      mockRes: mockRes as unknown as MockResponse,
      mockReq,
    };
  }

  describe("bodyValidate", () => {
    function bodySetup(attrs: IValidateAttrs) {
      const setupVals = setup();

      return {
        ...setupVals,
        middleware: bodyValidate(attrs),
      };
    }

    test("fails when given validator throws error", async () => {
      const { middleware, validateMock, nextFnMock, mockReq, mockRes, flush } = bodySetup({
        schema: null,
      });
      validateMock.mockRejectedValue(new Error());

      middleware(mockReq, mockRes as unknown as Response, nextFnMock);
      await flush();

      expect(validateMock.mock.calls.length).toBe(1);
      expect(mockRes.status.mock.calls.length).toBe(1);
      expect((mockRes.status.mock.calls[0] as number[])[0]).toBe(400);
      expect(nextFnMock.mock.calls.length).toBe(0);
    });

    test("succeeds and sets body when validator succeeds", async () => {
      const { middleware, validateMock, nextFnMock, mockReq, mockRes, flush } = bodySetup({
        schema: null,
      });
      validateMock.mockResolvedValue(10);

      middleware(mockReq, mockRes as unknown as Response, nextFnMock);
      await flush();

      expect(validateMock.mock.calls.length).toBe(1);
      expect(mockReq.body).toBe(10);
      expect(mockRes.status.mock.calls.length).toBe(0);
      expect(nextFnMock.mock.calls.length).toBe(1);
    });
  });

  describe("paramValidate", () => {
    function paramSetup(attrs: IValidateAttrs) {
      const setupVals = setup();

      return {
        ...setupVals,
        middleware: paramValidate(attrs),
      };
    }

    test("fails when given validator throws error", async () => {
      const { middleware, validateMock, nextFnMock, mockReq, mockRes, flush } = paramSetup({
        schema: null,
      });
      validateMock.mockRejectedValue(new Error());

      middleware(mockReq, mockRes as unknown as Response, nextFnMock);
      await flush();

      expect(validateMock.mock.calls.length).toBe(1);
      expect(mockRes.status.mock.calls.length).toBe(1);
      expect((mockRes.status.mock.calls[0] as number[])[0]).toBe(400);
      expect(nextFnMock.mock.calls.length).toBe(0);
    });

    test("succeeds and sets body when validator succeeds", async () => {
      const { middleware, validateMock, nextFnMock, mockReq, mockRes, flush } = paramSetup({
        schema: null,
      });
      validateMock.mockResolvedValue(10);

      middleware(mockReq, mockRes as unknown as Response, nextFnMock);
      await flush();

      expect(validateMock.mock.calls.length).toBe(1);
      expect(mockReq.params).toBe(10);
      expect(mockRes.status.mock.calls.length).toBe(0);
      expect(nextFnMock.mock.calls.length).toBe(1);
    });
  });
});
