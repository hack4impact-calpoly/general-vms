import 'reflect-metadata';
import { container } from '../../env/provider';
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

export default DatabaseInstance;
