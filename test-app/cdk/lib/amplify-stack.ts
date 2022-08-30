import {
  aws_amplify as amplify,
  aws_iam as iam,
  StackProps,
  Stack,
  aws_codebuild as codebuild,
  SecretValue,
  CfnOutput,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export interface IBranchConfig
  extends Omit<amplify.CfnBranchProps, "appId" | "stage" | "environmentVariables"> {
  branchName: string;
  stage: string;
  environmentVariables?: Array<amplify.CfnBranch.EnvironmentVariableProperty>;
  prefix: string;
}

export interface IGitHubAccessTokenConfig {
  secretName: string;
  secretKey: string;
}

const BASE_CUSTOM_RULES: amplify.CfnApp.CustomRuleProperty[] = [
  {
    source: String.raw`</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>`,
    target: "/index.html",
    status: "200",
  },
];

function generateBuildSpec(pathToFrontendFromRoot: string): string {
  const buildSpecObj = {
    version: "1.0",
    applications: [
      {
        appRoot: pathToFrontendFromRoot,
        backend: {
          phases: {
            build: {
              commands: [
                "# Execute Amplify CLI with the helper script",
                'echo "Amplify PUSH"',
                "amplifyPush --simple",
              ],
            },
          },
        },
        frontend: {
          phases: {
            preBuild: {
              commands: [
                "npm ci --ignore-scripts --prefix=../",
                "npm ci --ignore-scripts --prefix=../shared",
                "npm run build --prefix=../shared",
                "npm ci --ignore-scripts",
              ],
            },
            build: {
              commands: ["npm run build"],
            },
          },
          artifacts: {
            baseDirectory: "build",
            files: ["**/*"],
          },
          cache: {
            paths: ["node_modules/**/*"],
          },
        },
      },
    ],
  };

  return codebuild.BuildSpec.fromObjectToYaml(buildSpecObj).toBuildSpec();
}

export interface IAmplifyStackProps extends StackProps {
  /**
   * Name for the app
   */
  name: string;
  /**
   * Full URL to GitHub repository
   */
  repository: string;
  /**
   * Token to connect to GH (A Personal Access Token [PAT])
   */
  tokenConfig: IGitHubAccessTokenConfig;
  /**
   * Path to frontend directory (starting from root but without initial '/')
   *
   * e.g. if frontend directory is /test-app/frontend, then 'test-app/frontend'
   */
  pathToFrontendFromRoot: string;
  /**
   * Branches to setup
   */
  branches: IBranchConfig[];
  /**
   * Whether to use the repo's build spec or the manual one defined above
   */
  useManualBuildSpec?: boolean;
  /**
   * Any props that need to be manually overriden
   */
  amplifyCfnProps?: amplify.CfnAppProps;
  /**
   * Whether the Backend for Amplify has been made. Leave empty or undefined if not
   */
  backendName?: string;
  /**
   * Base domain name for the website
   */
  domainName?: string;
  /**
   * Backend's API domain
   *
   * @example 2169821.execute-api.prod.amazonaws.com
   */
  backendApiDomain?: string;
}

interface IOverrideableAmplifyProps {
  buildSpec?: string;
}

export class AmplifyStack extends Stack {
  amplifyApp: amplify.CfnApp;

  branches: amplify.CfnBranch[];

  amplifyDomain: amplify.CfnDomain;

  constructor(scope: Construct, id: string, props: IAmplifyStackProps) {
    super(scope, id, props);

    const additionalAmplifyProps: IOverrideableAmplifyProps = {};
    if (props.useManualBuildSpec) {
      additionalAmplifyProps.buildSpec = generateBuildSpec(props.pathToFrontendFromRoot);
    }

    let rules = [...BASE_CUSTOM_RULES];
    if (props.backendApiDomain) {
      rules = [
        {
          source: "/api/<*>",
          target: `${props.backendApiDomain}/api/<*>`,
          status: "200",
        },
        ...rules,
      ];
    }

    this.amplifyApp = new amplify.CfnApp(this, `${id}-AmplifyCfnApp`, {
      name: props.name,
      environmentVariables: [
        {
          name: "DISABLE_ESLINT_PLUGIN",
          value: "true",
        },
        {
          name: "AMPLIFY_MONOREPO_APP_ROOT",
          value: props.pathToFrontendFromRoot,
        },
        {
          name: "AMPLIFY_DIFF_DEPLOY",
          value: "false",
        },
        {
          name: "_LIVE_UPDATES",
          value:
            '[{"name":"Amplify CLI","pkg":"@aws-amplify/cli","type":"npm","version":"latest"}]',
        },
      ],
      customRules: rules,
      enableBranchAutoDeletion: false,
      repository: props.repository,
      accessToken: SecretValue.secretsManager(props.tokenConfig.secretName, {
        jsonField: props.tokenConfig.secretKey,
      }).toString(),
      iamServiceRole: this.getServiceRole(),
      ...additionalAmplifyProps,
      ...props.amplifyCfnProps,
    });

    if (props.domainName) {
      this.amplifyDomain = new amplify.CfnDomain(this, `AmplifyDomain`, {
        appId: this.amplifyApp.attrAppId,
        domainName: props.domainName,
        subDomainSettings: this.generateSubDomainSettings(props.branches),
      });
    }

    this.branches = props.branches.map(({ branchName, stage, ...otherBranchProps }) => {
      return new amplify.CfnBranch(this, `${branchName}Branch`, {
        appId: this.amplifyApp.attrAppId,
        branchName: branchName,
        enableAutoBuild: true,
        stage,
        ...otherBranchProps,
        environmentVariables: this.setBranchEnvVariables(
          otherBranchProps.environmentVariables,
          props.backendName,
        ),
      });
    });

    new CfnOutput(this, "AmplifyAppIdOutput", {
      value: this.amplifyApp.attrAppId,
      description: "Amplify App ID",
      exportName: `${props.name}-amplify-appid`,
    });
  }

  private setBranchEnvVariables(
    branchEnv: Array<amplify.CfnBranch.EnvironmentVariableProperty> | undefined,
    backendName: string | undefined,
  ): Array<amplify.CfnBranch.EnvironmentVariableProperty> {
    if (backendName && branchEnv) {
      return [{ name: "USER_BRANCH", value: backendName }, ...branchEnv];
    } else if (branchEnv) {
      return branchEnv;
    } else if (backendName) {
      return [{ name: "USER_BRANCH", value: backendName }];
    } else {
      return [];
    }
  }

  /**
   * For now, just references hardcoded ARN
   */
  private getServiceRole() {
    return "arn:aws:iam::633874248049:role/amplifyconsole-backend-role";
  }

  private generateSubDomainSettings(
    branches: IBranchConfig[],
  ): amplify.CfnDomain.SubDomainSettingProperty[] {
    return branches.map((branchConfig) => {
      return {
        branchName: branchConfig.branchName,
        prefix: branchConfig.prefix,
      };
    });
  }
}
