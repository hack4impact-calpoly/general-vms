<a href="https://uiuc.hack4impact.org"><img src="https://raw.githubusercontent.com/hack4impact-uiuc/uiuc.hack4impact.org/master/public/images/colored-logo.svg" alt="hack4impact logo" width="150"></a>
# General VMS

## VMS App Commands

Visit [/test-app](https://github.com/hack4impact-calpoly/general-vms/tree/main/test-app).

## Purpose
This is meant to be a system that can be used in future years to quickly create new VMSs. The user should easily be able to use this project to customize their own VMS or immediately deploy a working VMS with some configuration given.

For now, this repo contains the "perfect" example app to which clone from and configure in your own given way. The `test-app` directory contains all the code necessary for the frontend and backend of the system. Tools will be created to allow a user to easily deploy the application after cloning.

The current thought for how the user interacts with this is:
1. Install the command line interface
```
npm i general-vms
```

2. Setup basic VMS
```
npx general-vms setup
```

This will create a new VMS in an **existing** git repository the user should have made with some default code necessary for a **basic** VMS, which includes a working frontend/backend and code needed to deploy the application. The user during this process will be prompted for basic input (such as the application name) before generation of the files.

3. Customize VMS
```
npx general-vms <something custom>
```

These command-line interface (CLI) options will for setting up anything we have that is not part of the basics of a VMS. This may include setting up user authentication with AWS Amplify or boilerplate to setup a connection to MongoDB for creating some custom add-ons to the backend.

## Current Mission
- Get a nice template app that is completed with a decent looking frontend and a fully-functional backend. Also should include any code necessary for deployment.

## Contributing
- Please make a PR. It will need to be reviewed by at least 1 person. Upcoming: `husky` usage.
- Make sure to add unit tests as we go.
