#!/bin/bash

source ./tools/prebuild.sh

yarn run test &
HUGO_MODE=dev hugo server --buildDrafts "$@"
