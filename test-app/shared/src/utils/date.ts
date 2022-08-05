import { z } from 'zod';

export function unTransformOptionalDate(d?: number) {
  if (d) {
    return new Date(d);
  }

  return undefined;
}

type DU = Date | undefined;
type NU = number | undefined;

export const datePreprocessSchema = () => z.preprocess((arg) => {
  if (typeof arg === 'number' || typeof arg === 'string' || arg instanceof Date) return new Date(arg);
}, z.date());

const laterDateWithComparison = <T extends object>(
  zodValue: z.AnyZodObject,
  earlyDateProp: keyof T,
  laterDateProp: keyof T,
  comparator: (d1: NU, d2: NU) => boolean,
) =>
  zodValue.refine((data) =>
    comparator(
      ((data as T)[earlyDateProp] as unknown as DU)?.getTime(),
      ((data as T)[laterDateProp] as unknown as DU)?.getTime(),
    ),
  {
    message: 'start date must come before end date',
  });

export const laterDateStrict = <T extends object>(
  zodValue: z.AnyZodObject,
  earlyDateProp: keyof T,
  laterDateProp: keyof T,
) => laterDateWithComparison<T>(zodValue, earlyDateProp, laterDateProp,
  (d1, d2) => {
    if (!d1 || !d2) {
      return true;
    }

    return d1 < d2;
  });

export const laterDateAllowEqual = <T extends object>(
  zodValue: z.AnyZodObject,
  earlyDateProp: keyof T,
  laterDateProp: keyof T,
) => laterDateWithComparison<T>(zodValue, earlyDateProp, laterDateProp,
  (d1, d2) => {
    if (!d1 || !d2) {
      return true;
    }

    return d1 <= d2;
  });
