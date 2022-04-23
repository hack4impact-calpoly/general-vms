import 'reflect-metadata';
import { ContainerModule, interfaces } from 'inversify';
import { MockDatabase } from '../models/database/mock-db/mock-database';
import { ValidateReqAppendUser } from '../models/user-session/UserSession';
import ExampleUserSessionValidator from '../models/user-session/UserSessionProviders';
import { IUserDB } from '../models/user/UserDB';
import { IShiftDB } from '../shift/ShiftDB';
import { TYPES } from '../types';

const sessionModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ValidateReqAppendUser>(TYPES.UserSessionValidator).to(ExampleUserSessionValidator).inSingletonScope();
});

const databaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUserDB>(TYPES.UserDatabase).to(MockDatabase).inSingletonScope();

  // Bind all DB types to same Mock DB for now
  bind<IShiftDB>(TYPES.ShiftDatabase).toService(TYPES.UserDatabase);
});

const containerModules = [sessionModule, databaseModule];

export { containerModules };
