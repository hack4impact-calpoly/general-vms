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

export const FormDataTransformer: DataTransformerModel<IFormMetadataView, FormMetadataViewOnSend> = {
  transform: (data) => {
    return {
      ...data,
      published: data.published.getTime(),
      startDate: data.startDate?.getTime(),
      endDate: data.endDate?.getTime(),
    };
  },
  undoTransform: (data) => {
    return {
      ...data,
      published: new Date(data.published),
      startDate: unTransformOptionalDate(data.startDate),
      endDate: unTransformOptionalDate(data.endDate),
    };
  },
};
