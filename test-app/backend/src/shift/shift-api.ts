/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
// isUserAdmin should be omitted for testing
// import isUserAdmin from '../middleware';
import Database from '../models/database/database';
import { Shift } from './shift-interface';
import express from 'express';

const router = express.Router();

const database: Database = new Database();

const shiftPreProcessor = (shift: Partial<Shift>) => {
  shift.start = new Date(shift.start);
  shift.end = new Date(shift.end);
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
    getShiftTime: function (): number {
      return end.valueOf() - start.valueOf();
    },
  };

  const newShiftProcessed = shiftPreProcessor(newShift);

  console.log(newShiftProcessed);

  database.saveShift(newShiftProcessed);

  return res.status(201).send(
    'New shift successfully created',
  );
});

const errorCheckDates = (newShift: Partial<Shift>, origShift: Shift) => {
  if (newShift.start && newShift.end && newShift.start.getTime() > newShift.end.getTime()) {
    return false;
  } else if (newShift.start && newShift.start.getTime() > origShift.end.getTime()) {
    return false;
  } else if (origShift.start.getTime() > newShift.end.getTime()) {
    return false;
  } else {
    return true;
  }
};

router.patch('/edit-shift/:id', async (req, res) => {
  console.log('PATCH: Editting Calender Event...');
  const id = req.params.id;
  const newShiftParams = req.body as Partial<Shift>;
  const originalShift = database.findShiftByID(id);

  if (!newShiftParams) {
    res.status(400).send(
      'No new elements for shift',
    );
  }

  if (newShiftParams.maxVolunteers && newShiftParams.maxVolunteers <= 0) {
    res.status(400).send(
      'Max Volunteers is required and must be greater than 0',
    );
  }

  if ((newShiftParams.start || newShiftParams.end) && !errorCheckDates(newShiftParams, originalShift)) {
    res.status(400).send(
      'Start/End dates are required and Start date must come before end date',
    );
  }

  console.log(database.updateShift(id, newShiftParams));

  return res.status(200).send(
    'Shift has been updated',
  );
});

export default router;
