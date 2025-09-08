#!/bin/bash

echo "🚀 Building ITAYOST Apple-Style Website..."
echo "==========================================

# Build the project
echo "📦 Building production bundle..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📋 Next steps to deploy:"
    echo "1. Deploy to Vercel:"
    echo "   npx vercel --prod"
    echo ""
    echo "2. Or deploy to Netlify:"
    echo "   netlify deploy --prod"
    echo ""
    echo "3. Or start production server locally:"
    echo "   npm run start"
    echo ""
    echo "🎉 Your Hebrew website is ready for deployment!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi