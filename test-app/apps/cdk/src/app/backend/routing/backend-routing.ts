import {
  aws_certificatemanager as CertManager,
  aws_apigateway as apigw,
  aws_route53 as route53,
} from "aws-cdk-lib";
import { Construct } from "constructs";

interface IBackendRoutingProps {
  domainName: string;
  name: string;
  restApi: apigw.IRestApi;
}

export class BackendRouting extends Construct {
  certificate: CertManager.Certificate;
  apiDomainName: apigw.DomainName;
  hostedZone: route53.HostedZone;

  constructor(scope: Construct, id: string, props: IBackendRoutingProps) {
    super(scope, id);

    this.certificate = this.generateCertificate(props.domainName);

    this.apiDomainName = new apigw.DomainName(this, `ApiDomainName`, {
      certificate: this.certificate,
      domainName: props.domainName,
    });

    this.setupApiBasePathMapping(props.restApi);
    this.hostedZone = this.generateRoute53HostedZone(props.domainName);
  }

  private generateCertificate(domainName: string) {
    return new CertManager.Certificate(this, `Certificate`, {
      domainName: `*.${domainName}`,
      subjectAlternativeNames: [domainName],
      /* validation: {
        method: CertManager.ValidationMethod.EMAIL,
        props: {
          validationDomains: {
            domainName: `*.${domainName}`,
          }
        }
      } */
    });
  }

  private setupApiBasePathMapping(restApi: apigw.IRestApi) {
    return new apigw.BasePathMapping(this, `ApiBasePathMapping`, {
      restApi,
      domainName: this.apiDomainName,
      basePath: "(none)",
      stage: restApi.deploymentStage,
    });
  }

  private generateRoute53HostedZone(domainName: string) {
    const hostedZone = new route53.HostedZone(this, `Route53HostedZone`, {
      zoneName: domainName,
    });

    new route53.CfnRecordSetGroup(this, `ApiRoute53RecordSetGroup`, {
      hostedZoneId: hostedZone.hostedZoneId,
      recordSets: [
        {
          name: `${domainName}.`,
          type: "A",
          aliasTarget: {
            evaluateTargetHealth: false,
            hostedZoneId: this.apiDomainName.domainNameAliasHostedZoneId,
            dnsName: this.apiDomainName.domainNameAliasDomainName,
          },
        },
      ],
    });

    return hostedZone;
  }
}
