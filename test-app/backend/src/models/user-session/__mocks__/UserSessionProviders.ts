import { NextFunction, Request, Response } from 'express';

export const validatorFnMock = jest.fn().mockImplementation((_req: Request, _res: Response, next: NextFunction) => {
  next();
});

const sessionMock = jest.fn().mockImplementation(() => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  UserSessionValidator: jest.fn().mockImplementation(() => ({
    validateRequestAndAppendUserMiddleware: validatorFnMock,
  }))(),
}));

export default sessionMock();
