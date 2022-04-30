import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormCard } from './FormCard';
import { FormTiming, FormType, IFormMetadataView } from '@general-vms/shared';

const TEST_FORM: IFormMetadataView = {
  formId: 'hello',
  formType: FormType.WAIVER,
  published: new Date(),
  publisher: 'Ben Glossner',
  title: 'Waiver',
  viewable: false,
  startDate: new Date('4/20/2022'),
  endDate: new Date((new Date('4/20/2022').getTime() + 100000000)),
  timing: FormTiming.ACTIVE,
  description: 'Hello there!',
};

describe('FormCard component', () => {
  it('should show default view', () => {
    render(<FormCard form={TEST_FORM} showOptionsMenu={false} showViewableStatus={false} />);

    expect(screen.getByTestId('hello')).toBeTruthy();
    expect(screen.queryByTestId('MoreVertIcon')).toBeFalsy();
    expect(screen.getByText('Waiver', { exact: false })).toBeTruthy();
    expect(screen.queryByText('Hidden', { exact: false })).toBeFalsy();
    expect(screen.queryByText('04/20/2022 - 04/21/2022')).toBeTruthy();
  });

  it('should show option menu icon', () => {
    render(<FormCard form={TEST_FORM} showOptionsMenu={true} showViewableStatus={false} />);
    const optionsIcon = screen.queryByTestId('MoreVertIcon');
    expect(optionsIcon).toBeTruthy();
  });

  it('should show option menu items', async () => {
    render(<FormCard form={TEST_FORM} showOptionsMenu={true} showViewableStatus={false} />);

    const optionsIcon = screen.getByTestId('MoreVertIcon');

    fireEvent.click(optionsIcon);

    await waitFor(() => {
      expect(screen.queryByText('Edit')).toBeTruthy();
      expect(screen.queryByText('Remove')).toBeTruthy();
      expect(screen.queryByText('Enable')).toBeTruthy();
    });
  });

  it('should show "Disable" in options menu', async () => {
    render(<FormCard form={{ ...TEST_FORM, viewable: true }} showOptionsMenu={true} showViewableStatus={false} />);

    const optionsIcon = screen.getByTestId('MoreVertIcon');

    fireEvent.click(optionsIcon);

    await waitFor(() => {
      expect(screen.queryByText('Disable')).toBeTruthy();
    });
  });

  it('should show viewability status as "Hidden"', () => {
    render(<FormCard form={TEST_FORM} showOptionsMenu={false} showViewableStatus={true} />);

    expect(screen.queryByText('Hidden', { exact: false })).toBeTruthy();
  });

  it('should show viewability status as "Viewable"', () => {
    render(<FormCard form={{ ...TEST_FORM, viewable: true }} showOptionsMenu={false} showViewableStatus={true} />);

    expect(screen.queryByText('Viewable', { exact: false })).toBeTruthy();
  });
});
