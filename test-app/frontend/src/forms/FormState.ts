import { IFormMetadataView, FormTiming } from '@general-vms/shared';

class FormState {
  upcoming: IFormMetadataView[];
  active: IFormMetadataView[];
  closed: IFormMetadataView[];

  constructor(forms: IFormMetadataView[]) {
    this.upcoming = forms.filter(f => f.timing === FormTiming.UPCOMING);
    this.active = forms.filter(f => f.timing === FormTiming.ACTIVE);
    this.closed = forms.filter(f => f.timing === FormTiming.CLOSED);
  }
}

export enum FormFieldType {
  TEXT,
  NUMERIC,
  EMAIL,
  DATE,
  DATERANGE,
  MULTI
}

export interface IFormFieldMetadata {
  label: string,
  type: FormFieldType,
  required?: boolean,
  values?: string[]
}

export default FormState;
