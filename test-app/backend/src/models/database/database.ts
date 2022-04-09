import { Shift } from '../../shift/shift-interface';

/* This class is a placeholder for ""../../shift/shift-api" */

class Database {
  saveShift(newShift: Shift): void {
    console.log(newShift);
  }

  updateShift(id: string, mod: Shift): Shift {
    console.log('updateShift');
    const myShift: Shift = {
      start: new Date(),
      end: new Date(),
      maxVolunteers: 2,
      title: 'This is an Original Title',
      description: 'A unchanged Description',
      eventAdmin: 'Joe Joe',
    };
    if (mod.title) {
      myShift.title = mod.title;
    }
    if (mod.description) {
      myShift.description = mod.description;
      console.log('Changed description to: ', mod.description);
    }
    if (mod.maxVolunteers) {
      myShift.maxVolunteers = mod.maxVolunteers;
    }
    if (mod.start) {
      myShift.start = new Date(mod.start);
    }
    if (mod.end) {
      myShift.end = new Date(mod.end);
    }
    return myShift;
  }
}

export default Database;
