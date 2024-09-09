#!/bin/bash
case $1 in
  staging)
    ENVIRONMENT=staging
    ;;
  production)
    ENVIRONMENT=production
    ;;
  *)
    # if not, tell the user what valid valules they could provide, then abort
    echo "Usage: scripts/deploy.sh <staging|production>"
    exit 1
    ;;
esac

# put git revision in filesystem so webpacker will pick it up (see environment.js)
echo "Recording git revision in .git-rev-deploy..."
git rev-parse HEAD > .git-rev-deploy

# todo: compile a separate binary for linux
echo "Building twitter scraper for linux..."
cd scripts/twitter-scraper && GOOS=linux GOARCH=amd64 go build . && cd ../..

echo "Deploying to $ENVIRONMENT Beanstalk environment..."
eb deploy Wenn-$ENVIRONMENT

echo "Recompiling twitter scraper for local system..."
cd scripts/twitter-scraper && go build . && cd ../..
