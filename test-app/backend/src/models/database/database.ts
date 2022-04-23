import 'reflect-metadata';
import { container } from '../../env/provider';
import { TYPES } from '../../types';
import { DatabaseImpls } from './database-impls';
import { Model } from './model';

export type UpdateResponse<T> = Promise<T>;
export type DeleteResponse = void;
export type SaveResponse = void;
export type GetResponse<T> = Promise<T>;

export abstract class DatabaseInstance {}

// Use this function over getDBFromDatabaseImpls()
export function getDB<T>(model: Model): T {
  return container.get(model.databaseId);
}

/**
 * @deprecated in favor of getDB()
 */
export function getDBFromDatabaseImpls(model: Model) {
  return container.get<DatabaseImpls>(TYPES.DatabaseImpls).get(model.databaseId);
}

export default DatabaseInstance;
