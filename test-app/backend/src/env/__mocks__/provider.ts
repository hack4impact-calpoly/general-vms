import 'reflect-metadata';
import { Container } from 'inversify';
import { ValidateReqAppendUser } from '../../models/user-session/UserSession';
import { TYPES } from '../../types';
import SessionMock from './UserSessionValidator';
import { IUserDB } from '../../models/user/UserDB';
import { IShiftDB } from '../../shift/ShiftDB';
import { MockDatabase } from '../../models/database/mock-db/mock-database';

const container = new Container();

container.bind<ValidateReqAppendUser>(TYPES.UserSessionValidator).to(SessionMock).inSingletonScope();
container.bind<IUserDB>(TYPES.UserDatabase).to(MockDatabase).inSingletonScope();
container.bind<IShiftDB>(TYPES.ShiftDatabase).toService(TYPES.UserDatabase);

export { container };
