/**
 * This is no longer necessary but may be helpful
 */
import 'reflect-metadata';
import { injectable, unmanaged } from 'inversify';
import DatabaseInstance from './database';
import { Model } from './model';

@injectable()
export class DatabaseImpls {
  databaseMapping: Map<symbol, DatabaseInstance> = new Map();

  constructor(@unmanaged() bindings?: [Model, DatabaseInstance][]) {
    bindings?.forEach(([model, db]) => {
      this.register(model, db);
    });
  }

  register(model: Model, dbInstance: DatabaseInstance): void {
    this.databaseMapping.set(model.databaseId, dbInstance);
  }

  remove(model: Model): void {
    this.databaseMapping.delete(model.databaseId);
  }

  get(databaseId: symbol): DatabaseInstance {
    return this.databaseMapping.get(databaseId);
  }
}
