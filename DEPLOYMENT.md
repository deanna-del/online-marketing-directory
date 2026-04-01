# Deployment Guide — Cloudflare Pages

This site is built with Astro and deploys as a fully static site to Cloudflare Pages.

---

## Prerequisites

- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier works)
- A [GitHub account](https://github.com) with this project pushed to a repository
- Node.js 18+ installed locally

---

## Step 1: Push to GitHub

If not already done, initialize a git repo and push to GitHub:

```bash
cd online-marketing-directory
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/online-marketing-directory.git
git push -u origin main
```

---

## Step 2: Connect to Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages** in the left sidebar
3. Click **Create application** → **Pages** → **Connect to Git**
4. Authorize Cloudflare to access your GitHub account
5. Select the `online-marketing-directory` repository
6. Click **Begin setup**

---

## Step 3: Configure Build Settings

On the build configuration screen, enter:

| Setting | Value |
|---------|-------|
| **Framework preset** | Astro |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Node.js version** | `18` |

Leave environment variables empty for now (none required for the static build).

Click **Save and Deploy**.

---

## Step 4: Wait for Deployment

Cloudflare will clone your repo, install dependencies, and run the build. This takes 1–3 minutes on first deploy.

Once complete, your site will be live at a `*.pages.dev` subdomain (e.g., `online-marketing-directory.pages.dev`).

---

## Step 5: Add a Custom Domain (Optional)

1. In Cloudflare Pages, go to your project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `onlinemarketingdirectory.com`)
4. If your domain's DNS is already managed by Cloudflare, the DNS records will be configured automatically
5. If not, follow the instructions to add the required DNS records at your domain registrar

---

## Step 6: Configure Decap CMS

Before Decap CMS will work, you need to:

### 6a. Update the GitHub repo in config.yml

Open `public/admin/config.yml` and replace `YOUR_GITHUB_USERNAME` with your actual GitHub username:

```yaml
backend:
  name: github
  repo: YOUR_GITHUB_USERNAME/online-marketing-directory
  branch: main
```

Commit and push this change.

### 6b. Create a GitHub OAuth App

1. Go to GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**
2. Fill in:
   - **Application name**: Online Marketing Directory CMS
   - **Homepage URL**: `https://your-domain.com` (or your `*.pages.dev` URL)
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`

   Note: Even though you're using Cloudflare Pages, Decap CMS uses Netlify's OAuth proxy for GitHub authentication. This is normal and free.

3. Click **Register application**
4. Note your **Client ID** and generate a **Client Secret**

### 6c. Register with Netlify OAuth (for the auth proxy)

1. Create a free [Netlify account](https://netlify.com) (or use existing)
2. Create a new site in Netlify (can be a dummy site — you just need Netlify's OAuth proxy)
3. Go to **Site settings** → **Access control** → **OAuth**
4. Click **Install provider** → **GitHub**
5. Enter your GitHub OAuth App's Client ID and Client Secret
6. Save

### 6d. Access the CMS

Navigate to `https://your-domain.com/admin` to access the CMS. Click "Login with GitHub" and authorize the app.

---

## Automatic Deployments

Every time you push to the `main` branch (including commits made through Decap CMS), Cloudflare Pages will automatically rebuild and deploy your site.

---

## Environment & Build Notes

- **Output**: Static HTML — no server-side runtime required
- **Build time**: ~30 seconds for a typical-sized directory
- **CDN**: Cloudflare's global CDN is automatic — no configuration needed
- **Cache**: Static assets are cached at the edge automatically

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Adding Content Without the CMS

You can also add content directly by creating Markdown files in the appropriate directories:

- **Tools**: `src/content/tools/[tool-name].md`
- **Training**: `src/content/training/[program-name].md`
- **Blog posts**: `src/content/blog/[YYYY-MM-DD-post-title].md`

Follow the frontmatter schema defined in `src/content/config.ts`.

After adding files, commit and push to trigger a new deployment.
