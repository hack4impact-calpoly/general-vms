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

test('POST  /api/new-shift; Succcessful shift created', async () => {
  await request(app)
    .post('/api/new-shift')
    .send(myShift)
    .expect(201)
    .then((response) => {
      expect(response.text).toBe('New shift successfully created');
    });
});

test('POST  /api/new-shift; Shift fails to create because there is no title', async () => {
  await request(app)
    .post('/api/new-shift')
    .send(noTitleShift)
    .expect(400)
    .then((response) => {
      expect(response.text).toBe('Must include title');
    });
});

test('POST  /api/new-shift; Shift fails because start date is after end date', async () => {
  await request(app)
    .post('/api/new-shift')
    .send(badDateShift)
    .expect(400)
    .then((response) => {
      expect(response.text).toBe('Start/End dates are required and Start date must come before end date');
    });
});

test('POST  /api/new-shift; Shift fails because max volunteers is 0', async () => {
  await request(app)
    .post('/api/new-shift')
    .send(badVolShift)
    .expect(400)
    .then((response) => {
      expect(response.text).toBe('Max Volunteers is required and must be greater than 0');
    });
});

test('PUT  /api/shift/12; Succcessful shift updated', async () => {
  await request(app)
    .put('/api/shift/12')
    .send(myShift)
    .expect(200)
    .then((response) => {
      expect(response.text).toBe('Shift has been updated');
    });
});

test('PUT  /api/shift/12; Shift fails to update because there is no title', async () => {
  await request(app)
    .put('/api/shift/12')
    .send(noTitleShift)
    .expect(400)
    .then((response) => {
      expect(response.text).toBe('Must include title');
    });
});

test('PUT  /api/shift/13; Shift fails because start date is after end date', async () => {
  await request(app)
    .put('/api/shift/13')
    .send(badDateShift)
    .expect(400)
    .then((response) => {
      expect(response.text).toBe('Start/End dates are required and Start date must come before end date');
    });
});

test('PUT  /api/shift/39; Shift fails because max volunteers is 0', async () => {
  await request(app)
    .put('/api/shift/39')
    .send(badVolShift)
    .expect(400)
    .then((response) => {
      expect(response.text).toBe('Max Volunteers is required and must be greater than 0');
    });
});

test('PUT  /api/shift/-1; Shift fails because id is invalid', async () => {
  await request(app)
    .put('/api/shift/-1')
    .send(myShift)
    .expect(400)
    .then((response) => {
      expect(response.text).toBe('Invalid ID');
    });
});
