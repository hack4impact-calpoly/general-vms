const TYPES = {
  UserSessionValidator: Symbol.for('UserSessionValidator'),
  DatabaseImpls: Symbol.for('DatabaseImpls'),
  UserDatabase: Symbol.for('UserDatabase'),
  ShiftDatabase: Symbol.for('ShiftDatabase'),
  FormDatabase: Symbol.for('FormDatabase'),
};

interface IServiceSetup {
  setup?: () => void;
}

export { TYPES, IServiceSetup };
