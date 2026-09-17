# PES MASTER - Tournament Hub

An Android-optimized dark theme registration portal for PES MASTER 1 vs 1 and Mega Tournaments.

## Deploying to Vercel

This repository is pre-configured for one-click deployment to **Vercel**.

### Method 1: Deploy via GitHub (Recommended)

1. Push this repository to your GitHub account (or use AI Studio's **Export to GitHub** feature).
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** > **"Project"**.
4. Import your GitHub repository.
5. Vercel will automatically detect:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**. Your site will be live within seconds!

### Method 2: Deploy via Vercel CLI

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run the deployment command from the project root:
   ```bash
   vercel
   ```
3. Follow the interactive prompts (accept defaults as `vercel.json` is already configured).
4. For production deployment:
   ```bash
   vercel --prod
   ```

## Configuration Details

- `vercel.json`: Handles SPA routing rewrites to `/index.html` and routes `/api/*` requests.
- `api/health.ts`: Serverless health check endpoint.
- `.gitignore`: Ignores `.vercel`, `node_modules`, and build artifacts.
