#!/bin/bash -xe

$(dirname $0)/.util.js getVersion > ../version

rm -rf dist
mkdir dist

#cp -r .ebextensions dist/
cp index.js dist/
cp -r server dist/
cp -r build dist/
cp package* dist/
cp README.md dist/
cp -r docs dist/
