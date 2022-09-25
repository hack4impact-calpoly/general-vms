import { ResponseResolverFn } from "./HttpDataLoader";

export const jsonResolver = <T extends object>(r: Response): Promise<T> => {
  return r.json() as Promise<T>;
};

export const justResolveResolver = <T = unknown>(): Promise<T> => {
  return Promise.resolve() as unknown as Promise<T>;
};

export const stringResolver: ResponseResolverFn<string> = (r) => {
  return Promise.resolve(r.text());
};
