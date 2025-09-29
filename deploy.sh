#!/bin/bash
set -e

echo "🚀 Deploying Virscale AI - Self-Hosted Production"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${RED}❌ Error: .env.local file not found!${NC}"
    echo -e "${YELLOW}💡 Copy .env.example to .env.local and configure your API keys${NC}"
    echo "cp .env.example .env.local"
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: Docker is not running${NC}"
    echo -e "${YELLOW}💡 Please start Docker and try again${NC}"
    exit 1
fi

echo -e "${BLUE}🔧 Building production image...${NC}"
docker build -t virscale-ai:latest --target bolt-ai-production .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful!${NC}"
else
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Starting services...${NC}"
docker compose -f docker-compose.prod.yml up -d

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    echo ""
    echo -e "${GREEN}🎉 Virscale AI is now running!${NC}"
    echo -e "${BLUE}📍 Access your app at: http://localhost:5173${NC}"
    echo ""
    echo "📊 To view logs: docker compose -f docker-compose.prod.yml logs -f"
    echo "🛑 To stop: docker compose -f docker-compose.prod.yml down"
    echo "🔄 To update: ./deploy.sh"
else
    echo -e "${RED}❌ Deployment failed!${NC}"
    exit 1
fi