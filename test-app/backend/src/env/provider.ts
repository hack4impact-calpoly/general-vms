import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ALL_IDENTIFIERS, IServiceSetup, IServiceSetupPromise } from 'src/types';

const env = process.env.NODE_ENV || 'development';

const container = new Container({ skipBaseClassChecks: true, autoBindInjectable: true });
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

const services: Set<IServiceSetup> = new Set();

const setupPromises: IServiceSetupPromise[] = [];

ALL_IDENTIFIERS.forEach((identifier) => {
  container.onActivation(identifier, (_context: interfaces.Context, actualObj: IServiceSetup) => {
    // We don't want to setup the same service. Note that we do this by object, NOT identifier
    if (!services.has(actualObj)) {
      services.add(actualObj);
      setupPromises.push({
        identifier,
        promise: actualObj.setup?.() ?? Promise.resolve(),
      });
    }

    return actualObj;
  });
});

export { container, setupPromises };
