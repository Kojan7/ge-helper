#!/usr/bin/env sh

# abort on errors
set -e

yarn build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

# deploy
git push -f git@github.com:zyntuz/ge-helper.git master:gh-pages

cd -
