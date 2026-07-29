-- ============================================================
-- XYZ Event — Supabase PostgreSQL Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID generation (already enabled in Supabase by default)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Users Table ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name       VARCHAR(255)    NOT NULL,
    college         VARCHAR(255)    NOT NULL,
    department      VARCHAR(255)    NOT NULL,
    year            VARCHAR(20)     NOT NULL,
    email           VARCHAR(255)    UNIQUE NOT NULL,
    password_hash   VARCHAR(255)    NOT NULL,   -- bcrypt hash, NEVER plain text
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- ── Indexes ──────────────────────────────────────────────────────
-- Email index for fast login lookups (also enforces uniqueness)
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users (email);

-- ── Row Level Security (optional but recommended for Supabase) ───
-- Since the backend uses a direct PostgreSQL connection (not Supabase client),
-- RLS is optional. Enable only if you also use the Supabase dashboard to query.
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- ── Comments ─────────────────────────────────────────────────────
COMMENT ON TABLE  users              IS 'Registered participants for the XYZ event.';
COMMENT ON COLUMN users.password_hash IS 'bcrypt hash of the user password. Plain text is never stored.';
COMMENT ON COLUMN users.email         IS 'Must be unique. Used as the JWT subject (sub).';

-- ── Verify ───────────────────────────────────────────────────────
-- SELECT * FROM users LIMIT 5;
