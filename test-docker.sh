#!/bin/bash

echo "🔍 Testing Docker Configuration"
echo "================================"

echo "📋 What this test does:"
echo "1. Shows the final stage that will be built by default"
echo "2. Confirms the CMD that will be executed"
echo "3. Validates the production setup"

echo ""
echo "🎯 Expected Results:"
echo "- Default stage: 'default' (inherits from bolt-ai-production)"
echo "- CMD: ['node', 'build/server/index.js']"
echo "- PORT: 10000"
echo "- NODE_ENV: production"

echo ""
echo "📁 Dockerfile Analysis:"
echo "========================"

echo "🔍 Available stages:"
grep -n "^FROM.*AS" Dockerfile | while IFS= read -r line; do
    echo "  - $line"
done

echo ""
echo "🎯 Default stage (last FROM without AS):"
tail -10 Dockerfile | grep -E "^FROM|^CMD|^# " | head -5

echo ""
echo "✅ Production stage CMD:"
grep -A 20 "FROM node.*bolt-ai-production" Dockerfile | grep "CMD" | head -1

echo ""
echo "📊 render.yaml configuration:"
echo "=============================="
echo "Runtime: $(grep 'runtime:' render.yaml)"
echo "DockerCommand: $(grep 'dockerCommand:' render.yaml || echo 'dockerCommand: (using Dockerfile CMD)')"

echo ""
echo "🚀 Expected deployment flow:"
echo "1. Render builds Docker image (defaults to 'default' stage)"
echo "2. 'default' stage inherits from 'bolt-ai-production'"
echo "3. Executes CMD ['node', 'build/server/index.js']"
echo "4. Server starts on PORT 10000"

echo ""
echo "🔧 If this fails, the issue is likely:"
echo "- Render not using the correct Docker stage"
echo "- dockerCommand in render.yaml overriding CMD"
echo "- NODE_ENV causing wrong behavior"