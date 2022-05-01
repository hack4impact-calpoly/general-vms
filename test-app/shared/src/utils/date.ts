export function unTransformOptionalDate(d?: number) {
  if (d) {
    return new Date(d);
  }

  return undefined;
}
