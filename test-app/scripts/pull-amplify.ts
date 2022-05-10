/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as fs from 'fs';
import * as path from 'path';
import { questionPromise, runAmplifyCommand, setup, wrapAsyncCall } from './shared-amplify-config';

const getProjectConfig = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let parsedProjectConfig: any = {};

  try {
    parsedProjectConfig = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '..', 'amplify', '.config', 'project-config.json'),
      ).toString(),
    );
  } catch (e) {}

  return {
    frontend: parsedProjectConfig.frontend || 'javascript',
    framework:
      parsedProjectConfig?.[parsedProjectConfig.frontend].framework ??
      'react',
    config: parsedProjectConfig?.[parsedProjectConfig.frontend].config || {
      SourceDir: 'frontend/src',
      DistributionDir: 'frontend/build',
      BuildCommand: 'npm run-script build',
      StartCommand: 'npm run-script start',
    },
  };
};

async function pullAmplify() {
  // Initial newline
  console.log();

  await setup();

  const teamProviderInfo: unknown = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '..', 'amplify', 'team-provider-info.json'),
    ).toString(),
  );

  let envName = process.env.AWS_AMPLIFY_VMS_ENV_NAME;

  if (!envName) {
    const backends = Object.keys(teamProviderInfo);

    if (backends.length > 1) {
      console.log(`Found multiple backends: ${backends.toString()}`);
      console.log(
        'Please enter the name of the backend you\'d like to use from those listed above.',
      );

      const backend = await questionPromise('Desired backend: ').catch(() => {
        throw new Error('No backend inputted!');
      });

      envName = teamProviderInfo[backend];

      if (!envName) {
        throw new Error(
          `Invalid backend given: ${backend}. Needs to be one of: ${backends.toString()}`,
        );
      }
    } else {
      envName = backends[0];
      console.log(`Found one backend: ${envName}`);
    }
  }

  const profileName = process.env.AWS_AMPLIFY_VMS_PROFILE_NAME;
  const useProfileName = !!profileName || false;
  const appId =
    process.env.AWS_AMPLIFY_VMS_APP_ID ||
    teamProviderInfo[envName].awscloudformation.AmplifyAppId;
  const region =
    process.env.AWS_AMPLIFY_VMS_REGION ||
    teamProviderInfo[envName].awscloudformation.Region ||
    'us-west-1';

  if (!appId || !envName) {
    throw new Error('AppID and Environment Name must be specified!');
  }

  console.log('\nAttempting to pull!\n');

  await runAmplifyCommand(
    'pull',
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
    },
    getProjectConfig(),
  );
}

wrapAsyncCall(pullAmplify);
