import 'reflect-metadata';
import { ContainerModule, interfaces } from 'inversify';
import { MockDatabase } from '../models/database/mock-db/mock-database';
import { ValidateReqAppendUser } from '../models/user-session/UserSession';
import ExampleUserSessionValidator from '../models/user-session/UserSessionProviders';
import { IUserDB } from '../models/user/UserDB';
import { IShiftDB } from '../shift/ShiftDB';
import { TYPES } from '../types';
import { IFormDB } from 'src/forms/form-db';

const sessionModule = new ContainerModule((bind: interfaces.Bind) => {
  console.log('Binding session services...');

  bind<ValidateReqAppendUser>(TYPES.UserSessionValidator).to(ExampleUserSessionValidator).inSingletonScope();
});

const databaseModule = new ContainerModule((bind: interfaces.Bind) => {
  console.log('Binding DB services...');

  bind<IUserDB>(TYPES.UserDatabase).to(MockDatabase).inSingletonScope();

  // Bind all DB types to same Mock DB for now
  bind<IShiftDB>(TYPES.ShiftDatabase).toService(TYPES.UserDatabase);
  bind<IFormDB>(TYPES.FormDatabase).toService(TYPES.UserDatabase);
});

const containerModules = [sessionModule, databaseModule];

export { containerModules };
