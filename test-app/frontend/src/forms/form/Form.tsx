import {
  FormControl,
  FormControlLabel, FormLabel, Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import { FormFieldType, IFormFieldMetadata } from 'src/forms/FormState';
import './Form.scss';

interface IProps {
  fields: IFormFieldMetadata[],
  title: string,
}

export const Form = ({ fields, title }: IProps) => {
  return (
    <div className="container">
      <h2>{title}</h2>
      <div className="fields">
        {(fields).map((field, idx) => {
          return (
            <>
              {field.type === FormFieldType.TEXT &&
              <FormControl key={idx} className="field">
                <TextField id="standard-basic" label={field.label} variant="standard" />
              </FormControl>}
              {field.type === FormFieldType.MULTI &&
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">{field.label}</FormLabel>
                <RadioGroup
                  name="radio-buttons-group"
                >
                  {field.values?.map((value, idx) => {
                    return <FormControlLabel key={idx} value={value} control={<Radio />} label={value} />;
                  })}
                </RadioGroup>
              </FormControl>}
            </>
          );
        })}
      </div>
    </div>
  );
};
