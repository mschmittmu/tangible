#!/bin/bash
set -e

echo ""
echo ">> Building..."
echo ""

rm -rf dist/
yarn build

echo ""
echo ">> Deploying..."
echo ""

rsync -av ./dist/ ubuntu@ec2-18-223-214-124.us-east-2.compute.amazonaws.com:/home/ubuntu/tangible-ui/build

echo ""
echo ">> Deploy completed!"
echo ""
