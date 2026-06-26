# New Features Setup Guide

This guide walks you through setting up the new sections: Technology Stack, FAQ, and Reviews.

## 1. MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster

### Step 2: Get Connection String
1. In MongoDB Atlas, go to **Databases** → **Connect**
2. Choose **Connect your application**
3. Select **Node.js** and **version 5.5+**
4. Copy the connection string
5. Replace `<password>` with your password
6. Replace `myFirstDatabase` with `portfolio` (or your preferred database name)

### Step 3: Configure Environment Variables
1. Open `.env.local` in your portfolio folder
2. Paste your connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

## 2. Install Dependencies

```bash
cd portfolio
npm install
```

## 3. Technology Stack Setup (Sanity)

1. Go to [Sanity Studio](https://sanity.io/manage)
2. Select your project
3. Create a new document type called "Technology"
4. Add technology categories (Frontend, Backend, Database, Tools, DevOps)
5. For each category, add technologies with names, icons, and descriptions

Example Technologies:
- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Express, Python
- **Database**: MongoDB, PostgreSQL
- **Tools**: Docker, Git, Vercel
- **DevOps**: AWS, Docker, CI/CD

## 4. FAQ Section

The FAQ section automatically sends questions to your WhatsApp number (8072487339).

To change the WhatsApp number:
1. Open `src/components/faq.tsx`
2. Find the line with `8072487339`
3. Replace with your WhatsApp number (include country code, no +)

Example: `8072487339` for India

## 5. Reviews Section

Reviews are stored in MongoDB and displayed automatically. No additional setup needed!

Users can submit reviews with:
- Name
- Email
- Rating (1-5 stars)
- Review text

## 6. Test Everything

### Start Development Server
```bash
npm run dev
```

### Test API Routes
```bash
# Create a review
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "rating": 5,
    "review": "Great service, highly recommended!"
  }'

# Get all reviews
curl http://localhost:3000/api/reviews
```

## 7. Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add environment variable:
   - **Name**: `MONGODB_URI`
   - **Value**: Your MongoDB connection string
5. Deploy!

## Features Overview

### Technology Stack
- Organized by categories (Frontend, Backend, Database, Tools, DevOps)
- Emoji icons for visual appeal
- Fetched from Sanity CMS
- Fully editable in Sanity Studio

### FAQ
- 6 pre-configured common questions
- Expandable accordion style
- Custom question form
- Sends directly to WhatsApp

### Reviews
- MongoDB storage
- Automatic average rating calculation
- Star ratings (1-5)
- Recent reviews appear first
- Real-time submission feedback

## Navigation Links

All sections are included in:
- Header navigation
- Footer navigation
- Page IDs:
  - `#tech-stack` → Technology Stack
  - `#faq` → FAQ
  - `#reviews` → Reviews

## Troubleshooting

### MongoDB Connection Error
- Verify connection string in `.env.local`
- Ensure IP whitelist in MongoDB Atlas includes your server IP
- Check database name matches

### Reviews Not Showing
- Ensure MongoDB URI is set correctly
- Check browser console for errors
- Verify API route is working with curl test

### Technology Stack Not Showing
- Ensure you created documents in Sanity
- Check that documents have `_type: "technology"`
- Wait a few seconds for Sanity to sync

## Next Steps

- Customize the FAQ questions in `src/components/faq.tsx`
- Add more technologies via Sanity Studio
- Monitor reviews and respond to feedback
- Customize styling to match your brand

Happy coding! 🚀
