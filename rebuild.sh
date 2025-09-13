#!/bin/bash

echo "🧹 Cleaning build artifacts..."
rm -rf .next
rm -rf node_modules/.cache

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building the application..."
npm run build

echo "✅ Build complete! Starting development server..."
npm run dev
