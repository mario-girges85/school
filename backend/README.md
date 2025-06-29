# Backend API

A Node.js backend API built with Express and MongoDB.

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file with the following variables:

   ```
   MONGODB_CONNECTION=mongodb://localhost:27017/your_database_name
   PORT=3000
   NODE_ENV=development
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Deploying to Vercel

### Prerequisites

- A Vercel account
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

### Steps

1. **Install Vercel CLI** (optional):

   ```bash
   npm i -g vercel
   ```

2. **Deploy via Vercel Dashboard**:

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Vercel will automatically detect it's a Node.js project

3. **Set Environment Variables**:

   - In your Vercel project dashboard, go to Settings → Environment Variables
   - Add the following variables:
     - `MONGODB_CONNECTION`: Your MongoDB connection string (use MongoDB Atlas for production)
     - `NODE_ENV`: Set to `production`

4. **Deploy**:
   - Vercel will automatically deploy your project
   - Each push to your main branch will trigger a new deployment

### Important Notes

- **MongoDB**: For production, use MongoDB Atlas or another cloud MongoDB service
- **Environment Variables**: Make sure to set all required environment variables in Vercel dashboard
- **Database**: Ensure your MongoDB instance is accessible from Vercel's servers

### API Endpoints

- `GET /` - Welcome message
- `GET /api/users` - User routes (see `routers/user.js` for specific endpoints)

## Project Structure

```
backend/
├── index.js          # Main server file
├── package.json      # Dependencies and scripts
├── vercel.json       # Vercel configuration
├── controllers/      # Route controllers
├── models/          # Database models
├── routers/         # API routes
├── views/           # EJS templates
└── public/          # Static files
```
