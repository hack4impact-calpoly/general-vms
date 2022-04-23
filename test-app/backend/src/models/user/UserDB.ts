import { TYPES } from '../../types';
import { DeleteResponse, GetResponse, SaveResponse, UpdateResponse } from '../database/database';
import { Model } from '../database/model';
import { IPersonalInfo, IUser } from './User';

export interface IUserDB {
  getUser(user: Partial<IUser>): GetResponse<IUser>;
  saveUser(user: IUser): SaveResponse;
  setApprovalStatus(user: Partial<IUser>, approved: boolean): UpdateResponse<Partial<IUser>>;
  updateUser(user: IUser): UpdateResponse<IUser>;
  deleteUser(user: Partial<IUser>, deletePersonalInfo?: boolean): DeleteResponse;
  getPersonalInfo(user: Partial<IUser>): GetResponse<IPersonalInfo>;
  setPersonalInfo(user: Partial<IUser>, personalInfo: IPersonalInfo): SaveResponse;
  updatePersonalInfo(user: Partial<IUser>, personalInfo: IPersonalInfo): UpdateResponse<IPersonalInfo>;
  deletePersonalInfo(user: Partial<IUser>): DeleteResponse;
}

export const UserModel: Model = {
  databaseId: TYPES.UserDatabase,
};
