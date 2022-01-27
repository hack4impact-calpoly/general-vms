#!/usr/bin/env node

const path = require("path");
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const { exit } = require("process");

const parentDir = path.resolve(__dirname, "..");

(async function () {
  const gitDir = await (await exec('git rev-parse --show-toplevel')).stdout.trim();

  if (gitDir !== parentDir) {
    process.chdir(gitDir);
  }

  const output = await exec(`npx husky install "${parentDir}/.husky"`);
  console.log(output.stdout);
})();
