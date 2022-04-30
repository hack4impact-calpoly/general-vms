import { FormType, FormTiming } from '@general-vms/shared';
import { render, screen } from '@testing-library/react';
import { FormGrid } from './FormGrid';

const TEST_FORMS = [
  {
    formId: 'hello',
    formType: FormType.WAIVER,
    published: new Date(),
    publisher: 'Ben Glossner',
    title: 'Bus Waiver',
    viewable: false,
    startDate: new Date(),
    endDate: new Date((new Date().getTime() + 10000)),
    timing: FormTiming.ACTIVE,
  },
  {
    formId: 'hello2',
    formType: FormType.WAIVER,
    published: new Date(),
    publisher: 'Ben Glossner',
    title: 'Waiver',
    viewable: false,
    startDate: new Date(),
    endDate: new Date((new Date().getTime() + 10000)),
    timing: FormTiming.ACTIVE,
    description: 'Hello there!',
  },
];

describe('FormGrid component', () => {
  it('should show all given forms', () => {
    render(<FormGrid title={'TEST TITLE'} forms={TEST_FORMS} showOptionsMenu={false} showViewableStatus={false} />);

    expect(screen.queryByText('TEST TITLE')).toBeTruthy();
    expect(screen.queryByTestId('hello')).toBeTruthy();
    expect(screen.queryByTestId('hello2')).toBeTruthy();

    expect(screen.queryByText('There are currently no test title')).toBeFalsy();
  });

  it('should show no forms message', () => {
    render(<FormGrid title={'Test Forms'} forms={TEST_FORMS} showOptionsMenu={false} showViewableStatus={false} />);

    expect(screen.queryByText('There are currently no test forms')).toBeTruthy();
  });
});
