# XYZ — Machine Learning Prediction Challenge

> A full-stack event website for the **Data Analytics Club** ML Hackathon.
> Built with React 19 + Vite + TypeScript + Tailwind CSS on the frontend, and FastAPI + Python on the backend, using Supabase PostgreSQL as the database.

---

## ✨ Features

- **Glassmorphism UI** with dark mode, gradient accents, animated blobs
- **Strict 8-Point Design System** for consistent rhythm and premium spacing
- **Framer Motion** scroll-reveal, stagger, and hover animations
- **Register / Login modals** with real-time password validation
- **JWT authentication** — tokens stored in `localStorage`
- **bcrypt password hashing** — plain text passwords never stored
- **Protected Dashboard** — downloads, profile, quick links
- **Smooth-scroll navigation** from Navbar
- **Fully responsive** — mobile-friendly with hamburger drawer
- **Single config file** (`event.config.ts`) — edit once, updates everywhere

---

## 📁 Folder Structure

```
dac/
├── frontend/                    # React 19 + Vite + TypeScript
│   ├── src/
│   │   ├── config/
│   │   │   └── event.config.ts  # ← Edit event content here
│   │   ├── components/
│   │   │   ├── layout/          # Navbar, Footer
│   │   │   ├── sections/        # Hero, About, ProblemStatements, Timeline, FAQ, Contact
│   │   │   └── ui/              # Modal, RegisterModal, LoginModal
│   │   ├── context/
│   │   │   └── AuthContext.tsx  # Auth state + JWT management
│   │   ├── hooks/
│   │   │   └── useModal.ts
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── utils/
│   │       └── api.ts           # Axios instance with JWT interceptors
│   ├── .env.example
│   └── vite.config.ts
│
├── backend/                     # FastAPI + Python
│   ├── app/
│   │   ├── config.py            # Pydantic-settings (reads .env)
│   │   ├── main.py              # App factory, CORS, router registration
│   │   ├── database/
│   │   │   └── connection.py    # SQLAlchemy engine + session
│   │   ├── models/
│   │   │   └── user.py          # ORM model
│   │   ├── schemas/
│   │   │   └── user.py          # Pydantic request/response schemas
│   │   ├── routes/
│   │   │   ├── auth.py          # POST /register, POST /login
│   │   │   ├── profile.py       # GET /profile
│   │   │   └── events.py        # GET /problem-statements, downloads
│   │   └── utils/
│   │       ├── security.py      # bcrypt helpers
│   │       └── auth.py          # JWT helpers + get_current_user dep
│   ├── static/
│   │   ├── dataset.csv          # ← Replace with real dataset
│   │   └── rulebook.pdf         # ← Replace with real PDF
│   ├── requirements.txt
│   └── .env.example
│
└── supabase/
    └── schema.sql               # SQL to create tables in Supabase
```

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18+ |
| Python | 3.11+ |
| npm | 9+ |
| pip | 23+ |

---

## 1️⃣ Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In the Supabase dashboard: **SQL Editor → New Query**
3. Paste and run the contents of [`supabase/schema.sql`](./supabase/schema.sql)
4. Copy your **Database URL** from: Settings → Database → Connection string (URI mode)

---

## 2️⃣ Backend Setup

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
copy .env.example .env      # Windows
cp .env.example .env        # macOS/Linux
```

### Edit `backend/.env`

```env
DATABASE_URL=postgresql://postgres:<password>@db.<project-ref>.supabase.co:5432/postgres
SECRET_KEY=<generate with: python -c "import secrets; print(secrets.token_hex(32))">
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
FRONTEND_URL=http://localhost:5173
EVENT_NAME=XYZ
```

### Start the backend

```bash
uvicorn app.main:app --reload --port 8000
```

The API is now running at **http://localhost:8000**
Interactive docs: **http://localhost:8000/docs**

---

## 3️⃣ Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create environment file
copy .env.example .env      # Windows
cp .env.example .env        # macOS/Linux
```

### Edit `frontend/.env`

```env
VITE_API_URL=http://localhost:8000
```

### Start the frontend

```bash
npm run dev
```

The site is now running at **http://localhost:5173**

---

## 🔐 Authentication Flow

```
Browser → POST /api/auth/register (JSON)
        ← FastAPI hashes password with bcrypt
        ← Stores user in Supabase
        ← Returns { message, user }

Browser → POST /api/auth/login (form-data: username, password)
        ← FastAPI verifies bcrypt hash
        ← Returns { access_token, token_type, user }
        → Frontend stores token in localStorage
        → Redirects to /dashboard

Dashboard → GET /api/auth/profile (Bearer token)
          ← Returns user profile (no password_hash)
```

---

## 🌐 API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/health` | None | Health check |
| `POST` | `/api/auth/register` | None | Register a user |
| `POST` | `/api/auth/login` | None | Login, get JWT |
| `GET` | `/api/auth/profile` | Bearer | Get current user |
| `GET` | `/api/events/problem-statements` | None | List problem statements |
| `GET` | `/api/downloads/dataset` | Bearer | Download dataset |
| `GET` | `/api/downloads/rulebook` | Bearer | Download rulebook |

---

## ✏️ Customisation

### Change Event Content
Edit [`frontend/src/config/event.config.ts`](./frontend/src/config/event.config.ts):
- Event name, tagline, description
- Problem statements (title, difficulty, tags)
- Timeline dates and milestones
- FAQ items
- Contact information
- Stats (hero section)

### Replace Downloads
Drop new files into `backend/static/`:
- `dataset.csv` — replace with real competition dataset
- `rulebook.pdf` — replace with real PDF (must be an actual PDF binary)

### Change Event Name (one place)
```typescript
// frontend/src/config/event.config.ts
name: "YOUR_EVENT_NAME",
```
```env
# backend/.env
EVENT_NAME=YOUR_EVENT_NAME
```

---

## 🏗️ Deployment

### Frontend (Vercel / Netlify)
```bash
cd frontend
npm run build
# Deploy the `dist/` folder
```
Set environment variable: `VITE_API_URL=https://your-api.com`

### Backend (Railway / Render / Fly.io)
```bash
# Start command
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```
Set all environment variables from `.env.example` in your platform's dashboard.

---

## 🔒 Security Notes

- Passwords are **bcrypt-hashed** with passlib (never stored in plain text)
- JWT tokens expire after 24 hours by default
- CORS is configured to allow only the frontend URL
- `password_hash` is excluded from all API response models
- Duplicate emails return HTTP 409 (not 500)

---

## 📜 License

MIT — Data Analytics Club
