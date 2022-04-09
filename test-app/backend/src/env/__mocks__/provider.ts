import 'reflect-metadata';
import { Container } from 'inversify';
import { ValidateReqAppendUser } from '../../models/user-session/UserSession';
import { TYPES } from '../../types';
import SessionMock from './UserSessionValidator';
import { DatabaseImpls } from '../../models/database/database-impls';
import { DevDatabaseImpls } from '../inversify.config.dev';

const container = new Container();

container.bind<ValidateReqAppendUser>(TYPES.UserSessionValidator).to(SessionMock).inSingletonScope();
container.bind<DatabaseImpls>(TYPES.DatabaseImpls).to(DevDatabaseImpls).inSingletonScope();

export { container };
