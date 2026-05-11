CREATE TABLE IF NOT EXISTS stories (
  id              SERIAL PRIMARY KEY,
  submitted_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status          TEXT        NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending', 'published', 'rejected')),

  -- Author
  author_name     TEXT        NOT NULL,
  telegram        TEXT,                          -- optional, @username

  -- Card content
  quote           TEXT        NOT NULL,          -- headline: «5 котят пережили зиму»
  body            TEXT        NOT NULL,          -- full story text
  photo_url       TEXT,                          -- storage URL (Cloudflare R2 / S3)
  installed_date  DATE,                          -- when installed, e.g. 2024-11-01

  -- Product & location
  product_slug    TEXT        NOT NULL,          -- cozy-shelter | family-shelter | purrtap | edc-feeder
  city            TEXT        NOT NULL,
  country         CHAR(2)     NOT NULL,          -- BY | PL | LT | ...
  lat             NUMERIC(9,6),
  lng             NUMERIC(9,6)
);

-- Fast lookup for the public feed
CREATE INDEX IF NOT EXISTS stories_status_idx        ON stories (status);
CREATE INDEX IF NOT EXISTS stories_product_slug_idx  ON stories (product_slug);
CREATE INDEX IF NOT EXISTS stories_country_idx       ON stories (country);

CREATE TABLE IF NOT EXISTS downloads (
  id           SERIAL PRIMARY KEY,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  product_slug TEXT
);

CREATE INDEX IF NOT EXISTS downloads_product_slug_idx ON downloads (product_slug);
