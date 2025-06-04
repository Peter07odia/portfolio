# ✅ Vercel Deployment Checklist

## Before You Start
- [ ] GitHub repository is ready: `https://github.com/Peter07odia/portfolio.git`
- [ ] You have a Vercel account (free)
- [ ] You have database credentials ready

---

## 🚀 Quick Deployment Steps

### 1. Go to Vercel
- [ ] Visit [vercel.com](https://vercel.com)
- [ ] Sign in with GitHub

### 2. Import Project
- [ ] Click "New Project"
- [ ] Find "Peter07odia/portfolio"
- [ ] Click "Import"

### 3. Configure Settings
- [ ] Project name: `ai-founder-showcase`
- [ ] Framework: "Other" (auto-detected)
- [ ] Keep all other settings default

### 4. Add Environment Variables
**Required:**
- [ ] `DATABASE_URL` = `your_postgresql_connection_string`
- [ ] `SESSION_SECRET` = `your-32-character-secret-key`
- [ ] `FLASK_ENV` = `production`

**Optional (for contact form):**
- [ ] `MAIL_SERVER` = `smtp.gmail.com`
- [ ] `MAIL_PORT` = `587`
- [ ] `MAIL_USERNAME` = `your-email@gmail.com`
- [ ] `MAIL_PASSWORD` = `your-app-password`
- [ ] `MAIL_DEFAULT_SENDER` = `your-email@gmail.com`

### 5. Deploy
- [ ] Click "Deploy"
- [ ] Wait 2-5 minutes
- [ ] Check for build errors

### 6. Test Your Site
- [ ] Click "Visit" when deployment completes
- [ ] Test all GitHub links
- [ ] Download NVIDIA presentation
- [ ] Test on mobile device

---

## 🗄️ Database Options (Choose One)

### Option A: Vercel Postgres (Easiest)
- [ ] Go to "Storage" tab in Vercel
- [ ] Create Postgres database
- [ ] Copy connection string to `DATABASE_URL`

### Option B: Supabase (Free 500MB)
- [ ] Go to [supabase.com](https://supabase.com)
- [ ] Create new project
- [ ] Get connection string from Settings > Database
- [ ] Add to `DATABASE_URL`

### Option C: Railway (Free 1GB)
- [ ] Go to [railway.app](https://railway.app)
- [ ] Create Postgres database
- [ ] Copy connection string
- [ ] Add to `DATABASE_URL`

---

## 🔧 If Something Goes Wrong

### Build Fails?
1. Check `requirements.txt` exists
2. Verify environment variables are set
3. Check build logs in Vercel dashboard

### Site Loads but Errors?
1. Check function logs in Vercel
2. Verify `DATABASE_URL` is correct
3. Ensure `SESSION_SECRET` is set

### Need Help?
- Check the detailed guide: `VERCEL_DEPLOYMENT_GUIDE.md`
- Vercel docs: [vercel.com/docs](https://vercel.com/docs)

---

## 🎯 Success Criteria

Your deployment is successful when:
- [ ] Portfolio loads without errors
- [ ] All 4 GitHub project links work
- [ ] NVIDIA presentation downloads
- [ ] Site is mobile responsive
- [ ] Contact form works (if configured)

---

**⏱️ Total time: 10-15 minutes**
**💰 Cost: Free (Vercel free tier)** 