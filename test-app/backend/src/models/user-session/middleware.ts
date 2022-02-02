import { NextFunction, Request, Response } from 'express';
import { ADMIN_ROLES, VALID_ROLES } from '../user/User';
import UserSessionProviders from './UserSessionProviders';

const UserSessionValidator = UserSessionProviders.UserSessionValidator;

export const isUserAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  return UserSessionValidator.validateRequestAndAppendUserMiddleware(req, res, next);
};

export const isUserApproved = async (req: Request, res: Response, next: NextFunction) => {
  return isUserAuthenticated(req, res, () => {
    const user = req.locals?.user;
    if (!user || !VALID_ROLES.has(user.role) || !user.approved || !user.decisionMade) {
      return res.status(403).json({
        message: 'User is not approved',
      });
    }

    next();
  });
};

export const isUserAdmin = async (req: Request, res: Response, next: NextFunction) => {
  return isUserApproved(req, res, () => {
    if (!ADMIN_ROLES.has(req.locals.user.role)) {
      return res.status(403).json({
        message: 'User is not admin',
      });
    }

    next();
  });
};
