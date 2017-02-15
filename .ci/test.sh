#!/bin/bash

set -ex

npm install

npm run lint
npm run build
npm run cover
