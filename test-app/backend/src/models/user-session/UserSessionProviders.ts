import 'reflect-metadata';
import { Request } from 'express';
import { injectable } from 'inversify';
import { IUser } from '../user/User';
import { ValidateReqAppendUser } from './UserSession';

// This is just boilerplate BS for now. Will be changed later
@injectable()
class ExampleUserSessionValidator extends ValidateReqAppendUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getUserFromRequest(_req: Request): Promise<IUser> {
    return Promise.resolve({} as IUser);
  }
}

export default ExampleUserSessionValidator;
