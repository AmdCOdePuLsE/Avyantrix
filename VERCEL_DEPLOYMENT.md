# Vercel Deployment Guide for Avyantrix

This guide will help you deploy the Avyantrix website to Vercel through GitHub.

## Prerequisites

1. **GitHub Account**: Ensure your project is pushed to GitHub
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) using your GitHub account
3. **Email Service**: Set up EmailJS or configure alternative email services

## Deployment Steps

### 1. Push to GitHub

Make sure your code is committed and pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin master
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your `Avyantrix` repository
4. Vercel will automatically detect it's a Next.js project

### 3. Configure Environment Variables

In the Vercel dashboard, add these environment variables:

#### EmailJS Configuration (Recommended)
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID=your_confirmation_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

#### Alternative: Nodemailer Configuration
```
EMAIL_USER=your_gmail@gmail.com
EMAIL_APP_PASSWORD=your_app_password
ADMIN_EMAIL=admin@avyantrix.com
```

#### Application URLs
```
NEXT_PUBLIC_APP_URL=https://your-deployment-url.vercel.app
```

### 4. Deploy

1. Click "Deploy" - Vercel will automatically build and deploy
2. Your app will be available at `https://your-project-name.vercel.app`

## Post-Deployment Setup

### Custom Domain (Optional)

1. In Vercel dashboard, go to Project Settings → Domains
2. Add your custom domain (e.g., `avyantrix.com`)
3. Configure DNS settings as instructed by Vercel

### Email Service Setup

Choose one of the following options:

#### Option 1: EmailJS (Recommended)
1. Follow the `EMAILJS_SETUP_GUIDE.md` instructions
2. Add environment variables to Vercel
3. Test the contact form

#### Option 2: Resend API
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add `RESEND_API_KEY` to Vercel environment variables

#### Option 3: Nodemailer with Gmail
1. Enable 2-factor authentication on Gmail
2. Generate an app password
3. Add credentials to Vercel environment variables

### SSL Certificate

Vercel automatically provides SSL certificates for all deployments.

## Build Configuration

The project includes optimal build settings:

- **Framework**: Automatically detected as Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Node.js Version**: 18.x (recommended)

## Performance Optimizations

✅ **Already Configured:**
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Static asset optimization
- Font optimization with next/font

## Monitoring & Analytics

Consider adding:
- **Vercel Analytics**: Built-in web analytics
- **Vercel Speed Insights**: Performance monitoring
- **Google Analytics**: User behavior tracking

## Environment-Specific Settings

### Development
```bash
npm run dev
```

### Production Build (Local Testing)
```bash
npm run build
npm run start
```

### Vercel Build
Automatically handled by Vercel's build system.

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check TypeScript errors
   - Verify all dependencies are in package.json
   - Check environment variables

2. **Email Not Working**
   - Verify environment variables are set
   - Check EmailJS configuration
   - Test with different email providers

3. **Images Not Loading**
   - Ensure images are in the `public` folder
   - Check file paths and extensions
   - Verify Next.js Image component usage

4. **API Routes Failing**
   - Check function timeout settings
   - Verify environment variables for API routes
   - Check CORS configuration

### Build Logs

Access build logs in Vercel dashboard under "Deployments" → Select deployment → "View Build Logs"

## Security Considerations

✅ **Implemented:**
- Environment variables for sensitive data
- CORS headers configuration
- Input validation and sanitization
- File upload restrictions

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **Project Issues**: Create issues in the GitHub repository

---

**Ready to Deploy!** 🚀

Your Avyantrix project is now configured for seamless Vercel deployment through GitHub.
