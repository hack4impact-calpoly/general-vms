import app from '../../../src/server';
import request from 'supertest';
import { getShallowCopyWithoutProps } from 'test/test-utils';
import { IShift } from '../../../../shared/lib/src';
import { runValidationTest } from 'test/test-utils/validation';

const BASE_SHIFT = {
  start: new Date().getTime(),
  end: new Date().getTime(),
  maxVolunteers: 2,
  title: 'My Lovely Title',
  description: 'I have a description',
  eventAdmin: 'Adam Meza',
};

describe('Shift API', () => {
  describe('POST /api/new-shift', () => {
    const endpoint = '/api/new-shift';

    function baseSetup(shift: Partial<IShift> | object) {
      return {
        req: request(app).post(endpoint).send(shift),
      };
    }

    test('Successful shift created', async () => {
      const { req } = baseSetup(BASE_SHIFT);

      const { text } = await req.expect(201);

      expect(text).toBe('New shift successfully created');
    });

    test('Shift fails to create because there is no title', async () => {
      await runValidationTest({
        req: baseSetup(getShallowCopyWithoutProps(BASE_SHIFT, 'title')).req,
        expectedErrors: [
          { path: ['title'], message: 'Required' },
        ],
      });
    });

    test('Shift fails because start date is after end date', async () => {
      await runValidationTest({
        req: baseSetup({
          ...BASE_SHIFT,
          start: BASE_SHIFT.end + 2,
        }).req,
        expectedErrors: [
          { path: [], message: 'start date must come before end date' },
        ],
      });
    });

    test('Shift fails because max volunteers is 0', async () => {
      await runValidationTest({
        req: baseSetup({
          ...BASE_SHIFT,
          maxVolunteers: 0,
        }).req,
        expectedErrors: [
          {
            path: ['maxVolunteers'],
            message: 'Number must be greater than or equal to 1',
          },
        ],
      });
    });
  });

  describe('PUT /api/shift/:id', () => {
    function getBaseSetup(e: string) {
      return (shift: Partial<IShift> | object) => {
        return {
          req: request(app).put(e).send(shift),
        };
      };
    }

    test('Succcessful shift updated', async () => {
      const { req } = getBaseSetup('/api/shift/12')(BASE_SHIFT);

      const { text } = await req.expect(200);

      expect(text).toBe('Shift has been updated');
    });

    test('Shift fails because start date is after end date', async () => {
      await runValidationTest({
        req: getBaseSetup('/api/shift/12')({
          ...BASE_SHIFT,
          start: BASE_SHIFT.end + 2,
        }).req,
        expectedErrors: [
          { path: [], message: 'start date must come before end date' },
        ],
      });
    });

    test('Shift fails because max volunteers is 0', async () => {
      await runValidationTest({
        req: getBaseSetup('/api/shift/12')({
          ...BASE_SHIFT,
          maxVolunteers: 0,
        }).req,
        expectedErrors: [
          {
            path: ['maxVolunteers'],
            message: 'Number must be greater than or equal to 1',
          },
        ],
      });
    });

    test('Shift fails because id is invalid', async () => {
      await runValidationTest({
        req: getBaseSetup('/api/shift/-1')(BASE_SHIFT).req,
        expectedErrors: [
          {
            path: ['id'],
            message: 'Number must be greater than or equal to 0',
          },
        ],
      });
    });
  });
});
