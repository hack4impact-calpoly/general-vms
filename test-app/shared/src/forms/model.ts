import { DataTransformerModel } from "../model";
import { unTransformOptionalDate } from "../utils/date";
import { z } from "zod";

export enum FormTiming {
  ACTIVE,
  UPCOMING,
  CLOSED,
}

export const FormType = z.enum(["WAIVER"]);

export const FormMetadata = z.object({
  title: z.string(),
  description: z.optional(z.string()),
  published: z.date(),
  publisher: z.string(),
  viewable: z.boolean(),
  timing: z.nativeEnum(FormTiming),
  startDate: z.optional(z.date()),
  endDate: z.optional(z.date()),
  formType: FormType,
});
export type IFormMetadata = z.infer<typeof FormMetadata>;

export const FormMetadataView = FormMetadata.extend({
  formId: z.unknown(),
});

export type IFormMetadataView = z.infer<typeof FormMetadataView>;

export type FormMetadataViewOnSend = Omit<
  IFormMetadataView,
  "published" | "startDate" | "endDate"
> & {
  published: number;
  startDate?: number;
  endDate?: number;
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
