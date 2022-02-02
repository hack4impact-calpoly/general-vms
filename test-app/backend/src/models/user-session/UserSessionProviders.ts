import { Request } from 'express';
import { IUser } from '../user/User';
import { ValidateReqAppendUser } from './UserSession';

// This is just boilerplate BS for now. Will be changed later
class ExampleUserSessionValidator extends ValidateReqAppendUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getUserFromRequest(_req: Request): Promise<IUser> {
    return Promise.resolve({} as IUser);
  }
}

const validator = new ExampleUserSessionValidator();

export default {
  UserSessionValidator: validator,
};
