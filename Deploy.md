# Deployment Guide: ClearBG

This guide provides step-by-step instructions for deploying the **Backend to Render** and the **Frontend to Vercel**.

## 1. Backend Deployment (Render)

Render is a great platform for hosting Node.js APIs. It provides seamless integration with GitHub.

### Prerequisites
- A [Render](https://render.com/) account.
- Your project should be pushed to a GitHub repository.

### Steps
1. Log in to your Render dashboard.
2. Click on **New +** and select **Web Service**.
3. Connect your GitHub repository containing the `ClearBG` project.
4. Fill in the following details for your web service:
   - **Name**: `clearbg-backend` (or any name you prefer)
   - **Root Directory**: `server` (Important: This tells Render to only build and run the backend directory).
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
5. Scroll down to **Environment Variables** and add the following:
   - `BACKGROUND_REMOVAL_API_KEY`: Your API key from [remove.bg](https://www.remove.bg/api).
   - *(Optional)* `PORT`: `5000` (Render will automatically assign a port, so this is usually not strictly required, but good to know).
6. Click **Create Web Service**. 
7. Once deployed, Render will give you a live URL (e.g., `https://clearbg-backend-xyz.onrender.com`). **Copy this URL** as you will need it for the frontend deployment.

---

## 2. Frontend Deployment (Vercel)

Vercel is optimized for frontend frameworks like Vite and React.

### Prerequisites
- A [Vercel](https://vercel.com/) account.
- Note: A `vercel.json` file has already been created for you inside the `client` folder to handle React Router navigation gracefully and prevent 404 errors.

### Steps
1. Log in to your Vercel dashboard.
2. Click on **Add New...** -> **Project**.
3. Import your GitHub repository.
4. In the **Configure Project** section, make sure to set the following:
   - **Project Name**: `clearbg-frontend`
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client` (Click "Edit" and explicitly select the `client` folder).
5. Open the **Environment Variables** section and add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-render-url.onrender.com/api` *(Replace `https://your-render-url.onrender.com` with the actual URL you got from Render in Step 7, making sure to append `/api` at the end)*.
6. Click **Deploy**. Vercel will automatically run `npm install` and `npm run build` using the Vite preset.
7. Once finished, you will receive a public Vercel URL to access your deployed app!

---

## Summary of App Readiness

I have thoroughly analyzed the codebase and verified that the project is production-ready for these platforms:

- ✅ **Backend Port Binding**: `server/src/server.ts` uses dynamic port mapping (`process.env.PORT`) which is required and fully compatible with Render.
- ✅ **File Uploads**: The application handles temporary uploads via `multer`. It robustly creates a `temp` folder dynamically, which works perfectly with Render's ephemeral filesystem (the files don't need to persist after processing).
- ✅ **Frontend Routing**: A `vercel.json` file was proactively added to your `client` folder to ensure that React Router paths (like `/remove`) work properly on Vercel without throwing 404 errors upon page refresh.
- ✅ **CORS Configuration**: The backend has CORS appropriately enabled globally, which allows your Vercel frontend domain to make API requests without being blocked.
- ✅ **API Connectivity**: The React custom hook (`useBackgroundRemoval.ts`) correctly consumes the `VITE_API_URL` environment variable for production fallback.

Everything is perfectly set up. Happy Deploying!
