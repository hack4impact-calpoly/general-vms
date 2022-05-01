import { IFormMetadataView } from '@general-vms/shared';
import { useEffect, useState, useContext } from 'react';
import { Roles } from '../models/user/User';
import { UserContext } from '../models/user/UserStore';
import { FormGrid } from './form-grid/FormGrid';
import FormState from './FormState';
import './FormsViewer.scss';

interface IProps {
  forms: IFormMetadataView[];
}

export const FormsViewer = ({ forms }: IProps) => {
  const { user } = useContext(UserContext);
  const [formState, setFormState] = useState(new FormState(forms));

  const formGridAdminViewProps = {
    showOptionsMenu: user.role === Roles.ADMIN,
    showViewableStatus: user.role === Roles.ADMIN,
  };

  useEffect(() => {
    setFormState(new FormState(forms));
  }, [forms]);

  return (
    <div id='form-viewer'>
      {([
        { title: 'Upcoming Forms', forms: formState.upcoming },
        { title: 'Active Forms', forms: formState.active },
        { title: 'Past Forms', forms: formState.closed },
      ]).map((formGridProps, index) => {
        return <FormGrid key={`form-grid-${index}`} {...formGridProps} {...formGridAdminViewProps} />;
      })}
    </div>
  );
};
