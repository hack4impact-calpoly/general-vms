import { mapObject } from "../util/common";
import type { SmallerMetadata } from "common";

export const meta = ({ auth }: SmallerMetadata): SmallerMetadata => ({
	auth: auth ?? true
});

const Meta: Record<string, Partial<SmallerMetadata>> = {
   "/Login": {auth: false},
   "/BeginAuth": {auth: false}
};

export const metadata = mapObject(Meta, value => meta(value));

