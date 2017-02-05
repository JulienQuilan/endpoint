#!/usr/bin/env bash

set -ex

cd ${REPO_DIR}

git fetch --all
git checkout ${BRANCH}
git reset --hard origin/${BRANCH}

npm install
npm run build

pm2 stop endpoint || :
pm2 start index.js --name endpoint
pm2 show endpoint

allu \
    --skip-auth \
    --type text \
    --tag Jenkins \
    --message "Successfully deployed endpoint ("$(git rev-parse --abbrev-ref HEAD)", "$(git sha)")."
