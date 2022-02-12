import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { TYPES } from '../../types';
import { ADMIN_ROLES, VALID_ROLES } from '../user/User';
import { IGetUserAuthInfoRequest } from './types';
import { ValidateReqAppendUser } from './UserSession';
import { container } from '../../env/provider';
import { voidwrap } from '../../util/void-wrap';

class UserAuthenticationSystem {
  private _sessionValidator: ValidateReqAppendUser = container.get<ValidateReqAppendUser>(TYPES.UserSessionValidator);

  public isUserAuthenticated(req: Request, res: Response, next: NextFunction): Promise<void> {
    return this._sessionValidator.validateRequestAndAppendUserMiddleware(req, res, next);
  }

  public isUserApproved(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction): Promise<void> {
    return this.isUserAuthenticated(req, res, () => {
      const user = req.locals?.user;
      if (!user || !VALID_ROLES.has(user.role) || !user.approved || !user.decisionMade) {
        res.status(403).json({
          message: 'User is not approved',
        }); return;
      }

      next();
    });
  }

  public isUserAdmin(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction): Promise<void> {
    return this.isUserApproved(req, res, () => {
      if (!ADMIN_ROLES.has(req.locals.user.role)) {
        res.status(403).json({
          message: 'User is not admin',
        }); return;
      }

      next();
    });
  }
}

const authSystem = new UserAuthenticationSystem();

const promiseFns = {
  isUserAuthenticated: (req: Request, res: Response, next: NextFunction) => authSystem.isUserAuthenticated(req, res, next),
  isUserApproved: (req: Request, res: Response, next: NextFunction) => authSystem.isUserApproved(req, res, next),
  isUserAdmin: (req: Request, res: Response, next: NextFunction) => authSystem.isUserAdmin(req, res, next),
};

const voidFns = {
  checkUserAuthenticated: voidwrap(promiseFns.isUserAuthenticated),
  checkUserApproved: voidwrap(promiseFns.isUserApproved),
  checkUserAdmin: voidwrap(promiseFns.isUserAdmin),
};

export default {
  ...promiseFns,
  ...voidFns,
};
