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

CREATE TABLE IF NOT EXISTS ideas (
  id           SERIAL PRIMARY KEY,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status       TEXT        NOT NULL DEFAULT 'pending'
                           CHECK (status IN ('pending', 'reviewed', 'implemented', 'declined')),

  -- Author
  author_name  TEXT        NOT NULL,
  telegram     TEXT,

  -- Content
  title        TEXT        NOT NULL,
  description  TEXT        NOT NULL,
  category     TEXT,
  photo_url    TEXT
);

CREATE INDEX IF NOT EXISTS ideas_status_idx ON ideas (status);

-- ─────────────────────────────────────────────────────────────
-- Workshop catalog: self-populating, community-cleaned directory.
-- ─────────────────────────────────────────────────────────────

-- One row = one physical workshop.
-- Dedup on insert by source_url OR normalized phone.
CREATE TABLE IF NOT EXISTS workshops (
  id            SERIAL PRIMARY KEY,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),  -- bumped when a source returns it again

  source        TEXT        NOT NULL
                            CHECK (source IN ('vk', 'avito', 'kufar', 'osm', 'manual')),
  source_url    TEXT,                          -- link the user opens to verify (page/listing/site)
  source_ref    TEXT,                          -- external id at the source (vk group id, avito item id, osm node id)

  name          TEXT,                          -- may be NULL from some sources
  phone         TEXT,                          -- normalized (leading + and digits), dedup key
  website       TEXT,
  address       TEXT,
  description   TEXT,

  city          TEXT        NOT NULL,          -- display city name (from geocoder)
  city_norm     TEXT        NOT NULL,          -- lower(trim(city)) — cache & listing match key
  country       CHAR(2),                       -- RU | BY | ... from geocode
  lat           NUMERIC(9,6),
  lng           NUMERIC(9,6)
);

-- Dedup safety nets: partial unique indexes (NULLs don't conflict)
CREATE UNIQUE INDEX IF NOT EXISTS workshops_source_url_uidx ON workshops (source_url) WHERE source_url IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS workshops_phone_uidx      ON workshops (phone)      WHERE phone IS NOT NULL;
CREATE INDEX        IF NOT EXISTS workshops_city_norm_idx   ON workshops (city_norm);

-- Workshop × service type + moderation status.
-- Votes are denormalized here for fast card rendering and status logic.
CREATE TABLE IF NOT EXISTS workshop_services (
  id                 SERIAL PRIMARY KEY,
  workshop_id        INTEGER     NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
  service            TEXT        NOT NULL
                                CHECK (service IN ('laser', 'milling', '3d-print')),
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  status             TEXT        NOT NULL DEFAULT 'pending'
                                CHECK (status IN ('pending', 'confirmed', 'hidden')),

  relevant_votes     INTEGER     NOT NULL DEFAULT 0,
  irrelevant_votes   INTEGER     NOT NULL DEFAULT 0,
  irrelevant_streak  INTEGER     NOT NULL DEFAULT 0,  -- consecutive "irrelevant" without a "relevant"

  UNIQUE (workshop_id, service)
);
CREATE INDEX IF NOT EXISTS workshop_services_lookup_idx ON workshop_services (service, status);

-- Community votes. One vote per (service × voter), where voter = hashed IP.
CREATE TABLE IF NOT EXISTS workshop_votes (
  id                   SERIAL PRIMARY KEY,
  workshop_service_id  INTEGER     NOT NULL REFERENCES workshop_services(id) ON DELETE CASCADE,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  vote                 TEXT        NOT NULL CHECK (vote IN ('relevant', 'irrelevant')),
  voter_hash           TEXT        NOT NULL,  -- sha256(ip + salt), anti-stuffing

  UNIQUE (workshop_service_id, voter_hash)
);
CREATE INDEX IF NOT EXISTS workshop_votes_service_idx ON workshop_votes (workshop_service_id);

-- Search-query cache: decides whether to run a live fetch (pipeline step 2).
-- Does not store workshop links — the listing is built from workshops by city_norm+service.
CREATE TABLE IF NOT EXISTS search_queries (
  id            SERIAL PRIMARY KEY,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  searched_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),  -- last time we actually hit external sources

  city          TEXT        NOT NULL,
  city_norm     TEXT        NOT NULL,
  country       CHAR(2),
  service       TEXT        NOT NULL
                            CHECK (service IN ('laser', 'milling', '3d-print')),
  lat           NUMERIC(9,6),
  lng           NUMERIC(9,6),

  result_count  INTEGER     NOT NULL DEFAULT 0,  -- workshops found on the last live run
  search_count  INTEGER     NOT NULL DEFAULT 1,  -- how many times this query was requested

  UNIQUE (city_norm, service)
);
