#!/bin/bash

echo "📱 Mobile Performance Testing Script"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if the build exists
if [ ! -d ".next" ]; then
    echo -e "${YELLOW}No build found. Running build first...${NC}"
    npm run build
    if [ $? -ne 0 ]; then
        echo -e "${RED}Build failed. Please fix errors and try again.${NC}"
        exit 1
    fi
fi

# Start the production server
echo -e "${GREEN}Starting production server...${NC}"
npm start &
SERVER_PID=$!

# Wait for server to start
echo "Waiting for server to start..."
sleep 5

# Check if server is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo -e "${RED}Server failed to start${NC}"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

echo -e "${GREEN}✅ Server is running at http://localhost:3000${NC}"
echo ""

# Get local IP for mobile testing
LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null || hostname -I | awk '{print $1}' 2>/dev/null)
if [ ! -z "$LOCAL_IP" ]; then
    echo -e "${GREEN}📱 Test on mobile devices at: http://$LOCAL_IP:3000${NC}"
fi

echo ""
echo "🧪 Running Performance Tests..."
echo "================================"
echo ""

# Function to run Lighthouse
run_lighthouse() {
    local PRESET=$1
    local OUTPUT_NAME=$2
    
    echo -e "${YELLOW}Running Lighthouse audit for $PRESET...${NC}"
    
    npx lighthouse http://localhost:3000 \
        --preset=$PRESET \
        --output=html \
        --output-path=./lighthouse-$OUTPUT_NAME.html \
        --quiet \
        --chrome-flags="--headless"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $PRESET audit complete. Report saved to lighthouse-$OUTPUT_NAME.html${NC}"
        
        # Extract scores from the report
        if [ -f "lighthouse-$OUTPUT_NAME.html" ]; then
            echo "Opening report in browser..."
            open "lighthouse-$OUTPUT_NAME.html" 2>/dev/null || xdg-open "lighthouse-$OUTPUT_NAME.html" 2>/dev/null
        fi
    else
        echo -e "${RED}❌ $PRESET audit failed${NC}"
    fi
    echo ""
}

# Run audits
run_lighthouse "mobile" "mobile-report"
run_lighthouse "desktop" "desktop-report"

echo ""
echo "📊 Performance Test Summary"
echo "==========================="
echo ""
echo "✅ Server running at: http://localhost:3000"
if [ ! -z "$LOCAL_IP" ]; then
    echo "📱 Mobile testing URL: http://$LOCAL_IP:3000"
fi
echo "📈 Lighthouse reports generated:"
echo "   - lighthouse-mobile-report.html"
echo "   - lighthouse-desktop-report.html"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
echo ""

# Keep server running
wait $SERVER_PID
