# Deployment Checklist

## ✅ Completed
- [x] Fixed Vercel build to only build `apps/app` (Root Directory: `apps/app`)
- [x] Made all optional env vars truly optional
- [x] Added `sonner` package for notifications
- [x] Fixed Next.js 16 route handler compatibility
- [x] Database schema ready with 5 models (Link, QRCode, Click, Domain, Folder)

## 🔄 In Progress

### 1. Verify Deployment
- Check Vercel dashboard for latest deployment status
- Commit: `c863a3a - fix: Update Vercel flags route handler for Next.js 16 compatibility`

### 2. Add Environment Variables in Vercel
Go to Vercel → Settings → Environment Variables and add:

**PostHog:**
```
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Sentry:**
```
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

**Clerk (if not added):**
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_xxxxx
CLERK_SECRET_KEY=sk_xxxxx
```

**Database (should be auto-configured via Neon integration):**
```
DATABASE_URL=postgresql://xxxxx
```

### 3. Push Database Schema
Once deployment succeeds, run:
```bash
cd /home/user/next-forge
npx prisma db push
```

This will create all tables: Link, QRCode, Click, Domain, Folder

### 4. Test the QR Platform
- Visit your deployed URL
- Sign in with Clerk
- Create your first short link
- Generate a QR code
- Test the redirect: `your-domain.vercel.app/r/{slug}`
- View analytics

## 📝 Notes

**What was fixed:**
- Vercel was trying to build all 7 apps → Fixed by setting Root Directory to `apps/app`
- Environment variable validation errors → Made all non-essential vars optional
- Missing `sonner` package → Installed
- Next.js 16 compatibility → Updated route handler signature

**Optional (can add later):**
- Sentry Personal Token (for source maps)
- BASEHUB_TOKEN (for CMS - not needed for QR platform)
- Stripe keys (for payments - not needed yet)
- Resend keys (for email - not needed yet)
