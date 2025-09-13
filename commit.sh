#!/bin/bash

# Add all changes
git add .

# Commit with message
git commit -m "Fix mobile performance issues on About page

- Fixed OptimizedMotion component className prop type error
- Removed deprecated swcMinify from next.config.js
- Added performance optimizations for mobile devices
- Created useReducedMotion and useIsMobile hooks
- Reduced animation complexity on mobile
- Added performance.css for mobile-specific optimizations
- Removed infinite animations that cause lag
- Implemented conditional parallax (disabled on mobile)
- Reduced blur effects intensity on mobile
- Added GPU acceleration for transforms"

# Push to main branch
git push origin main

echo "Changes committed and pushed successfully!"
