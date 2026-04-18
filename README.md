# Code Snippet Manager

A web application to create, organize, search, and share reusable code snippets with syntax highlighting and tag-based filtering.

## Features

- Create and edit code snippets with language-specific syntax highlighting
- Tag snippets for easy categorization and filtering
- Full-text search across snippet titles, descriptions, and code
- Copy-to-clipboard with a single click
- User authentication and personal snippet collections

## Tech Stack

- **Frontend**: React 18, Vite
- **Backend**: Node.js 20, Express 5
- **Database**: PostgreSQL 16
- **Auth**: JWT (jsonwebtoken v9)

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

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Environment Variables

| Variable       | Description                  |
|----------------|------------------------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET`   | Secret key for JWT signing   |
| `PORT`         | Server port (default: 3000)  |

## Scripts

| Command           | Description                    |
|-------------------|--------------------------------|
| `npm run dev`     | Start dev server with hot reload |
| `npm run build`   | Build for production           |
| `npm run start`   | Start production server        |
| `npm run db:migrate` | Run database migrations     |
| `npm test`        | Run test suite                 |

## Project Structure

```
Code_Snippet_Manager/
├── client/          # React frontend
├── server/          # Express backend
│   ├── routes/      # API route handlers
│   ├── models/      # Database models
│   └── middleware/  # Auth & validation middleware
├── migrations/      # Database migration files
└── .env.example     # Environment variable template
```

## API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/snippets`       | List all snippets        |
| POST   | `/api/snippets`       | Create a new snippet     |
| GET    | `/api/snippets/:id`   | Get a snippet by ID      |
| PUT    | `/api/snippets/:id`   | Update a snippet         |
| DELETE | `/api/snippets/:id`   | Delete a snippet         |
| GET    | `/api/snippets/search?q=` | Search snippets     |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License

MIT
