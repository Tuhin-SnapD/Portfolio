# Deploying to Netlify

This guide will help you deploy your portfolio to Netlify.

## Prerequisites

1. Make sure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket)
2. Have a Netlify account (free at netlify.com)

## Deployment Steps

### Option 1: Deploy via Netlify UI (Recommended)

1. **Go to Netlify Dashboard**
   - Visit [netlify.com](https://netlify.com)
   - Sign in or create an account

2. **Connect Your Repository**
   - Click "New site from Git"
   - Choose your Git provider (GitHub, GitLab, or Bitbucket)
   - Select your portfolio repository

3. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: `18` (or latest LTS)

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Build your project**
   ```bash
   npm run build
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod --dir=out
   ```

## Configuration Files

The following files have been configured for Netlify deployment:

- `netlify.toml` - Netlify configuration
- `next.config.js` - Updated for static export
- `DEPLOYMENT.md` - This guide

## Custom Domain (Optional)

1. In your Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow the instructions to configure your domain

## Environment Variables

If you have any environment variables, add them in the Netlify dashboard:
1. Go to Site settings > Environment variables
2. Add your variables (e.g., API keys, database URLs)

## Troubleshooting

### Build Errors
- Check that all dependencies are in `package.json`
- Ensure Node.js version is compatible (18+ recommended)
- Check the build logs in Netlify dashboard

### 404 Errors
- The `netlify.toml` file includes redirects for client-side routing
- Make sure your Next.js app uses proper routing

### Performance Issues
- Images are configured for optimization
- Static export should provide fast loading times

## Support

- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js Static Export](https://nextjs.org/docs/advanced-features/static-html-export)
- [Netlify Community](https://community.netlify.com/) 