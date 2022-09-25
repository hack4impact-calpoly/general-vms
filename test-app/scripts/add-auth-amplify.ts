import {
  removeMultipleContiguousSpaces,
  runCommand,
  setup,
  wrapAsyncCall,
} from "./shared-amplify-config";

async function addAuthAmplify() {
  // Initial newline
  console.log("\nSetting up auth...\n");

  await setup({
    name: "AWS_AMPLIFY_VMS_APP_NAME",
  });

  let appName = process.env.AWS_AMPLIFY_VMS_APP_NAME;
  if (!appName) {
    throw new Error("You must specify --name <appName>");
  }

  appName = removeMultipleContiguousSpaces(appName);

  const hyphenatedAppName = appName.split(" ").join("-");
  const spacedAppName = hyphenatedAppName.split("-").join(" ");
  const pascalCaseName = hyphenatedAppName
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");

  const authObj = {
    version: 2,
    resourceName: `CognitoAuthConfig${pascalCaseName}`,
    serviceConfiguration: {
      serviceName: "Cognito",
      userPoolConfiguration: {
        signinMethod: "USERNAME",
        requiredSignupAttributes: ["EMAIL", "NAME"],
        passwordPolicy: {
          minimumLength: 8,
          additionalConstraints: ["REQUIRE_DIGIT", "REQUIRE_UPPERCASE", "REQUIRE_LOWERCASE"],
        },
        mfa: {
          mode: "OFF",
        },
        readAttributes: ["EMAIL", "NAME", "EMAIL_VERIFIED"],
        writeAttributes: ["EMAIL"],
        autoVerifiedAttributes: [
          {
            type: "EMAIL",
            verificationMessage: "Your verification code is {####}",
            verificationSubject: `Verification Code for ${spacedAppName}`,
          },
        ],
      },
      includeIdentityPool: true,
      identityPoolConfiguration: {
        unauthenticatedLogin: false,
      },
    },
  };

  await runCommand("amplify add auth --headless", JSON.stringify(authObj));
}

wrapAsyncCall(addAuthAmplify);
