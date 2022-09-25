import {
  DeleteResponse,
  GetResponse,
  SaveResponse,
  UpdateResponse,
} from "../models/database/database";
import { Model } from "../models/database/model";
import { IUser } from "../models/user/User";
import { TYPES } from "../types";
import { IFormMetadata, IFormMetadataView } from "@general-vms/shared";

export interface IFormDB {
  getForms(): GetResponse<IFormMetadataView[]>;
  getUserForms(user: IUser): GetResponse<IFormMetadataView[]>;
  saveNewForm(user: Partial<IUser>, form: IFormMetadata): SaveResponse;
  updateForm(user: Partial<IUser>, form: IFormMetadataView): UpdateResponse<IFormMetadataView>;
  deleteForm(form: Partial<IFormMetadataView>): DeleteResponse;
}

export const FormModel: Model = {
  databaseId: TYPES.FormDatabase,
};
