import * as path from "path";

// test -> cdk -> apps -> test-app
process.env.PATH_TO_CDK_ASSETS = path.join(__dirname, "..", "..", "..", "dist", "cdk-assets");
