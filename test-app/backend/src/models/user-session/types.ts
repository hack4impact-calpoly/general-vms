import { Request } from 'express';
import { IUser } from '../user/User';
import * as core from 'express-serve-static-core';

interface RequestLocals {
  user?: IUser;
}

export interface IGetUserAuthInfoRequest extends Request {
  locals?: RequestLocals;
}

export interface IAuthAndValidatedReq<B extends object, P = core.ParamsDictionary> extends IGetUserAuthInfoRequest {
  body: B;
  params: core.ParamsDictionary & P;
}
