<a href="https://uiuc.hack4impact.org"><img src="https://raw.githubusercontent.com/hack4impact-uiuc/uiuc.hack4impact.org/master/public/images/colored-logo.svg" alt="hack4impact logo" width="150"></a>
# VMS Application

![example workflow](https://github.com/hack4impact-calpoly/general-vms/actions/workflows/main.yml/badge.svg)

This is a volunteer management system (VMS) application. It includes a frontend and backend inner packages for the site as well as code to deploy.

<hr>

## Usage

The latest version of this application can be found at `<FILL IN WITH URL EVENTUALLY>`.

To run locally, run `npm run dev`.

## Development Environment
It is recommended for now to use Visual Studio Code. Open this project (as a folder). VSCode will use the given `.vscode` directory in the project and suggest the extensions to install that will help with the development process. It also includes some helpful settings, like using LF as the end-of-line sequence and telling the linter (ESLint) to fix any files it can upon changes.

## Installation
Run `npm install` in each directory OR run `npm run install:all` in the root directory. This will install all `node_modules` and setup Husky.

## Linting

The following commands run the linter (in our case `eslint`). This does an analysis on the code to try to find stylistic errors. This helps to keep the code clean and consistent.

**NOTE**: _These commands should be ran in the frontend/backend directory_, not in the root.

### `npm run lint-fix`
- Runs linter and reports any errors it cannot fix while fixing those it can.

### `npm run lint-check`
- Runs linter and reports any errors. It will **not** try and fix them.

## Testing

The following commands run tests for the given projects. This can be run in either the root directory or in the frontend/backend directory. If ran in the root, it will run tests in both of the directories.

### `npm run test` or `jest`
- Runs tests. For our case this is `Jest`. You can give some command line options to do things quicker as well. This may or may not run tests in Jest's watch mode. Assume it does not.

### `npm run test -- --watch` or `npm run test:watch`
- Runs tests but in Jest's watch mode. Upon a file being saved, Jest will automatically rerun tests.

### `npm run test -- <test-file>`
- Runs given unit tests only in the specified `test-file`.

### `jest -o`
- Runs tests on changed files according to git. Helpful for quicker testing.

For more info on using the Jest CLI, visit https://jestjs.io/docs/cli.

## Git Hooks -- Husky

These are actions done to verify changes **before** `git commit` and `git push` are finished. When you run `git commit` for instance, it will verify stuff beforehand and then run the actual git stuff.

We have `pre-commit` and `pre-push` hooks installed. `pre-commit` hooks run the linter and will apply fixes using `lint-staged`, whereas `pre-push` will run the linter just for checks and also runs tests.

### WITH CAUTION: --no-verify

If you are working any changes that aren't breaking to the linter or tests (or you are super confident), you can use the `--no-verify` flag on a git command (`git commit --no-verify`) so that the hooks don't run.

**NOTE**: The tests and linter will still run upon push using GitHub Actions.

## Building

This builds an application. Run `npm run build` in any directory.

## Deploying

TO DO. COMING SOON.
