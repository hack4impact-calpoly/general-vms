const replacer = (_key: string, value: unknown) =>
  typeof value === "undefined" ? "VAL-UNDEFINED" : value;

const reviver = (_key: string, value: unknown) => (value === "VAL-UNDEFINED" ? undefined : value);

// Used to stringify an object and keep around "undefined"
export const objStringifier = (obj: object) => {
  return JSON.stringify(obj, replacer);
};

// Used to parse a string and that kept around "undefined"
export const objParser = <T>(obj: string) => {
  return JSON.parse(obj, reviver) as T;
};
