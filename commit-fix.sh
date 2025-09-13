#!/bin/bash

# Add all changes
git add .

# Commit with message
git commit -m "Fix TypeScript error in OptimizedMotion component

- Made children prop optional in OptimizedMotion component
- Fixed self-closing usage for progress bar animation"

# Push to main branch
git push origin main

echo "TypeScript fix committed and pushed successfully!"
