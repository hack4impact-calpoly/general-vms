import { IUser } from './models/user/User';

interface RequestLocals {
  user?: IUser;
}

declare global {
  namespace Express {
    interface Request {
      locals?: RequestLocals;
    }
  }
}
