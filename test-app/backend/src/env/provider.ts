import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { IServiceSetup, TYPES } from 'src/types';

const env = process.env.NODE_ENV || 'development';

const container = new Container();
let containerModules: ContainerModule[];
switch (env) {
  // both are same right now.
  case 'production':
  case 'development':
  default:
    // eslint-disable-next-line
    containerModules = require('./inversify.config.dev').containerModules;
    break;
}

container.load(...containerModules);

const ALL_IDENTIFIERS = Object.values(TYPES);
const services: Set<IServiceSetup> = new Set();

ALL_IDENTIFIERS.forEach((identifier) => {
  container.onActivation(identifier, (_context: interfaces.Context, actualObj: IServiceSetup) => {
    if (!services.has(actualObj)) {
      services.add(actualObj);
      actualObj.setup?.();
    }

    return actualObj;
  });
});

export { container };
