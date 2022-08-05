import Form from '@rjsf/material-ui/v5';
import { JSONSchema7 } from 'json-schema';
import './Form.scss';

export interface CustomFormEvent {
  formData: {
    [FieldKey: string]: [ValueType: string | number | string[] | number []]
  }
}

interface IProps {
  schema: JSONSchema7,
  onSubmit: (event: CustomFormEvent) => void,
}

export const CustomForm = ({ schema, onSubmit }: IProps) => {
  return (
    <div className="container">
      <Form noHtml5Validate
        schema={schema}
        onSubmit={() => onSubmit}
      />
    </div>
  );
};
