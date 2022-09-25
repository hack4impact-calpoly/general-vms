export function getShallowCopyWithoutProps<T>(obj: T, ...deletionProps: Array<keyof T>): T {
  const shallowCopy = { ...obj };

  deletionProps.forEach((prop) => {
    delete shallowCopy[prop];
  });

  return shallowCopy;
}

export function flushPromises() {
  return new Promise((resolve) => setImmediate(resolve));
}
