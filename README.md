# Dynamic Dashboard with DummyJSON API

A modern React dashboard application built with TypeScript, showcasing integration with the DummyJSON API. The application features user authentication, product management, post tracking, and comment moderation.

## Features

- 🔐 User Authentication
- 📊 Dynamic Dashboard
- 🛍️ Product Management
- 📝 Post Management
- 💬 Comment System
- 🎨 Modern UI with Tailwind CSS
- 🚀 Powered by React Query

## Tech Stack

- React with TypeScript
- Vite for build tooling
- TanStack Query for data fetching
- React Router for navigation
- Tailwind CSS for styling
- React Hook Form with Yup for form validation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/     # React components
├── contexts/       # Context providers
├── services/       # API services
├── types/          # TypeScript types
└── App.tsx         # Main application component
```

## API Integration

This project uses the DummyJSON API for demonstration purposes. The following endpoints are utilized:

- `/auth/login` - User authentication
- `/products` - Product management
- `/posts` - Post management
- `/comments` - Comment system

## Authentication

To test the application, use the following credentials:
- Username: any username from DummyJSON
- Password: any password (for testing)

## Development

The project uses several modern development tools:

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Vite for fast development and building
