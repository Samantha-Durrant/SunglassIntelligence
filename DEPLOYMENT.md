# 🚀 Deployment Guide for SunglassIntelligence

## Quick Deploy Options

### 1. Vercel (Recommended for Full-Stack Apps)

**Step-by-Step:**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click "New Project"
4. Import your `SunglassIntelligence` repository
5. Configure environment variables:
   - `SENDGRID_API_KEY` (optional for email features)
   - `OPENAI_API_KEY` (optional for AI features)
6. Deploy!

**Your app will be available at:** `https://your-project-name.vercel.app`

### 2. Railway (Great for Full-Stack)

**Step-by-Step:**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your SunglassIntelligence repository
5. Add environment variables in the dashboard
6. Deploy!

**Your app will be available at:** `https://your-project-name.up.railway.app`

### 3. Netlify (Alternative)

**Step-by-Step:**
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Choose your SunglassIntelligence repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Deploy!

**Your app will be available at:** `https://your-project-name.netlify.app`

### 4. Render (Full-Stack Friendly)

**Step-by-Step:**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your SunglassIntelligence repository
5. Configure:
   - Build Command: `npm run build`
   - Start Command: `npm start`
6. Deploy!

**Your app will be available at:** `https://your-project-name.onrender.com`

## 🔧 Environment Variables for Production

Add these to your deployment platform:

```env
PORT=3000
SENDGRID_API_KEY=your_actual_sendgrid_key
OPENAI_API_KEY=your_actual_openai_key
NODE_ENV=production
```

## 📊 Database Seeding in Production

After deployment, seed your database:
1. Visit: `https://your-deployed-app.com/api/seed` (POST request)
2. Or add a seed button to your admin panel

## 🎯 Expected URLs

Once deployed, your platform will be accessible at URLs like:
- **Vercel**: `https://sunglass-intelligence.vercel.app`
- **Railway**: `https://sunglass-intelligence.up.railway.app`  
- **Netlify**: `https://sunglass-intelligence.netlify.app`
- **Render**: `https://sunglass-intelligence.onrender.com`

## 🛠️ Post-Deployment Steps

1. **Test the deployment** - Visit your live URL
2. **Seed the database** - Call `/api/seed` endpoint
3. **Verify all features** - Dashboard, Brands, AI Analysis
4. **Set up monitoring** - Check logs and performance
5. **Share your link** - Your platform is now publicly accessible!

## 🔍 Troubleshooting

- **Build Errors**: Check Node.js version (18+)
- **API Errors**: Verify environment variables
- **Empty Database**: Call the `/api/seed` endpoint
- **Slow Loading**: Database seeding might be needed

---

Choose the deployment platform that works best for you. **Vercel** and **Railway** are recommended for this full-stack application.
