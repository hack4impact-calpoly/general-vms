import { FormType, FormTiming } from '@general-vms/shared';
import { queryByText, render, screen } from '@testing-library/react';
import { FormsViewer } from 'src/forms/FormsViewer';
import { Roles } from 'src/models/user/User';
import { renderWithUser } from 'src/test-utils/user-utils';

const TEST_FORMS = [
  {
    formId: 'hello',
    formType: FormType.enum.WAIVER,
    published: new Date(),
    publisher: 'Ben Glossner',
    title: 'Bus Waiver',
    viewable: false,
    startDate: new Date(),
    endDate: new Date((new Date().getTime() + 10000)),
    timing: FormTiming.UPCOMING,
  },
  {
    formId: 'hello2',
    formType: FormType.enum.WAIVER,
    published: new Date(),
    publisher: 'Ben Glossner',
    title: 'Other Waiver',
    viewable: false,
    startDate: new Date(),
    endDate: new Date((new Date().getTime() + 10000)),
    timing: FormTiming.CLOSED,
    description: 'Hello there!',
  },
];

describe('FormsViewer component', () => {
  it('should show all upcoming, active, and closed titles', () => {
    render(<FormsViewer forms={[]} />);

    expect(screen.queryAllByText('Upcoming', { exact: false }).length).toBeGreaterThan(0);
    expect(screen.queryAllByText('Active', { exact: false }).length).toBeGreaterThan(0);
    expect(screen.queryAllByText('Past', { exact: false }).length).toBeGreaterThan(0);
  });

  it('should sort forms into the right categories', () => {
    render(<FormsViewer forms={TEST_FORMS} />);

    const upcomingDiv = screen.getByTestId('form-grid-upcoming-forms');
    const activeDiv = screen.getByTestId('form-grid-active-forms');
    const pastDiv = screen.getByTestId('form-grid-past-forms');

    expect(queryByText(upcomingDiv, 'Bus Waiver')).toBeTruthy();
    expect(queryByText(upcomingDiv, 'Other Waiver')).toBeFalsy();
    expect(queryByText(activeDiv, 'There are currently no', { exact: false })).toBeTruthy();
    expect(queryByText(pastDiv, 'Other Waiver')).toBeTruthy();
    expect(queryByText(pastDiv, 'Bus Waiver')).toBeFalsy();
  });

  it('should not show the additional options since user is not admin', () => {
    renderWithUser(<FormsViewer forms={[TEST_FORMS[0]]} />, {
      userProviderProps: { customUser: { role: Roles.VOLUNTEER } },
    });

    expect(screen.queryByTestId('MoreVertIcon')).toBeFalsy();
    expect(screen.queryByText('Hidden')).toBeFalsy();
  });

  it('should show the additional options since user is admin', () => {
    renderWithUser(<FormsViewer forms={[TEST_FORMS[0]]} />, {
      userProviderProps: { customUser: { role: Roles.ADMIN } },
    });

    expect(screen.queryByTestId('MoreVertIcon')).toBeTruthy();
    expect(screen.queryByText('Hidden')).toBeTruthy();
  });
});
