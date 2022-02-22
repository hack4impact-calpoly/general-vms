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
    };
    return myShift;
  }

  updateShift(id: string, mod: Partial<Shift>): Shift {
    console.log(id);
    console.log(mod);
    const myShift: Shift = {
      start: new Date(),
      end: new Date(),
      maxVolunteers: 2,
      title: 'My Lovely Title',
      description: 'I have a description',
      eventAdmin: 'Adam Meza',
    };
    return myShift;
  }
}

export default Database;
