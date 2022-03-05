import { NextFunction, Request, Response } from 'express';
import { IUser } from '../user/User';

interface IValidateReq {
  validateRequest: (req: Request, res: Response) => void;
}

interface IRequestSessionConverter {
  getUserFromRequest: (req: Request) => Promise<IUser>;
}

export type ValidatorMiddlewareResponse = Promise<Response | void | undefined>;

// We will be using declaration merging here, so it must be the same name
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ValidateReqAppendUser extends IRequestSessionConverter {}

export abstract class ValidateReqAppendUser implements IValidateReq {
  constructor(setup?: () => void) {
    setup?.();
  }

  abstract getUserFromRequest(req: Request): Promise<IUser>;

  public async validateRequest(req: Request, res: Response): Promise<void> {
    await this.validateRequestAndAppendUserMiddleware(req, res);
  }

  public async validateRequestAndAppendUserMiddleware(req: Request, res: Response, next?: NextFunction): ValidatorMiddlewareResponse {
    try {
      const user = await this.getUserFromRequest(req);

      req.locals = { user };

      next?.();
    } catch (e: unknown) {
      return res.status(401).json({
        message: 'Request could not be validated',
      });
    }
  }
}
