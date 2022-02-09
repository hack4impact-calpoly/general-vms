export interface Shift {
  start: Date,
  end: Date,
  maxVolunteers: number,
  title: string,
  description?: string,
  eventAdmin: string,
  getShiftTime(): number
}
