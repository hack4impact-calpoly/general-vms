export type UserId = string | number | undefined;

export enum Roles {
  ADMIN = 'admin',
  STAFF = 'staff',
  VOLUNTEER = 'volunteer',
}

export type Role = Roles | undefined;

export const ADMIN_ROLES = new Set([Roles.ADMIN]);
export const STAFF_ROLES = new Set([Roles.ADMIN, Roles.STAFF]);
export const VALID_ROLES = new Set([Roles.ADMIN, Roles.VOLUNTEER, Roles.STAFF]);

export interface IPersonalInfo {
  carType?: string;
  firstname: string;
  lastname: string;
}

export interface IUser {
  personalInfo?: IPersonalInfo;
  email: string;
  userId: UserId;
  role: Role,
  approved: boolean;
  decisionMade: boolean;
  cognitoSession: object | undefined;
}
