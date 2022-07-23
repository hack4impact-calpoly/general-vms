import Form from '@rjsf/material-ui';
import { JSONSchema7 } from 'json-schema';
import { useState } from 'react';
import './Form.scss';

interface IProps {
  schema: JSONSchema7,
  onSubmit: (formData: object) => void,
}

export const CustomForm = ({ schema, onSubmit }: IProps) => {
  const [formData, setFormData] = useState({});
  const onChange = (e: { formData: object; }) => {
    setFormData(e.formData);
  };
  return (
    <div className="container">
      <Form noHtml5Validate
        schema={schema}
        formData={formData}
        onChange={onChange}
        onSubmit={() => onSubmit(formData)}/>
    </div>
  );
};
