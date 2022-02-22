import { Shift } from '../../shift/shift-interface';

/* This abstract class is a placeholder for ""../../shift/shift-api" */

class Database {
  saveShift(newShift: Shift): void {
    console.log(newShift);
  }

  findShiftByID(id: string): Shift {
    console.log(id);
    const myShift: Shift = {
      start: new Date(),
      end: new Date(),
      maxVolunteers: 2,
      title: 'My Lovely Title',
      description: 'I have a description',
      eventAdmin: 'Adam Meza',
      getShiftTime: function (this: Shift): number {
        return this.end.getTime() - this.start.getTime();
      },
    };
    return myShift;
  }

  updateShift(id: string, mod: Partial<Shift>): Shift {
    console.log('updateShift');
    const myShift: Shift = {
      start: new Date(),
      end: new Date(),
      maxVolunteers: 2,
      title: 'My Lovely Title',
      description: 'I have a description',
      eventAdmin: 'Adam Meza',
      getShiftTime: function (this: Shift): number {
        return this.end.getTime() - this.start.getTime();
      },
    };
    if (mod.title) {
      myShift.title = mod.title;
    }
    if (mod.description) {
      myShift.description = mod.description;
    }
    if (mod.maxVolunteers) {
      myShift.maxVolunteers = mod.maxVolunteers;
    }
    if (mod.start) {
      myShift.start = mod.start;
    }
    if (mod.end) {
      myShift.end = mod.end;
    }
    return myShift;
  }
}

export default Database;
