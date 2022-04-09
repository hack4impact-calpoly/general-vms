/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable dot-notation */
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';
import { ValidateReqAppendUser } from '../../models/user-session/UserSession';

export const validatorFnMock = jest.fn().mockImplementation((_req: Request, _res: Response, next: NextFunction) => {
  next();
});

const getUserFromRequestMock = jest.fn().mockReturnValue({});

@injectable()
class SessionMock extends ValidateReqAppendUser {
  getUserFromRequest = getUserFromRequestMock;
  validateRequestAndAppendUserMiddleware = validatorFnMock;
}

export default SessionMock;
