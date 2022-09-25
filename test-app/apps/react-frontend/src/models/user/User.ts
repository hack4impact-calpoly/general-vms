export type UserId = string | number | undefined;

export enum Roles {
  ADMIN = "admin",
  STAFF = "staff",
  VOLUNTEER = "volunteer",
}

export type Role = Roles | undefined;

export const ADMIN_ROLES = new Set([Roles.ADMIN]);
export const STAFF_ROLES = new Set([Roles.STAFF, Roles.ADMIN]);
export const ALL_ROLES = new Set([Roles.ADMIN, Roles.STAFF, Roles.VOLUNTEER]);

export interface User {
  name: string;
  email: string;
  userId: UserId;
  userLoggedIn: boolean;
  role: Role;
  userApproved: boolean;
  cognitoSession: object | undefined;
}

export const INITIAL_USER: User = Object.freeze({
  name: "",
  email: "",
  userId: undefined,
  userLoggedIn: false,
  role: undefined,
  userApproved: false,
  cognitoSession: undefined,
});

export const isUserAuthenticated = (user: User) => {
  return user?.userLoggedIn;
};
