import { runAmplifyCommand, setup, wrapAsyncCall } from './shared-amplify-config';

async function initAmplify() {
  // Initial newline
  console.log();

  const setupObj = {
    appId: 'AWS_AMPLIFY_VMS_APP_ID',
    envName: 'AWS_AMPLIFY_VMS_ENV_NAME',
    projectName: 'AWS_AMPLIFY_VMS_PROJECT_NAME',
  };

  await setup(setupObj);

  const appId = process.env.AWS_AMPLIFY_VMS_APP_ID;
  const projectName = process.env.AWS_AMPLIFY_VMS_PROJECT_NAME;
  const envName = process.env.AWS_AMPLIFY_VMS_ENV_NAME || 'dev';
  const profileName = process.env.AWS_AMPLIFY_VMS_PROFILE_NAME;
  const useProfileName = !!profileName || false;
  const region = process.env.AWS_AMPLIFY_VMS_REGION || 'us-west-1';

  if (!appId || !envName || !projectName) {
    throw new Error(`AppID, Environment Name, and projectName must be specified! Expected args: ${Object.keys(setupObj).toString()}`);
  }

  console.log('\nAttempting to init!\n');

  await runAmplifyCommand(
    'init',
    {
      useProfile: useProfileName,
      profileName,
      region,
      accessKeyId: process.env.AWS_AMPLIFY_VMS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_AMPLIFY_VMS_SECRET_ACCESS_KEY,
    },
    {
      appId,
      envName,
      projectName,
    },
    {
      frontend: 'javascript',
      framework: 'react',
      config: {
        SourceDir: 'frontend/src',
        DistributionDir: 'frontend/build',
        BuildCommand: 'npm run-script build',
        StartCommand: 'npm run-script start',
      },
    },
  );
}

wrapAsyncCall(initAmplify);
