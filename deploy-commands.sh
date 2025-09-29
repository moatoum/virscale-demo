#!/bin/bash
# Your GitHub repository
GITHUB_URL="https://github.com/moatoum/virscale-ai.git"

echo "🚀 Deploying Virscale AI to GitHub + Render"
echo "============================================"

# Remove old origin and add your repo
git remote remove origin
git remote add origin $GITHUB_URL

# Stage and commit all changes
git add .
git commit -m "feat: Virscale AI platform ready for deployment

✨ Enhanced features:
- Custom Tabler icons integration
- Modern mode selector UI
- Randomized example prompts
- Production Docker setup
- Render deployment configuration

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to GitHub
git push -u origin main

echo "✅ Code pushed to GitHub!"
echo "🔗 Now connect your repo to Render at https://dashboard.render.com"