import { Response, NextFunction } from 'express';
import { sendErrorResponse, sendUnexpectedError } from 'src/errors';
import { container } from 'src/env/provider';
import { IGetUserAuthInfoRequest } from 'src/models/user-session/types';
import { TYPES } from 'src/types';
import { IValidateAttrs, SchemaRequestInputValidator } from './request-input-validator';
import { ignoreCatch } from 'src/util';

type AllowedRequestProps = 'body' | 'params';

function partialReqValidate<T>(reqProp: AllowedRequestProps, attrs: IValidateAttrs) {
  const validator = container.get<SchemaRequestInputValidator>(TYPES.RequestInputValidator);

  return (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction): void => {
    (async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction): Promise<void> => {
      try {
        const parsedValue = await validator.validate<T>(req[reqProp], attrs);
        req[reqProp] = parsedValue;
        next();
      } catch (e: unknown) {
        // Bad format
        if (e instanceof Error) {
          sendErrorResponse(res, { e, status: 400 });
        } else {
          // this should re-throw eventually
          sendUnexpectedError(res);
        }
      }
    })(req, res, next).catch(ignoreCatch());
  };
}

export function bodyValidate<T>(attrs: IValidateAttrs) {
  return partialReqValidate<T>('body', attrs);
}

export function paramValidate<T>(attrs: IValidateAttrs) {
  return partialReqValidate<T>('params', attrs);
}
