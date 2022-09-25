import {
  Stack,
  StackProps,
  aws_lambda as lambda,
  aws_apigateway as apigw,
  Duration,
  CfnOutput,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "path";
import { PATH_TO_CDK_ASSETS } from "../constants";
import { BackendRouting } from "./routing/backend-routing";

interface IBackendStackProps extends StackProps {
  name: string;
  domainName?: string;
  allowDomain?: false;
  frontendDomain?: string;
}

export class BackendStack extends Stack {
  api: apigw.LambdaRestApi;

  proxyLambda: lambda.IFunction;

  constructor(scope: Construct, id: string, props: IBackendStackProps) {
    super(scope, id, props);

    this.generateLambdaProxy(props.name, props.frontendDomain);
    this.generateAPI(props.name, props.frontendDomain);

    // Use allowDomain to hide this for now
    if (props.domainName && props.allowDomain) {
      new BackendRouting(this, "BackendRouting", {
        domainName: props.domainName,
        restApi: this.api,
        name: props.name,
      });
    }

    this.generateOutputs(props);
  }

  private generateLambdaProxy(name: string, frontendOrigin: string | undefined) {
    this.proxyLambda = new lambda.Function(this, `${name}ProxyLambda`, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "main.handler",
      code: lambda.Code.fromAsset(path.join(PATH_TO_CDK_ASSETS, "backend.zip")),
      timeout: Duration.seconds(30),
      memorySize: 512,
      description: "Lambda with API",
      functionName: `${name}-ProxyLambda`,
      environment: {
        FRONTEND_ORIGIN: frontendOrigin ?? "*",
      },
    });
  }

  private generateAPI(name: string, frontendOrigin: string | undefined) {
    this.api = new apigw.LambdaRestApi(this, `${name}ProxyLambdaRestApi`, {
      handler: this.proxyLambda,
      proxy: true,
      description: "REST API that directs all requests to Lambda function",
      binaryMediaTypes: ["*/*"],
      endpointConfiguration: {
        types: [apigw.EndpointType.REGIONAL],
      },
      deployOptions: {
        stageName: "prod",
      },
      defaultCorsPreflightOptions: {
        allowOrigins: [frontendOrigin ?? "*"],
        allowCredentials: true,
        disableCache: true,
      },
      restApiName: `${name}-ProxyLambdaRestApi`,
    });
  }

  private generateOutputs(_props: IBackendStackProps) {
    new CfnOutput(this, "LambdaFunctionConsoleUrl", {
      description: "Console URL for the Lambda Function",
      value: `https://${Stack.of(this).region}.console.aws.amazon.com/lambda/home?region=${
        Stack.of(this).region
      }#/functions/${this.proxyLambda.functionName}`,
    });

    new CfnOutput(this, "ApiGatewayApiConsoleUrl", {
      description: "Console URL for the API Gateway API's Stage",
      value: `https://${Stack.of(this).region}.console.aws.amazon.com/lambda/home?region=${
        Stack.of(this).region
      }#/apis/${this.api.restApiId}/stages/${this.api.deploymentStage.stageName}`,
    });

    new CfnOutput(this, "ApiUrl", {
      description:
        "Invoke URL for your API. Clicking this link will perform a GET request on the root resource of your API.",
      value: `${this.getApiInvokeUrl()}`,
    });
  }

  public getApiInvokeUrl() {
    return this.api.deploymentStage.urlForPath();
  }

  public getCleanedInvokeUrl() {
    // Remove trailing slash
    return this.getApiInvokeUrl().slice(0, -1);
  }
}
