// This function takes another function and makes the function's return type void
// eslint-disable-next-line @typescript-eslint/ban-types
export const voidwrap = (func: Function) => {
  return (...args): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    func(...args);
  };
};
