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

const patchTitle = {
  title: 'My EDITED title it is lovely',
};

const patchDescription = {
  description: 'My description has been EDITED!',
};

const patchBadDate = {
  start: new Date().getTime() + 100,
};

const patchGoodDates = {
  start: new Date().getTime(),
  end: new Date().getTime() + 100,
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

test('PATCH  /api/edit-shift/:id; shift is sent a new title and it is modified (verified with postman)', async () => {
  await request(app)
    .patch('/api/edit-shift/12')
    .send(patchTitle)
    .expect(200)
    .then((response) => {
      expect(response.text).toBe('Shift has been updated');
    });
});

test('PATCH  /api/edit-shift/:id; shift is sent a new description and it is modified (verified with postman)', async () => {
  await request(app)
    .patch('/api/edit-shift/12')
    .send(patchDescription)
    .expect(200)
    .then((response) => {
      expect(response.text).toBe('Shift has been updated');
    });
});

test('PATCH  /api/edit-shift/:id; shift fails to be modified because start date is after end date', async () => {
  await request(app)
    .patch('/api/edit-shift/12')
    .send(patchBadDate)
    .expect(400)
    .then((response) => {
      expect(response.text).toBe('Start/End dates are required and Start date must come before end date');
    });
});

test('PATCH  /api/edit-shift/:id; Shift is successfully modified because 2 good dates are sent', async () => {
  await request(app)
    .patch('/api/edit-shift/12')
    .send(patchGoodDates)
    .expect(200)
    .then((response) => {
      expect(response.text).toBe('Shift has been updated');
    });
});
