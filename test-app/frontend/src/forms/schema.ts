import { JSONSchema7 } from 'json-schema';

export const personalInfoSchema: JSONSchema7 = {
  title: 'Personal Information',
  description: 'Please provide volunteer personal information using the' +
    ' form below',
  type: 'object',
  required: [
    'firstName',
    'lastName',
  ],
  properties: {
    firstName: {
      type: 'string',
      title: 'First name',
    },
    lastName: {
      type: 'string',
      title: 'Last name',
    },
    telephone: {
      type: 'string',
      title: 'Telephone',
      minLength: 10,
    },
    vehicle: {
      type: 'string',
      title: 'Vehicle Type',
      enum: ['SUV', 'Sedan', 'Hatchback'],
    },
  },
};
