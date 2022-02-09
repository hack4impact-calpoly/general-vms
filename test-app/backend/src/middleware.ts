import { NextFunction, Request, Response } from 'express';

/* This function is a placeholder for "shift/shift-api" */
const isUserAdmin = (_req: Request, _res: Response, _next: NextFunction): void => {
  _res.status(403).json({
    message: 'Start date must come before end date',
  });
  _next();
};

export default isUserAdmin;
