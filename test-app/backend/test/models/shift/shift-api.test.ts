import app from '../../../src/server';
import request from 'supertest';
import { z } from 'zod';
import { ErrorResponse } from 'src/errors';
import { getShallowCopyWithoutProps } from 'test/test-utils';

const BASE_SHIFT = {
  start: new Date().getTime(),
  end: new Date().getTime(),
  maxVolunteers: 2,
  title: 'My Lovely Title',
  description: 'I have a description',
  eventAdmin: 'Adam Meza',
};

type IValidationError = z.ZodIssue[];

type IExpectedInput = { shift: object };
type IBaseSetupFn = (s: IExpectedInput) => { req: request.Test };

interface IValidationProblem {
  path: string[];
  message: string;
}

describe('Shift API', () => {
  function runTest(
    shift: object,
    baseSetupFn: IBaseSetupFn,
    expectedStatus: number,
    after: (r: request.Response) => void,
  ) {
    const { req } = baseSetupFn({ shift });

    return req.expect(expectedStatus).then(after);
  }

  function runValidationTestError(
    shift: object,
    baseSetupFn: IBaseSetupFn,
    errorProblems: IValidationProblem[],
  ) {
    return runTest(shift, baseSetupFn, 400, ({ text }) => {
      const err = JSON.parse(text) as ErrorResponse;
      expect(err.details).not.toBeUndefined();
      expect(err.status).toBe(400);

      const issues = JSON.parse(err.details.message) as IValidationError;
      expect(issues.length).toBe(errorProblems.length);

      issues.forEach((iss, i) => {
        expect(iss.path).toEqual(errorProblems[i].path);
        expect(iss.message).toEqual(errorProblems[i].message);
      });
    });
  }

  describe('POST /api/new-shift', () => {
    const endpoint = '/api/new-shift';

    function baseSetup({ shift }: IExpectedInput) {
      return {
        req: request(app).post(endpoint).send(shift),
      };
    }

    function runTestNewShift(
      shift: object,
      expectedStatus: number,
      after: (r: request.Response) => void,
    ) {
      return runTest(shift, baseSetup, expectedStatus, after);
    }

    function runValidationTestErrorNewShift(
      shift: object,
      errorProblems: IValidationProblem[],
    ) {
      return runValidationTestError(shift, baseSetup, errorProblems);
    }

    test('Successful shift created', async () => {
      await runTestNewShift(BASE_SHIFT, 201, ({ text }) => {
        expect(text).toBe('New shift successfully created');
      });
    });

    test('Shift fails to create because there is no title', async () => {
      await runValidationTestErrorNewShift(getShallowCopyWithoutProps(BASE_SHIFT, 'title'), [
        { path: ['title'], message: 'Required' },
      ]);
    });

    test('Shift fails because start date is after end date', async () => {
      await runValidationTestErrorNewShift({
        ...BASE_SHIFT,
        start: BASE_SHIFT.end + 2,
      }, [
        { path: [], message: 'start date must come before end date' },
      ]);
    });

    test('Shift fails because max volunteers is 0', async () => {
      await runValidationTestErrorNewShift({
        ...BASE_SHIFT,
        maxVolunteers: 0,
      }, [
        {
          path: ['maxVolunteers'],
          message: 'Number must be greater than or equal to 1',
        },
      ]);
    });
  });

  describe('PUT /api/shift/:id', () => {
    function getBaseSetup(e: string) {
      return ({ shift }: IExpectedInput) => {
        return {
          req: request(app).put(e).send(shift),
        };
      };
    }

    test('Succcessful shift updated', async () => {
      await runTest(BASE_SHIFT, getBaseSetup('/api/shift/12'), 200, ({ text }) => {
        expect(text).toBe('Shift has been updated');
      });
    });

    test('Shift fails because start date is after end date', async () => {
      await runValidationTestError({
        ...BASE_SHIFT,
        start: BASE_SHIFT.end + 2,
      }, getBaseSetup('/api/shift/12'), [
        { path: [], message: 'start date must come before end date' },
      ]);
    });

    test('Shift fails because max volunteers is 0', async () => {
      await runValidationTestError({
        ...BASE_SHIFT,
        maxVolunteers: 0,
      }, getBaseSetup('/api/shift/12'), [
        {
          path: ['maxVolunteers'],
          message: 'Number must be greater than or equal to 1',
        },
      ]);
    });

    test('Shift fails because id is invalid', async () => {
      await runValidationTestError(BASE_SHIFT, getBaseSetup('/api/shift/-1'), [
        {
          path: ['id'],
          message: 'Number must be greater than or equal to 0',
        },
      ]);
    });
  });
});
