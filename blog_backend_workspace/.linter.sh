#!/bin/bash
cd /home/kavia/workspace/code-generation/remixflask-portfolio-70134-f87a0c13/blog_backend_workspace/blog_backend
source venv/bin/activate
flake8 .
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

