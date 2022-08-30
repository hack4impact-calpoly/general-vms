import { IFormMetadataView, FormTiming } from "@general-vms/shared";

class FormState {
  upcoming: IFormMetadataView[];
  active: IFormMetadataView[];
  closed: IFormMetadataView[];

  constructor(forms: IFormMetadataView[]) {
    this.upcoming = forms.filter((f) => f.timing === FormTiming.UPCOMING);
    this.active = forms.filter((f) => f.timing === FormTiming.ACTIVE);
    this.closed = forms.filter((f) => f.timing === FormTiming.CLOSED);
  }
}

export default FormState;
