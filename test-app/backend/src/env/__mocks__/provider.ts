import 'reflect-metadata';
import { Container } from 'inversify';
import { ValidateReqAppendUser } from '../../models/user-session/UserSession';
import { TYPES } from '../../types';
import SessionMock from './UserSessionValidator';

const container = new Container();

container.bind<ValidateReqAppendUser>(TYPES.UserSessionValidator).to(SessionMock).inSingletonScope();

export { container };
