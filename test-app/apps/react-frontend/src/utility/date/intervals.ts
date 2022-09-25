export enum DateDisplay {
  SLASHES_MMDDYYYY,
}

export function getSlashesMMDDYYY(d: Date): string {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });
}

export function evaluateDefinedDateWithDisplay(d: Date, displayType: DateDisplay): string {
  switch (displayType) {
    case DateDisplay.SLASHES_MMDDYYYY:
      return getSlashesMMDDYYY(d);
    default:
      return getSlashesMMDDYYY(d);
  }
}

export function evaluateDate(
  d: Date | undefined,
  displayType: DateDisplay,
  subString = "UNSET",
): string {
  let displayDate: string;

  if (d === undefined) {
    displayDate = subString;
  } else {
    displayDate = evaluateDefinedDateWithDisplay(d, displayType);
  }

  return displayDate;
}

export function getInterval(
  d1: Date | undefined,
  d2: Date | undefined,
  displayType = DateDisplay.SLASHES_MMDDYYYY,
): string {
  return `${evaluateDate(d1, displayType, "Present")} - ${evaluateDate(d2, displayType, "Future")}`;
}
