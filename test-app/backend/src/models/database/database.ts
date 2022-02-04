import shift from '../../shift/shift-interface';

/* This abstract class is a placeholder for ""../../shift/shift-api" */

abstract class Database {
  static saveShift(newShift: { start: Date; end: Date; maxVolunteers: number; title: string; description: string; eventAdmin: string; }) {
    console.log(newShift);
    throw new Error('Method not implemented.');
  }

  abstract saveShift(newShift: shift): Promise<void>;
}

export default Database;
