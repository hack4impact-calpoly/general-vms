#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { StackProps } from 'aws-cdk-lib';
import { AmplifyStack } from '../lib/amplify-stack';
import { VMS_CONSTANTS } from '../lib/constants';

interface IStage {
  name: string;
  region: string;
  accountId: string;
  backendName: string;
}

const app = new cdk.App();

const stages: IStage[] = [
  {
    name: '',
    accountId: '633874248049',
    region: 'us-west-1',
    backendName: 'dev',
  },
];

// Needs to be fleshed out more later
stages.forEach((stage) => {
  const baseStageProps: StackProps = {
    env: {
      region: stage.region,
      account: stage.accountId,
    }
  };

  new AmplifyStack(app, `${VMS_CONSTANTS.generalName}-AmplifyStack`, {
    ...baseStageProps,
    name: VMS_CONSTANTS.generalName,
    repository: VMS_CONSTANTS.ghRepoUrl,
    tokenConfig: {
      secretName: 'general-vms-gh-pat',
      secretKey: 'general-vms-PAT',
    },
    pathToFrontendFromRoot: VMS_CONSTANTS.pathToFrontendFromRoot,
    useManualBuildSpec: true,
    branches: [
      {
        branchName: 'amplify-test',
        stage: 'PRODUCTION',
      }
    ],
    backendName: stage.backendName,
  });
});
