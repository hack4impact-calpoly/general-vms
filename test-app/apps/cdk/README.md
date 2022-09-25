# General VMS CDK

This package contains the [CDK](https://aws.amazon.com/cdk/) code that manages the project's infrastructure. Rather than manually making changes through the console, which is susceptible to irreversible mistakes and is not abstractable or extendable, we can manage changes to infrastructure via CDK.

## Setup

- Set your AWS_PROFILE (environment variable) to specify profile with correct credentials.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk deploy <stack>` deploy specified stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template
