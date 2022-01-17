const replacer = (_key: any, value: any) =>
  typeof value === 'undefined' ? 'VAL-UNDEFINED' : value;

const reviver = (_key: any, value: any) =>
  value === 'VAL-UNDEFINED' ? undefined : value;

  // Used to stringify an object and keep around "undefined"
export const objStringifier = (obj: object) => {
  return JSON.stringify(obj, replacer);
};

  // Used to parse a string and that kept around "undefined"
export const objParser = (obj: string) => {
  return JSON.parse(obj, reviver);
};