import { Pool } from "pg";
import { config } from "dotenv";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local
try { config({ path: resolve(process.cwd(), ".env.local") }); } catch {}
// Also allow .env
try { config(); } catch {}

const dbUrl = process.env.DB_URL;
if (!dbUrl) {
  console.error("ERROR: DB_URL environment variable is not set");
  process.exit(1);
}

const pool = new Pool({ connectionString: dbUrl });

const migration = `
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  openid VARCHAR(128) NOT NULL UNIQUE,
  nickname VARCHAR(255) DEFAULT '',
  avatar_url TEXT DEFAULT '',
  merit BIGINT DEFAULT 0,
  current_skin VARCHAR(64) DEFAULT 'default',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_openid ON users (openid);
CREATE INDEX IF NOT EXISTS idx_users_merit ON users (merit DESC);

CREATE TABLE IF NOT EXISTS merit_logs (
  id BIGSERIAL PRIMARY KEY,
  openid VARCHAR(128) NOT NULL,
  delta BIGINT NOT NULL,
  source VARCHAR(32) DEFAULT 'tap',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_merit_logs_openid ON merit_logs (openid);
CREATE INDEX IF NOT EXISTS idx_merit_logs_created_at ON merit_logs (created_at DESC);

CREATE TABLE IF NOT EXISTS skins (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  image_url TEXT DEFAULT '',
  sound_url TEXT DEFAULT '',
  sort_order INT DEFAULT 0
);

INSERT INTO skins (id, name, sort_order)
VALUES
  ('default', '经典木鱼', 0),
  ('cyberpunk', '赛博朋克', 1),
  ('jade', '翡翠禅心', 2)
ON CONFLICT (id) DO NOTHING;
`;

async function main() {
  const client = await pool.connect();
  try {
    await client.query(migration);
    console.log("Migration completed successfully.");
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
