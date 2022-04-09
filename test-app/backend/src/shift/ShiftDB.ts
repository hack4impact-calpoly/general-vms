import { DeleteResponse, GetResponse, SaveResponse, UpdateResponse } from '../models/database/database';
import { Model } from '../models/database/model';
import { IUser } from '../models/user/User';
import { Shift } from './shift-interface';

export interface IShiftDB {
  getShifts(): GetResponse<Shift[]>;
  getUserShifts(user: IUser): GetResponse<Shift[]>;
  saveShift(user: Partial<IUser>, shift: Shift): SaveResponse;
  updateShift(user: Partial<IUser>, shift: Shift): UpdateResponse<Shift>;
  deleteShift(shift: Shift): DeleteResponse;
}

export const ShiftModel: Model = {
  identifier: Symbol.for('Shift'),
};
