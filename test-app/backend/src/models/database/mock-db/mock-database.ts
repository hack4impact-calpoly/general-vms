/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import { injectable } from 'inversify';
import { Shift } from '../../../shift/shift-interface';
import { IShiftDB } from '../../../shift/ShiftDB';
import { IUser, IPersonalInfo } from '../../user/User';
import { IUserDB } from '../../user/UserDB';
import { GetResponse, UpdateResponse } from '../database';
import { IFormDB } from 'src/forms/form-db';
import { IFormMetadataView, IFormMetadata } from '@general-vms/shared';
import { IServiceSetup } from 'src/types';

@injectable()
export class MockDatabase implements IShiftDB, IUserDB, IFormDB, IServiceSetup {
  setup() {
    console.log('Setting up Mock DB!');
  }

  getForms(): GetResponse<IFormMetadataView[]> {
    throw new Error('Method not implemented.');
  }

  getUserForms(user: IUser): GetResponse<IFormMetadataView[]> {
    throw new Error('Method not implemented.');
  }

  saveNewForm(user: Partial<IUser>, form: IFormMetadata): void {
    throw new Error('Method not implemented.');
  }

  updateForm(user: Partial<IUser>, form: IFormMetadataView): UpdateResponse<IFormMetadataView> {
    throw new Error('Method not implemented.');
  }

  deleteForm(form: Partial<IFormMetadataView>): void {
    throw new Error('Method not implemented.');
  }

  setApprovalStatus(user: Partial<IUser>, approved: boolean): UpdateResponse<Partial<IUser>> {
    throw new Error('Method not implemented.');
  }

  updateUser(user: IUser): UpdateResponse<IUser> {
    throw new Error('Method not implemented.');
  }

  updatePersonalInfo(user: Partial<IUser>, personalInfo: IPersonalInfo): UpdateResponse<IPersonalInfo> {
    throw new Error('Method not implemented.');
  }

  getShifts(): GetResponse<Shift[]> {
    throw new Error('Method not implemented.');
  }

  getUserShifts(user: IUser): GetResponse<Shift[]> {
    throw new Error('Method not implemented.');
  }

  getUser(user: Partial<IUser>): GetResponse<IUser> {
    throw new Error('Method not implemented.');
  }

  getPersonalInfo(user: Partial<IUser>): GetResponse<IPersonalInfo> {
    throw new Error('Method not implemented.');
  }

  saveUser(user: IUser) {
    throw new Error('Method not implemented.');
  }

  deleteUser(user: IUser, deletePersonalInfo?: boolean) {
    throw new Error('Method not implemented.');
  }

  setPersonalInfo(user: IUser, personalInfo: IPersonalInfo) {
    throw new Error('Method not implemented.');
  }

  deletePersonalInfo(user: IUser) {
    throw new Error('Method not implemented.');
  }

  saveShift(user: IUser, shift: Shift) {
    console.log(shift);
  }

  deleteShift(shift: Shift) {
    throw new Error('Method not implemented.');
  }

  updateShift(id: Partial<IUser>, mod: Shift): UpdateResponse<Shift> {
    console.log(id);
    console.log(mod);
    const myShift: Shift = {
      start: new Date(),
      end: new Date(),
      maxVolunteers: 2,
      title: 'My Lovely Title',
      description: 'I have a description',
      eventAdmin: 'Adam Meza',
    };

    return Promise.resolve(myShift);
  }
}
