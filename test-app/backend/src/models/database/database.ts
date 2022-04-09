/* eslint-disable @typescript-eslint/no-unused-vars */
import { container } from '../../env/provider';
import { Shift } from '../../shift/shift-interface';
import { IShiftDB } from '../../shift/ShiftDB';
import { TYPES } from '../../types';
import { IUser, IPersonalInfo } from '../user/User';
import { IUserDB, UserModel } from '../user/UserDB';
import { DatabaseImpls } from './database-impls';
import { Model } from './model';

export type UpdateResponse<T> = Promise<T>;
export type DeleteResponse = void;
export type SaveResponse = void;
export type GetResponse<T> = Promise<T>;

export abstract class DatabaseInstance implements IShiftDB, IUserDB {
  updateShift(_user: Partial<IUser>, _shift: Shift): UpdateResponse<Shift> {
    throw new Error('Method not implemented.');
  }

  setApprovalStatus(_user: Partial<IUser>, _approved: boolean): UpdateResponse<Partial<IUser>> {
    throw new Error('Method not implemented.');
  }

  updateUser(_user: IUser): UpdateResponse<IUser> {
    throw new Error('Method not implemented.');
  }

  updatePersonalInfo(_user: Partial<IUser>, _personalInfo: IPersonalInfo): UpdateResponse<IPersonalInfo> {
    throw new Error('Method not implemented.');
  }

  getShifts(): GetResponse<Shift[]> {
    throw new Error('Method not implemented.');
  }

  getUserShifts(_user: IUser): GetResponse<Shift[]> {
    throw new Error('Method not implemented.');
  }

  getUser(_user: Partial<IUser>): GetResponse<IUser> {
    throw new Error('Method not implemented.');
  }

  getPersonalInfo(_user: Partial<IUser>): GetResponse<IPersonalInfo> {
    throw new Error('Method not implemented.');
  }

  saveShift(_user: IUser, _shift: Shift) {
    throw new Error('Method not implemented.');
  }

  deleteShift(_shift: Shift) {
    throw new Error('Method not implemented.');
  }

  saveUser(_user: IUser) {
    throw new Error('Method not implemented.');
  }

  deleteUser(_user: IUser, _deletePersonalInfo?: boolean) {
    throw new Error('Method not implemented.');
  }

  setPersonalInfo(_user: IUser, _personalInfo: IPersonalInfo) {
    throw new Error('Method not implemented.');
  }

  deletePersonalInfo(_user: IUser) {
    throw new Error('Method not implemented.');
  }
}

export function getDB(model: Model) {
  return container.get<DatabaseImpls>(TYPES.DatabaseImpls).get(model.identifier);
}

export default DatabaseInstance;
