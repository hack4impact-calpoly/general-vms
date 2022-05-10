/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/**
 * This file is used to sync the amplify directory with the current deployed one
 */

import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { exec as originalExec } from 'child_process';
import * as readline from 'readline';

const exec = promisify(originalExec);

export interface IProvidersConfig {
  useProfile: boolean;
  region: string;
  profileName?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
}

export interface IAmplifyConfig {
  appId: string;
  envName: string;
  defaultEditor?: string;
}

export interface IFrontendConfig {
  frontend: string;
  framework: string;
  config: unknown;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const DELIMITER = '|@|';

const exportAmplifyEnvIfExists = () => {
  try {
    const amplifyEnvFolder = fs.readFileSync(
      path.join(__dirname, '..', '.amplify.env'),
    );
    const asString = amplifyEnvFolder.toString('utf-8');
    asString.split('\n').forEach((line) => {
      const [key, value] = line.split('=', 2);
      process.env[key] = value;
    });
  } catch (e) {}
};

const simpleCLIParser = (cliInput: string, possibleFlags: string[]): Record<string, string> => {
  const options: Record<string, string> = {};
  const flagRegex = /--\w+/g;

  cliInput.match(flagRegex)?.forEach((flag) => {
    const noDash: string = flag.substring(2);
    if (!possibleFlags.includes(noDash)) {
      throw new Error(
        `Option ${noDash} is not supported. Supported flags: ${possibleFlags.toString()}`,
      );
    }
  });

  possibleFlags.forEach((option) => {
    if (cliInput.includes(`--${option}`)) {
      let matchingInput = cliInput.split(`--${option}`)[1].split(DELIMITER)[1];
      if (matchingInput.includes(DELIMITER)) {
        matchingInput = matchingInput.split(DELIMITER)[0];
      }
      options[option] = matchingInput;
    }
  });

  return options;
};

export const questionPromise = (question: string): Promise<string> => {
  let keepalive = true;

  return new Promise((resolve, reject) => {
    rl.question(question, (value: string) => {
      keepalive = false;
      resolve(value);
    });

    rl.on('close', () => {
      if (keepalive) {
        reject(new Error('No answer was given'));
      }
    });
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeNullishDeep = (val: any): void => {
  if (typeof val !== 'object') {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Object.keys(val).forEach((k) => {
    if (val[k]) {
      removeNullishDeep(val[k]);
    } else if (val[k] == null || val[k] === '') {
      delete val[k];
    }
  });
};

export function runAmplifyCommand(
  command: string,
  providerConfig: IProvidersConfig,
  amplifyConfig: IAmplifyConfig,
  frontendConfig: IFrontendConfig,
) {
  const actualProviderConfig = {
    awscloudformation: {
      configLevel: 'project',
      useProfile: providerConfig.useProfile,
      profileName: providerConfig.profileName,
      region: providerConfig.region,
      accessKeyId: providerConfig.accessKeyId,
      secretAccessKey: providerConfig.secretAccessKey,
    },
  };

  if (!amplifyConfig.defaultEditor) {
    amplifyConfig.defaultEditor = 'code';
  }

  removeNullishDeep(actualProviderConfig);
  removeNullishDeep(amplifyConfig);
  removeNullishDeep(frontendConfig);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    try {
      const strCommand = `
        amplify ${command} \\
          --amplify '${JSON.stringify(amplifyConfig)}' \\
          --frontend '${JSON.stringify(frontendConfig)}' \\
          --providers '${JSON.stringify(actualProviderConfig)}' \\
          --yes
      `;

      const child = originalExec(strCommand);

      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
      process.stdin.pipe(child.stdin);

      child.on('exit', (code: number) => {
        resolve(code);
      });
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });
}

export async function runCommand(command: string, input?: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    try {
      const child = originalExec(command);

      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);

      if (input) {
        if (!input.endsWith('\n')) {
          child.stdin.write(input + '\n');
        } else {
          child.stdin.write(input);
        }

        child.stdin.end();
      } else {
        process.stdin.pipe(child.stdin);
      }

      child.on('exit', (code: number) => {
        resolve(code);
      });
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });
}

async function installAmplifyCLI() {
  try {
    const amplifyVersion: string = (await exec('amplify -v')).stdout.trim();

    console.log(`Found Amplify CLI version: ${amplifyVersion}`);
  } catch (e) {
    console.log('Installing Amplify CLI globally');

    await exec('npm install -g @aws-amplify/cli');

    console.log('Amplify CLI installed!');
  }
}

type IAdditionalEnvMappings = Record<string, string>;

export async function setup(additionalEnvMappings?: IAdditionalEnvMappings) {
  exportAmplifyEnvIfExists();

  await installAmplifyCLI();

  const OPTION_TO_ENV_MAPPING: Record<string, string> = {
    accessKey: 'AWS_AMPLIFY_VMS_ACCESS_KEY_ID',
    secretAccessKey: 'AWS_AMPLIFY_VMS_SECRET_ACCESS_KEY',
    profileName: 'AWS_AMPLIFY_VMS_PROFILE_NAME',
    ...additionalEnvMappings,
  };

  const cliOptionsEvaluated = simpleCLIParser(
    process.argv.slice(2).join(DELIMITER),
    ['accessKey', 'secretAccessKey', 'profileName', ...Object.keys(additionalEnvMappings || {})],
  );

  Object.entries(cliOptionsEvaluated).forEach(([k, v]) => {
    if (!(k in OPTION_TO_ENV_MAPPING)) {
      throw new Error(`Found CLI option ${k} but mapping does not exist in ${OPTION_TO_ENV_MAPPING.toString()}`);
    } else {
      process.env[OPTION_TO_ENV_MAPPING[k]] = v;
    }
  });
}

export function wrapAsyncCall(callback: () => Promise<void>) {
  try {
    callback().then(() => {
      process.exit(0);
    }).catch((e: Error) => {
      console.log(e);
      process.exit(1);
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

export function removeMultipleContiguousSpaces(str: string) {
  return str.split(' ').filter((x) => x.length > 0).join(' ');
}
