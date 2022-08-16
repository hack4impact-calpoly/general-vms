import 'reflect-metadata';
import { ContainerModule, interfaces } from 'inversify';
import { MockDatabase } from '../models/database/mock-db/mock-database';
import ExampleUserSessionValidator from '../models/user-session/UserSessionProviders';
import { TYPES } from '../types';
import { ZodValidator } from 'src/validators/js/zod/zod';

const sessionModule = new ContainerModule((bind: interfaces.Bind) => {
  console.log('Binding session services...');

  bind(TYPES.UserSessionValidator).to(ExampleUserSessionValidator).inSingletonScope();
});

const schemaValidatorModule = new ContainerModule((bind: interfaces.Bind) => {
  console.log('Binding validator services...');

  bind(TYPES.RequestInputValidator).to(ZodValidator).inSingletonScope();
});

const databaseModule = new ContainerModule((bind: interfaces.Bind) => {
  console.log('Binding DB services...');

  bind(TYPES.UserDatabase).to(MockDatabase).inSingletonScope();

  // Bind all DB types to same Mock DB for now
  bind(TYPES.ShiftDatabase).toService(TYPES.UserDatabase);
  bind(TYPES.FormDatabase).toService(TYPES.UserDatabase);
});

const containerModules = [sessionModule, databaseModule, schemaValidatorModule];

export { containerModules };
