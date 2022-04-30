import { DataTransformerModel } from '../model';
import { unTransformOptionalDate } from '../utils/date';

export enum FormType {
  WAIVER = 'WAIVER',
}

export enum FormTiming {
  ACTIVE, UPCOMING, CLOSED,
}

export interface IFormMetadata {
  title: string;
  description?: string;
  published: Date;
  publisher: string;
  viewable: boolean;
  timing: FormTiming;
  startDate?: Date;
  endDate?: Date;
  formType: FormType;
}

export interface IFormMetadataView extends IFormMetadata {
  formId: unknown;
}

export type FormMetadataViewOnSend = Omit<IFormMetadataView, 'published' | 'startDate' | 'endDate'> & {
  published: number,
  startDate?: number,
  endDate?: number,
};

export interface FormsBeforeSend {
  forms: IFormMetadataView[];
}

export interface FormsOnSend {
  forms: FormMetadataViewOnSend[];
}

export const FormDataTransformer: DataTransformerModel<FormsBeforeSend, FormsOnSend> = {
  transform: (data) => {
    return {
      forms: data.forms.map((f) => ({
        ...f,
        published: f.published.getTime(),
        startDate: f.startDate?.getTime(),
        endDate: f.endDate?.getTime(),
      })),
    };
  },
  undoTransform: (data) => {
    return {
      forms: data.forms.map((f) => ({
        ...f,
        published: new Date(f.published),
        startDate: unTransformOptionalDate(f.startDate),
        endDate: unTransformOptionalDate(f.endDate),
      })),
    };
  },
};
