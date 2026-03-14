# Analytics API Setup Guide

Connect GA4 and Google Search Console so you can pull data programmatically for CRO analysis.

## Step 1: Create a Google Cloud Service Account (~5 min)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your existing project (or create one — free tier is fine)
3. **Enable APIs:**
   - Go to "APIs & Services" > "Enable APIs"
   - Search and enable: **Google Analytics Data API**
   - Search and enable: **Google Search Console API**
4. **Create Service Account:**
   - Go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Name: `analytics-reader` (or whatever you like)
   - Click "Create and Continue"
   - Role: skip (we'll grant access in GA4/GSC instead)
   - Click "Done"
5. **Generate Key:**
   - Click on the service account you just created
   - Go to "Keys" tab
   - "Add Key" > "Create new key" > JSON
   - A `.json` file downloads — keep this safe!

## Step 2: Grant Access in GA4 (~2 min)

1. Go to [Google Analytics](https://analytics.google.com)
2. Open your property for itayost.com
3. **Find your Property ID:**
   - Admin (gear icon) > Property Settings
   - Copy the **Property ID** (a number like `123456789`)
4. **Add Service Account:**
   - Admin > Property Access Management
   - Click "+" > "Add users"
   - Paste the service account email (looks like `analytics-reader@your-project.iam.gserviceaccount.com`)
   - Role: **Viewer** (read-only is all we need)
   - Click "Add"

## Step 3: Grant Access in Search Console (~2 min)

1. Go to [Search Console](https://search.google.com/search-console)
2. Select your property (itayost.com)
3. Settings (gear) > Users and Permissions
4. Click "Add User"
5. Paste the same service account email
6. Permission: **Restricted** (read-only)
7. Click "Add"

## Step 4: Configure Environment Variables (~3 min)

Convert your service account JSON key to base64:

```bash
# On Mac/Linux:
cat your-key-file.json | base64

# On Windows (PowerShell):
[Convert]::ToBase64String([System.IO.File]::ReadAllBytes("your-key-file.json"))
```

Add these to your `.env.local`:

```env
# Google Service Account (base64-encoded JSON key)
GOOGLE_SERVICE_ACCOUNT_KEY=eyJ0eXBlIjoic2VydmljZ....(your base64 string)

# GA4 Property ID (just the number, no "properties/" prefix needed)
GA4_PROPERTY_ID=123456789

# Search Console Site URL
# Use one of these formats:
GSC_SITE_URL=sc-domain:itayost.com
# or: GSC_SITE_URL=https://www.itayost.com/

# Optional: API key to protect the endpoints (recommended for production)
ANALYTICS_API_KEY=your-secret-key-here
```

Also add these to Vercel:
```bash
vercel env add GOOGLE_SERVICE_ACCOUNT_KEY
vercel env add GA4_PROPERTY_ID
vercel env add GSC_SITE_URL
vercel env add ANALYTICS_API_KEY
```

## Step 5: Test It

```bash
# Start dev server
npm run dev

# Test GA4 overview
curl http://localhost:3000/api/analytics/ga4?report=overview&period=30

# Test GSC queries
curl http://localhost:3000/api/analytics/gsc?report=queries&period=30

# Test full CRO report
curl http://localhost:3000/api/analytics/cro?period=30
```

## API Reference

### GA4 Endpoint: `/api/analytics/ga4`

| Parameter | Values | Default |
|-----------|--------|---------|
| `report` | `overview`, `pages`, `events`, `conversions`, `user-journey`, `devices` | `overview` |
| `period` | Number of days | `30` |

### GSC Endpoint: `/api/analytics/gsc`

| Parameter | Values | Default |
|-----------|--------|---------|
| `report` | `queries`, `pages`, `devices`, `countries`, `query-pages` | `queries` |
| `period` | Number of days | `30` |
| `limit` | Max rows | `100` |

### CRO Report: `/api/analytics/cro`

| Parameter | Values | Default |
|-----------|--------|---------|
| `period` | Number of days | `30` |

Returns a combined report with: overview metrics, top pages, conversion events, device breakdown, traffic sources, search queries, search pages, and pre-computed CRO signals.

## Security Notes

- The service account has **read-only** access — it cannot modify anything
- The base64-encoded key stays in environment variables, never in code
- Set `ANALYTICS_API_KEY` in production to require an API key header
- API routes use `x-api-key` header for authentication when key is set
