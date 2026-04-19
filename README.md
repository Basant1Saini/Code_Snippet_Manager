# Code Snippet Manager

A full-stack web application to create, organize, search, and share reusable code snippets with syntax highlighting and tag-based filtering.

## Features

- Create and edit code snippets with language-specific syntax highlighting
- Tag snippets for easy categorization and filtering
- Full-text search across snippet titles, descriptions, and code
- Copy-to-clipboard with a single click
- User authentication (register/login) with JWT and personal snippet collections

## Tech Stack

- **Frontend**: React 18, Vite 5
- **Backend**: Node.js 20, Express 5 (ESM)
- **Database**: PostgreSQL 16
- **Auth**: JWT (jsonwebtoken v9), bcryptjs

## Prerequisites

- Node.js >= 20.x
- PostgreSQL >= 16.x

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Basant1Saini/Code_Snippet_Manager.git
cd Code_Snippet_Manager

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials and JWT secret

# Run database migrations
npm run db:migrate

# Start development server (runs client + server concurrently)
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

## Environment Variables

| Variable       | Description                              |
|----------------|------------------------------------------|
| `DATABASE_URL` | PostgreSQL connection string             |
| `JWT_SECRET`   | Secret key for JWT signing               |
| `PORT`         | Server port (default: 3000)              |

## Scripts

| Command              | Description                          |
|----------------------|--------------------------------------|
| `npm run dev`        | Start client + server with hot reload |
| `npm run dev:server` | Start only the backend               |
| `npm run dev:client` | Start only the frontend              |
| `npm run build`      | Build frontend for production        |
| `npm run start`      | Start production server              |
| `npm run db:migrate` | Run database migrations              |
| `npm test`           | Run test suite                       |

## Project Structure

```
Code_Snippet_Manager/
├── client/                  # React frontend (Vite)
│   ├── index.html
│   └── src/
│       ├── main.jsx         # React entry point
│       ├── App.jsx          # Root component
│       ├── api/
│       │   └── snippets.js  # API client (fetch wrapper)
│       └── components/
│           ├── AuthForm.jsx     # Login / Register form
│           ├── SnippetCard.jsx  # Snippet display + copy/delete
│           └── SnippetForm.jsx  # Create snippet form
├── server/                  # Express backend
│   ├── index.js             # Server entry point
│   ├── db.js                # PostgreSQL connection pool
│   ├── routes/
│   │   ├── snippets.js      # Snippet CRUD routes
│   │   └── auth.js          # Register / Login routes
│   ├── models/
│   │   ├── snippet.js       # Snippet DB queries
│   │   └── user.js          # User DB queries
│   └── middleware/
│       ├── auth.js          # JWT verification middleware
│       └── validate.js      # Request validation middleware
├── migrations/
│   ├── 001_init.sql         # Initial schema (users + snippets)
│   └── migrate.js           # Migration runner
├── vite.config.js           # Vite config with API proxy
├── .env.example             # Environment variable template
└── package.json
```

## API Endpoints

### Auth

| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| POST   | `/api/auth/register`  | Register a new user |
| POST   | `/api/auth/login`     | Login and get token |

### Snippets (require `Authorization: Bearer <token>`)

| Method | Endpoint                   | Description          |
|--------|----------------------------|----------------------|
| GET    | `/api/snippets`            | List all snippets    |
| POST   | `/api/snippets`            | Create a new snippet |
| GET    | `/api/snippets/:id`        | Get a snippet by ID  |
| PUT    | `/api/snippets/:id`        | Update a snippet     |
| DELETE | `/api/snippets/:id`        | Delete a snippet     |
| GET    | `/api/snippets/search?q=`  | Search snippets      |

### Snippet Payload

```json
{
  "title": "Debounce function",
  "description": "Delays function execution",
  "code": "const debounce = (fn, ms) => ...",
  "language": "javascript",
  "tags": ["utility", "performance"]
}
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License

MIT
