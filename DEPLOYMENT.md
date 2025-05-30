# Deployment Guide

## Environment Variables Setup

### For Local Development

Create a `.env.local` file in the root directory with:

```env
ANAM_API_KEY=YWU0NDVjYTYtNmJkYS00ZGZjLWJkNjMtOTI1NTZiNzcwZGZiOmFiWHE5WmlOUWJTWFdqRC9KZlZWZTgycWp2eTZDamNhek1aOTNLcVoxelU9
```

### For Vercel Deployment

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the following:

| Name | Value |
|------|-------|
| `ANAM_API_KEY` | `YWU0NDVjYTYtNmJkYS00ZGZjLWJkNjMtOTI1NTZiNzcwZGZiOmFiWHE5WmlOUWJTWFdqRC9KZlZWZTgycWp2eTZDamNhek1aOTNLcVoxelU9` |

## Quick Deployment Steps

### Option 1: Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add the environment variable as shown above
4. Deploy!

### Option 2: Manual Build and Deploy

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Verification

After deployment, verify that:

1. The main page loads with the National Auto Loan Network branding
2. The map and process images are displayed correctly
3. The "Chat with Mia" button appears in the bottom right with a pulsating effect
4. Clicking either chat button opens the full-screen chat interface
5. The Anam AI integration works (requires valid API key)

## Troubleshooting

- **Images not loading**: Ensure the `public/` folder is included in your deployment
- **Anam chat not working**: Verify the `ANAM_API_KEY` environment variable is set correctly
- **Build errors**: Run `npm run build` locally to identify and fix issues

## Persona Information

- **Persona ID**: `172918eb-cde9-4a23-b6cf-8e1d85e76603`
- **Character**: Mia - AI Assistant for National Auto Loan Network
- **Purpose**: Auto loan refinancing assistance and customer support 