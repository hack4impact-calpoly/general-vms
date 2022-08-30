import * as path from "path";

export const PATH_TO_CDK_ASSETS =
  process.env.PATH_TO_CDK_ASSETS || path.join(__dirname, "..", "..", "..", "cdk-assets");
