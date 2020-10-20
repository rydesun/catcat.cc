#!/bin/bash

yarn run test &
HUGO_MODE=dev hugo server --buildDrafts "$@"
