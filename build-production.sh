#!/bin/bash

echo "🚀 Starting production build..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out

# Install dependencies if needed
echo "📦 Checking dependencies..."
npm install

# Run the build
echo "🔨 Building the application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""
    echo "📊 Build Statistics:"
    du -sh .next
    echo ""
    echo "🎯 Next Steps:"
    echo "1. Run 'npm start' to test the production build locally"
    echo "2. Test on mobile devices at http://[your-ip]:3000"
    echo "3. Run Lighthouse audit: npx lighthouse http://localhost:3000 --preset=mobile --view"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
