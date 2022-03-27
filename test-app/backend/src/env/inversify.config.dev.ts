import { ContainerModule, interfaces } from 'inversify';
import { ValidateReqAppendUser } from '../models/user-session/UserSession';
import ExampleUserSessionValidator from '../models/user-session/UserSessionProviders';
import { TYPES } from '../types';

const containerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ValidateReqAppendUser>(TYPES.UserSessionValidator).to(ExampleUserSessionValidator).inSingletonScope();
});

const containerModules = [containerModule];

export { containerModules };
