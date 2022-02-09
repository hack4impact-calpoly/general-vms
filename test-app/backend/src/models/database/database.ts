import { Shift } from '../../shift/shift-interface';

/* This abstract class is a placeholder for ""../../shift/shift-api" */

abstract class Database {
  saveShift(newShift: Shift) {
    console.log(newShift);
    throw new Error('Method not implemented.');
  }
}

export default Database;
