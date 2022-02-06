export type UserId = string | number | undefined;

export enum Roles {
  ADMIN = 'admin',
  STAFF = 'staff',
  VOLUNTEER = 'volunteer',
}

export type Role = Roles | undefined;

export const STAFF_ROLES = new Set([Roles.ADMIN, Roles.STAFF]);
export const VALID_ROLES = new Set([Roles.ADMIN, Roles.VOLUNTEER, Roles.STAFF]);

export interface IUser {
  name: string;
  email: string;
  userId: UserId;
  userLoggedIn: boolean;
  role: Role,
  userApproved: boolean;
  cognitoSession: object | undefined;
}