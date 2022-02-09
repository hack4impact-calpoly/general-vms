import app from '../server';
import isUserAdmin from '../middleware';
import Database from '../models/database/database';
import { Shift } from './shift-interface';

let database: Database;

app.post('/api/new-shift', isUserAdmin, async (req, res) => {
  console.log('POST: Creating Calendar Event...');

  const { start, end, maxVolunteers, title, description, eventAdmin } = req.body as Shift;

  if (!title) {
    return res.status(400).json({
      message: 'Must include title',
    });
  }

  if (!start || !end || start >= end) {
    return res.status(400).json({
      message: 'Start/End dates are required and Start date must come before end date',
    });
  }

  if (!maxVolunteers || maxVolunteers <= 0) {
    return res.status(400).json({
      message: 'Max Volunteers is required and must be greater than 0',
    });
  }

  const newShift: Shift = {
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
  // eslint-disable-next-line @typescript-eslint/await-thenable
  await database.saveShift(newShift);

  res.status(201).json({
    message: 'New shift successfully created',
  });
});
