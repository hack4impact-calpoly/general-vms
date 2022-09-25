export const TYPES = {
  UserSessionValidator: Symbol.for("UserSessionValidator"),
  UserDatabase: Symbol.for("UserDatabase"),
  ShiftDatabase: Symbol.for("ShiftDatabase"),
  FormDatabase: Symbol.for("FormDatabase"),
  RequestInputValidator: Symbol.for("RequestInputValidator"),
};

export const ALL_IDENTIFIERS = Object.values(TYPES);

export type SetupReturn = void;

export interface IServiceSetupPromise {
  identifier: symbol;
  promise: Promise<SetupReturn>;
}

export interface IServiceSetup {
  setup?: () => Promise<SetupReturn>;
}
