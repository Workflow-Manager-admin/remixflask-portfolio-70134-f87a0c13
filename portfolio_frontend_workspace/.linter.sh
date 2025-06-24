#!/bin/bash
cd /home/kavia/workspace/code-generation/remixflask-portfolio-70134-f87a0c13/portfolio_frontend_workspace/portfolio_frontend
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

