import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AmplifyStack } from '../lib/amplify-stack';

describe('AmplifyStack', () => {
  it('should create with default resources', () => {
    const app = new cdk.App();
    const amplifyStack = new AmplifyStack(app, 'TestAmplifyStack', {
      name: 'AmplifyTest',
      repository: 'some-repo-url',
      tokenConfig: {
        secretName: 'secret name',
        secretKey: 'secret key',
      },
      pathToFrontendFromRoot: 'frontend',
      branches: [
        {
          branchName: 'test-branch',
          stage: 'prod',
          environmentVariables: [{ name: 'test', value: 'test-value' }],
          prefix: '',
        },
      ],
      useManualBuildSpec: true,
      backendName: 'backend',
      domainName: 'custom-domain',
      backendApiDomain: 'backend-domain.com',
    });

    expect(Template.fromStack(amplifyStack)).toMatchSnapshot();
  });

  it('should create with default resources when build spec is false', () => {
    const app = new cdk.App();
    const amplifyStack = new AmplifyStack(app, 'TestAmplifyStack', {
      name: 'AmplifyTest',
      repository: 'some-repo-url',
      tokenConfig: {
        secretName: 'secret name',
        secretKey: 'secret key',
      },
      pathToFrontendFromRoot: 'frontend',
      branches: [
        {
          branchName: 'test-branch',
          stage: 'prod',
          environmentVariables: [{ name: 'test', value: 'test-value' }],
          prefix: '',
        },
      ],
      useManualBuildSpec: false,
      backendName: 'backend',
      domainName: 'custom-domain',
      backendApiDomain: 'backend-domain.com',
    });

    expect(Template.fromStack(amplifyStack)).toMatchSnapshot();
  });

  it('should create with default resources when no domain name is provided', () => {
    const app = new cdk.App();
    const amplifyStack = new AmplifyStack(app, 'TestAmplifyStack', {
      name: 'AmplifyTest',
      repository: 'some-repo-url',
      tokenConfig: {
        secretName: 'secret name',
        secretKey: 'secret key',
      },
      pathToFrontendFromRoot: 'frontend',
      branches: [
        {
          branchName: 'test-branch',
          stage: 'prod',
          environmentVariables: [{ name: 'test', value: 'test-value' }],
          prefix: '',
        },
      ],
      useManualBuildSpec: false,
      backendName: 'backend',
      backendApiDomain: 'backend-domain.com',
    });

    expect(Template.fromStack(amplifyStack)).toMatchSnapshot();
  });

  it('should create with default resources when no backend api domain name is given', () => {
    const app = new cdk.App();
    const amplifyStack = new AmplifyStack(app, 'TestAmplifyStack', {
      name: 'AmplifyTest',
      repository: 'some-repo-url',
      tokenConfig: {
        secretName: 'secret name',
        secretKey: 'secret key',
      },
      pathToFrontendFromRoot: 'frontend',
      branches: [
        {
          branchName: 'test-branch',
          stage: 'prod',
          environmentVariables: [{ name: 'test', value: 'test-value' }],
          prefix: '',
        },
      ],
      useManualBuildSpec: false,
      backendName: 'backend',
    });

    expect(Template.fromStack(amplifyStack)).toMatchSnapshot();
  });

  it('should create with default resources when multiple branches given', () => {
    const app = new cdk.App();
    const amplifyStack = new AmplifyStack(app, 'TestAmplifyStack', {
      name: 'AmplifyTest',
      repository: 'some-repo-url',
      tokenConfig: {
        secretName: 'secret name',
        secretKey: 'secret key',
      },
      pathToFrontendFromRoot: 'frontend',
      branches: [
        {
          branchName: 'test-branch',
          stage: 'prod',
          environmentVariables: [{ name: 'test', value: 'test-value' }],
          prefix: '',
        },
        {
          branchName: 'test-branch-2',
          stage: 'test',
          prefix: 'more',
        },
      ],
      useManualBuildSpec: false,
      backendName: 'backend',
    });

    expect(Template.fromStack(amplifyStack)).toMatchSnapshot();
  });
});
