export interface shift {
    start: Date,
    end: Date,
    maxVolunteers: Number,
    title: String,
    description: String,
    eventAdmin: String,
    getShiftTime(): Number
}