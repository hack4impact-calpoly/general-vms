import 'reflect-metadata';
import { ContainerModule, injectable, interfaces } from 'inversify';
import { DatabaseImpls } from '../models/database/database-impls';
import { MockDatabase } from '../models/database/mock-db/mock-database';
import { ValidateReqAppendUser } from '../models/user-session/UserSession';
import ExampleUserSessionValidator from '../models/user-session/UserSessionProviders';
import { UserModel } from '../models/user/UserDB';
import { ShiftModel } from '../shift/ShiftDB';
import { TYPES } from '../types';

@injectable()
export class DevDatabaseImpls extends DatabaseImpls {
  static MockDatabase = new MockDatabase();

  constructor() {
    super([
      [UserModel, DevDatabaseImpls.MockDatabase],
      [ShiftModel, DevDatabaseImpls.MockDatabase],
    ]);
  }
}

const containerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ValidateReqAppendUser>(TYPES.UserSessionValidator).to(ExampleUserSessionValidator).inSingletonScope();
});

const databaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<DatabaseImpls>(TYPES.DatabaseImpls).to(DevDatabaseImpls).inSingletonScope();
});

const containerModules = [containerModule, databaseModule];

export { containerModules };
