#!/bin/bash

# Database Setup Script for QR Platform
# Run this after your Vercel deployment succeeds

set -e

echo "🗄️  Setting up database schema..."
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL environment variable is not set"
  echo ""
  echo "Please set it first:"
  echo "  export DATABASE_URL='your-neon-database-url'"
  echo ""
  exit 1
fi

echo "📋 Database URL found"
echo "🚀 Pushing Prisma schema to database..."
echo ""

# Navigate to the database package
cd "$(dirname "$0")/../packages/database"

# Push the schema
npx prisma db push --accept-data-loss

echo ""
echo "✅ Database setup complete!"
echo ""
echo "The following tables were created:"
echo "  • Link - URL shortening and QR codes"
echo "  • QRCode - QR code generations"
echo "  • Click - Analytics tracking"
echo "  • Domain - Custom domain management"
echo "  • Folder - Link organization"
echo ""
echo "🎉 Your QR platform is ready to use!"
echo ""
echo "Next steps:"
echo "  1. Visit your Vercel deployment URL"
echo "  2. Sign in with Clerk"
echo "  3. Create your first link at /links/new"
echo "  4. Generate a QR code"
echo "  5. Test the redirect at /r/{slug}"
