#!/usr/bin/env bash

# https://stackoverflow.com/questions/59895/how-can-i-get-the-source-directory-of-a-bash-script-from-within-the-script-itsel/246128#246128
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
APP_DIR="$SCRIPT_DIR/.."

cd "$(git rev-parse --show-toplevel)" && npx husky install "$APP_DIR/.husky"