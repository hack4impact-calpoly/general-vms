import { IShift } from "@general-vms/shared";
import {
  DeleteResponse,
  GetResponse,
  SaveResponse,
  UpdateResponse,
} from "../models/database/database";
import { Model } from "../models/database/model";
import { IUser } from "../models/user/User";
import { TYPES } from "../types";

export interface IShiftDB {
  getShifts(): GetResponse<IShift[]>;
  getUserShifts(user: IUser): GetResponse<IShift[]>;
  saveShift(user: Partial<IUser>, shift: IShift): SaveResponse;
  updateShift(user: Partial<IUser>, shift: IShift): UpdateResponse<IShift>;
  deleteShift(shift: IShift): DeleteResponse;
}

export const ShiftModel: Model = {
  databaseId: TYPES.ShiftDatabase,
};
