import { Request } from 'express';
import { IUser } from '../user/User';

interface RequestLocals {
  user?: IUser;
}

export interface IGetUserAuthInfoRequest extends Request {
  locals?: RequestLocals;
}
