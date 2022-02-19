import app from '../../../src/server';
import request from 'supertest';

const myShift = {
  start: new Date().getTime(),
  end: new Date().getTime(),
  maxVolunteers: 2,
  title: 'My Lovely Title',
  description: 'I have a description',
  eventAdmin: 'Adam Meza',
};

const noTitleShift = {
  start: new Date().getTime(),
  end: new Date().getTime(),
  maxVolunteers: 2,
  description: 'I have a description',
  eventAdmin: 'Adam Meza',
};

const badDateShift = {
  start: new Date().getTime() + 2,
  end: new Date().getTime(),
  maxVolunteers: 2,
  title: 'My Lovely Title',
  description: 'I have a description',
  eventAdmin: 'Adam Meza',
};

const badVolShift = {
  start: new Date().getTime(),
  end: new Date().getTime(),
  maxVolunteers: 0,
  title: 'My Lovely Title',
  description: 'I have a description',
  eventAdmin: 'Adam Meza',
};

test('POST  /api/new-shift', async () => {
  await request(app)
    .post('/api/new-shift')
    .send(myShift)
    .expect(201)
    .then((response) => {
      expect(response.text).toBe('New shift successfully created');
    });

  await request(app)
    .post('/api/new-shift')
    .send(noTitleShift)
    .expect(400)
    .then((response) => {
      expect(response.text).toBe('Must include title');
    });

  await request(app)
    .post('/api/new-shift')
    .send(badDateShift)
    .expect(400)
    .then((response) => {
      expect(response.text).toBe('Start/End dates are required and Start date must come before end date');
    });

  await request(app)
    .post('/api/new-shift')
    .send(badVolShift)
    .expect(400)
    .then((response) => {
      expect(response.text).toBe('Max Volunteers is required and must be greater than 0');
    });
});
