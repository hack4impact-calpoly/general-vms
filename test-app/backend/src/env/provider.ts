import 'reflect-metadata';
import { Container, ContainerModule } from 'inversify';

const env = process.env.NODE_ENV || 'development';

const container = new Container();
let containerModules: [ContainerModule];
switch (env) {
  // both are same right now.
  case 'development':
  default:
    // eslint-disable-next-line
    containerModules = require('./inversify.config.dev').containerModules;
    break;
}

container.load(...containerModules);

export { container };
