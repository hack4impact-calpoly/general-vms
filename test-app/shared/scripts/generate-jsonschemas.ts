/**
 * @deprecated
 *
 * This is no longer in use
 */

import { resolve } from "path";

import * as TJS from "typescript-json-schema";

const PATH_TO_SHARED_ROOT = resolve(__dirname, "..");

const settings: TJS.PartialArgs = {
  required: true,
  tsNodeRegister: true,
  out: resolve(PATH_TO_SHARED_ROOT, "src", "generated", "schemas.json"),
  ignoreErrors: true,
  id: "general-vms-shared-schema",
  ref: true,
  aliasRef: true,
};

(async () => {
  await TJS.exec(resolve(PATH_TO_SHARED_ROOT, "src", "**", "*.ts"), "*", {
    ...TJS.getDefaultArgs(),
    ...settings,
  });
})()
  .then(() => null)
  .catch((e) => {
    throw e;
  });
