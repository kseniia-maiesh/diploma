# Diplom Frontend

A simple React TypeScript frontend application built with Vite.

## Features

- ⚡️ React 18 with TypeScript
- 🎨 Modern CSS with responsive design
- 🔄 Axios for API calls
- 🚀 Vite for fast development and building
- 📦 Ready to connect with Django backend

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
cd frontend
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at http://localhost:3000

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── services/
│   │   └── api.ts          # Axios configuration and API service
│   ├── App.tsx             # Main application component
│   ├── App.css             # Application styles
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## API Configuration

The API is configured to proxy requests to `http://localhost:8000` in development mode. You can change this in `vite.config.ts` or set the `VITE_API_URL` environment variable.

## Environment Variables

Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:8000
```

## Technologies Used

- React 18
- TypeScript
- Vite
- Axios
- CSS3
