import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { decorate, injectable, unmanaged } from 'inversify';
import { IUser } from '../user/User';
import { IGetUserAuthInfoRequest } from './types';

interface IValidateReq {
  validateRequest: (req: Request, res: Response) => void;
}

interface IRequestSessionConverter {
  getUserFromRequest: (req: Request) => Promise<IUser>;
}

export type ValidatorMiddlewareResponse = void;

// We will be using declaration merging here, so it must be the same name
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ValidateReqAppendUser extends IRequestSessionConverter {}

export abstract class ValidateReqAppendUser implements IValidateReq {
  constructor(@unmanaged() setup?: () => void) {
    setup?.();
  }

  abstract getUserFromRequest(req: Request): Promise<IUser>;

  public validateRequest(req: Request, res: Response) {
    return this.validateRequestAndAppendUserMiddleware(req, res);
  }

  public async validateRequestAndAppendUserMiddleware(req: Request, res: Response, next?: NextFunction): Promise<void> {
    try {
      const user = await this.getUserFromRequest(req);

      (req as IGetUserAuthInfoRequest).locals = { user };

      next?.();
    } catch (e: unknown) {
      res.status(401).json({
        message: 'Request could not be validated',
      });
    }
  }
}

decorate(injectable(), ValidateReqAppendUser);
