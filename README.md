# Landing

A full-stack application with TypeScript backend and Next.js frontend.

## Project Structure

```
.
├── backend/              # TypeScript/Express API
│   ├── src/
│   │   └── server.ts    # Express server
│   ├── package.json
│   └── tsconfig.json
├── frontend/            # Next.js application
│   ├── app/             # Next.js app directory
│   ├── package.json
│   └── tsconfig.json
└── .cursor/rules/       # Development rules
```

## Backend Setup

### Prerequisites
- Node.js 18+

### Installation

```bash
cd backend
npm install
```

### Development

```bash
# Run development server with hot reload
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build
npm start
```

The API will be available at `http://localhost:3001`

## Frontend Setup

### Prerequisites
- Node.js 18+

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
# Run development server
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build
npm start
```

The frontend will be available at `http://localhost:3000`

## Development Rules

See `.cursor/rules/javascript-development.mdc` for JavaScript/TypeScript development standards.

## API Endpoints

- `GET /` - Root endpoint
- `GET /api/health` - Health check
- `GET /api/greet/:name` - Greet endpoint

## Tech Stack

### Backend
- TypeScript
- Express
- Zod (runtime validation)
- CORS

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
