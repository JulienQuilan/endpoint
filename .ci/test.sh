#!/bin/bash

set -ex

cp config/secrets.js.template config/secrets.js
cp src/client/config/secrets.js.template src/client/config/secrets.js

gem install sass
npm install

npm run lint
npm run build
npm run cover
