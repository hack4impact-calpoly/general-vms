interface shift {
  start: Date,
  end: Date,
  maxVolunteers: number,
  title: string,
  description: string,
  eventAdmin: string,
  getShiftTime(): number
}

export default shift;
