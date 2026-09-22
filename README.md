# ClearBG - AI Bg Removeing tool


ClearBG is a production-ready, full-stack web application that allows users to upload an image and automatically remove its background using AI. It features a premium, modern, glassmorphic design inspired by top-tier SaaS tools.

## Features

- **AI Background Removal**: Automatically detect and remove image backgrounds.
- **Interactive Comparison**: Interactive before/after slider to compare original and processed images.
- **High-Quality Export**: Download the processed image as a transparent PNG.
- **Premium Design**: Beautiful glassmorphic UI, responsive layout, and smooth animations using Framer Motion.
- **Dark/Light Mode**: Full theme support respecting user preferences.
- **Privacy Focused**: Uploaded files are not permanently stored; they are processed and deleted.
- **Robust Validation**: Client and server-side file type and size validation.

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Lucide React

### Backend

- Node.js
- Express
- TypeScript
- Multer (File handling)
- Axios

## Architecture

The project is structured into two main parts:

- `frontend/`: The React application
- `server/`: The Express backend API

The background removal service uses the `remove.bg` API by default (configurable). If no API key is provided, it falls back to a MockProvider (which returns the original image after a delay to simulate processing).

## Prerequisites

- Node.js (v18+)
- npm

## Installation & Setup

1. **Clone the repository** (if applicable) and navigate to the root directory.

2. **Setup the Backend Server**:

   ```bash
   cd server
   npm install
   ```

3. **Configure Environment Variables**:
   In the `server` directory, create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Add your `remove.bg` API key to `BACKGROUND_REMOVAL_API_KEY` to use real AI processing.

   ```env
   BACKGROUND_REMOVAL_API_KEY=your_api_key_here
   PORT=5000
   ```

4. **Setup the Frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

## Development

You will need two terminal windows to run both the frontend and backend simultaneously.

**Terminal 1 (Backend)**:

```bash
cd server
npm run dev
```

_Runs the Express server with auto-reloading on port 5000._

**Terminal 2 (Frontend)**:

```bash
cd frontend
npm run dev
```

_Runs the Vite development server on port 5173._

Open `http://localhost:5173` in your browser.

## Production Build

### Backend

```bash
cd server
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
```

## API Documentation

### `POST /api/remove-background`

Accepts a `multipart/form-data` request with an image file.

**Request**:

- `image`: The image file (PNG, JPG, WEBP). Max size: 10MB.

**Success Response** (200):

```json
{
  "success": true,
  "image": "data:image/png;base64,..."
}
```

**Error Response** (400/500):

```json
{
  "success": false,
  "message": "Error message description"
}
```

## Security Considerations

- **CORS**: Configure CORS in `server/src/app.ts` to only allow specific origins in production.
- **Rate Limiting**: Can be easily added to the Express server using `express-rate-limit`.
- **API Keys**: Never expose the `BACKGROUND_REMOVAL_API_KEY` to the frontend. All third-party calls are made from the backend.
- **File Validation**: Files are checked for size (<10MB) and mime-type on both the frontend and backend. Temporary files are deleted immediately after processing or on error.

**Powered by - remove.bg**

**Developed by** - [codewithdhruba](https://codewithdhruba.in/)
