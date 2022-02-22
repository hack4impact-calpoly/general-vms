import app from '../../../src/server';
import request from 'supertest';

global.console.log = jest.fn();

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

const patchTitle = {
  title: 'My Lovely Title',
};

test('POST  /api/new-shift complete shift is successfuly created', async () => {
  await request(app)
    .post('/api/new-shift')
    .send(myShift)
    .expect(201)
    .then((response) => {
      expect(response.text).toBe('New shift successfully created');
    });
});

test('POST  /api/new-shift; shift fails to create becasue no title provided', async () => {
  await request(app)
    .post('/api/new-shift')
    .send(noTitleShift)
    .expect(400)
    .then((response) => {
      expect(response.text).toBe('Must include title');
    });
});

test('POST  /api/new-shift; shift fails to create becasue end date is before start date', async () => {
  await request(app)
    .post('/api/new-shift')
    .send(badDateShift)
    .expect(400)
    .then((response) => {
      expect(response.text).toBe('Start/End dates are required and Start date must come before end date');
    });
});

test('POST  /api/new-shift; shift fails because max volunteers is 0', async () => {
  await request(app)
    .post('/api/new-shift')
    .send(badVolShift)
    .expect(400)
    .then((response) => {
      expect(response.text).toBe('Max Volunteers is required and must be greater than 0');
    });
});

test('PATCH  /api/edit-shift/:id; shift is sent a new title and it is modified', async () => {
  await request(app)
    .patch('/api/edit-shift/12')
    .send(patchTitle)
    .expect(200)
    .then((response) => {
      expect(response.text).toBe('Shift has been updated');
    });
});
