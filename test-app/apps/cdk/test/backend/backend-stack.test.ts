import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { BackendStack } from "../../src/app/backend/backend-stack";

describe("BackendStack", () => {
  it("should create with default resources", () => {
    const app = new cdk.App();

    const backendStack = new BackendStack(app, "BackendStackTest", {
      name: "backend-test",
      domainName: "backend.com",
      allowDomain: false,
      frontendDomain: "frontend.com",
    });

    expect(Template.fromStack(backendStack)).toMatchSnapshot();
  });

  it("should create with default resources when no frontendDomain is given", () => {
    const app = new cdk.App();

    const backendStack = new BackendStack(app, "BackendStackTest", {
      name: "backend-test",
      domainName: "backend.com",
      allowDomain: false,
    });

    expect(Template.fromStack(backendStack)).toMatchSnapshot();
  });
});
