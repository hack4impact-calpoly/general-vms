import * as path from "path";

export const PATH_TO_CDK_ASSETS =
  process.env.PATH_TO_CDK_ASSETS ||
  // __dirname = cdk -> apps -> dist
  path.join(__dirname, "..", "..", "cdk-assets");
