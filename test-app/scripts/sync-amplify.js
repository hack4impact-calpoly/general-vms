/**
 * This file is used to sync the amplify directory with the current deployed one
 */

const path = require("path");
const fs = require("fs");
const { promisify } = require('util');
const { exec: originalExec } = require('child_process');
const exec = promisify(originalExec);
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const DELIMITER = '|@|';

const exportAmplifyEnvIfExists = () => {
  try {
    const amplifyEnvFolder = fs.readFileSync(path.join(__dirname, '..', '.amplify.env'));
    const asString = amplifyEnvFolder.toString('utf-8');
    asString.split('\n').forEach((line) => {
      const [key, value] = line.split('=', 2);
      process.env[key] = value;
    })
  } catch (e) {}
};

const simpleCLIParser = (cliInput, possibleFlags) => {
  const options = {};
  const flagRegex = /--\w+/g;

  cliInput.match(flagRegex)?.forEach((flag) => {
    const noDash = flag.substring(2);
    if (!possibleFlags.includes(noDash)) {
      throw new Error(`Option ${noDash} is not supported. Supported flags: ${possibleFlags}`);
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

const questionPromise = (question) => {
  let keepalive = true;

  return new Promise((resolve, reject) => {
    rl.question(question, (value) => {
      keepalive = false;
      resolve(value);
    });

    rl.on('close', () => {
      if (keepalive) {
        reject();
      }
    });
  });
};

const getProjectConfig = () => {
  let parsedProjectConfig = {};

  try {
    parsedProjectConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'amplify', '.config', 'project-config.json')));
  } catch (e) {}

  return {
    frontend: parsedProjectConfig.frontend || "javascript",
    framework: parsedProjectConfig?.[parsedProjectConfig.frontend]['framework'] ?? "react",
    config: parsedProjectConfig?.[parsedProjectConfig.frontend]['config'] || {
      "SourceDir": "frontend/src",
      "DistributionDir": "frontend/build",
      "BuildCommand": "npm run-script build",
      "StartCommand": "npm run-script start",
    },
  };
};

const removeNullishDeep = (val) => {
  if (typeof val !== 'object') {
    return;
  }

  Object.keys(val).forEach((k) => {
    if (val[k]) {
      removeNullishDeep(val[k]);
    } else if (val[k] == null || val[k] === '') {
      delete val[k];
    }
  });
};

(async function () {
  try {
    // Initial newline
    console.log();

    exportAmplifyEnvIfExists();

    const OPTION_TO_ENV_MAPPING = {
      'accessKey': 'AWS_AMPLIFY_VMS_ACCESS_KEY_ID',
      'secretAccessKey': 'AWS_AMPLIFY_VMS_SECRET_ACCESS_KEY',
      'profileName': 'AWS_AMPLIFY_VMS_PROFILE_NAME',
    };

    const cliOptionsEvaluated = simpleCLIParser(process.argv.slice(2).join(DELIMITER), [
      'accessKey', 'secretAccessKey', 'profileName'
    ]);

    Object.keys(cliOptionsEvaluated).forEach((k) => {
      process.env[OPTION_TO_ENV_MAPPING[k]] = cliOptionsEvaluated[k];
    });

    try {
      const amplifyVersion = await (await exec('amplify -v')).stdout.trim();

      console.log(`Found Amplify CLI version: ${amplifyVersion}`);
    } catch (e) {
      console.log('Installing Amplify CLI globally');

      await (await exec('npm install -g @aws-amplify/cli'));

      console.log('Amplify CLI installed!');
    }

    console.log('\nAttempting to pull!\n');

    const teamProviderInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'amplify', 'team-provider-info.json')));

    let envName = process.env.AWS_AMPLIFY_VMS_ENV_NAME;

    if (!envName) {
      const backends = Object.keys(teamProviderInfo);

      if (backends.length > 1) {
        console.log(`Found multiple backends: ${backends}`);
        console.log('Please enter the name of the backend you\'d like to use from those listed above.');

        const backend = await questionPromise('Desired backend: ').catch(() => {
          throw new Error('No backend inputted!');
        });

        envName = teamProviderInfo[backend];

        if (!envName) {
          throw new Error(`Invalid backend given: ${backend}. Needs to be one of: ${backends}`)
        }
      } else {
        envName = backends[0];
        console.log(`Found one backend: ${envName}`);
      }
    }

    const profileName = process.env.AWS_AMPLIFY_VMS_PROFILE_NAME;
    const useProfileName = !!profileName || false;
    const appId = process.env.AWS_AMPLIFY_VMS_APP_ID || teamProviderInfo[envName]['awscloudformation']['AmplifyAppId'];
    const region = process.env.AWS_AMPLIFY_VMS_REGION || teamProviderInfo[envName]['awscloudformation']['Region'] || 'us-west-1';

    if (!appId || !envName) {
      throw new Error('AppID and Profile Name must be specified!');
    }

    const providers = {
      "awscloudformation":{
        "configLevel": "project",
        "useProfile": useProfileName,
        "profileName": profileName,
        "region": region,
        "accessKeyId": process.env.AWS_AMPLIFY_VMS_ACCESS_KEY_ID,
        "secretAccessKey": process.env.AWS_AMPLIFY_VMS_SECRET_ACCESS_KEY,
      },
    };

    removeNullishDeep(providers);

    const amplify = {
      "appId": appId,
      "envName": envName,
      "defaultEditor": "code",
    };

    removeNullishDeep(amplify);

    const pullCommand = `
      amplify pull \\
        --amplify '${JSON.stringify(amplify)}' \\
        --frontend '${JSON.stringify(getProjectConfig())}' \\
        --providers '${JSON.stringify(providers)}' \\
        --yes
    `;

    const child = originalExec(pullCommand);

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    process.stdin.pipe(child.stdin);

    child.on('exit', (code) => process.exit(code));
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
