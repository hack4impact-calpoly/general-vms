/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
// isUserAdmin should be omitted for testing
// import isUserAdmin from '../middleware';
import { Shift } from './shift-interface';
import express from 'express';
import { getDB } from '../models/database/database';
import { IShiftDB, ShiftModel } from './ShiftDB';
import { IUser } from '../models/user/User';

const router = express.Router();

const database = getDB<IShiftDB>(ShiftModel);

const shiftPreProcessor = (shift: Partial<Shift>) => {
  if (shift.start) {
    shift.start = new Date(shift.start);
  }
  if (shift.end) {
    shift.end = new Date(shift.end);
  }
  return shift as Shift;
};

router.post('/new-shift', async (req, res) => {
  console.log('POST: Creating Calendar Event...');

  const { start, end, maxVolunteers, title, description, eventAdmin } = req.body as Shift;

  if (!title) {
    res.status(400).send(
      'Must include title',
    );
    return;
  }

  if (!start || !end || start > end) {
    res.status(400).send(
      'Start/End dates are required and Start date must come before end date',
    );
    return;
  }

  if (!maxVolunteers || maxVolunteers <= 0) {
    res.status(400).send(
      'Max Volunteers is required and must be greater than 0',
    );
    return;
  }

  const newShift: Partial<Shift> = {
    start: start,
    end: end,
    maxVolunteers: maxVolunteers,
    title: title,
    description: description,
    eventAdmin: eventAdmin,
  };

  const newShiftProcessed = shiftPreProcessor(newShift);

  console.log(newShiftProcessed);

  database.saveShift({} as IUser, newShiftProcessed);

  return res.status(201).send(
    'New shift successfully created',
  );
});

router.put('/shift/:id', async (req, res) => {
  console.log('PATCH: Editting Calender Event...');
  const id = req.params.id;
  // request body should be checked for valid properties before cast
  const { start, end, maxVolunteers, title, description, eventAdmin } = req.body as Shift;

  if (!id || Number(id) < 0) {
    res.status(400).send(
      'Invalid ID',
    );
    return;
  }

  if (!title) {
    res.status(400).send(
      'Must include title',
    );
    return;
  }

  if (!start || !end || start > end) {
    res.status(400).send(
      'Start/End dates are required and Start date must come before end date',
    );
    return;
  }

  if (!maxVolunteers || maxVolunteers <= 0) {
    res.status(400).send(
      'Max Volunteers is required and must be greater than 0',
    );
    return;
  }

  const newShift: Partial<Shift> = {
    start: start,
    end: end,
    maxVolunteers: maxVolunteers,
    title: title,
    description: description,
    eventAdmin: eventAdmin,
  };
  const newShiftProcessed = shiftPreProcessor(newShift);
  console.log(database.updateShift({} as Partial<IUser>, newShiftProcessed));

  return res.status(200).send(
    'Shift has been updated',
  );
});

export default router;
