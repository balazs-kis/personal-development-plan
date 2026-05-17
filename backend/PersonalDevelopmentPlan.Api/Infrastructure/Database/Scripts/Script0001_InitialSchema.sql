CREATE TABLE users (
    id            TEXT PRIMARY KEY,
    email         TEXT,
    display_name  TEXT,
    avatar_url    TEXT,
    created_at    TEXT NOT NULL DEFAULT (datetime('now')),
    last_login_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_users_email ON users(email) WHERE email IS NOT NULL;

CREATE TABLE identities (
    id               TEXT PRIMARY KEY,
    user_id          TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider         TEXT NOT NULL,
    provider_user_id TEXT NOT NULL,
    provider_email   TEXT,
    linked_at        TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(provider, provider_user_id)
);

CREATE INDEX idx_identities_user ON identities(user_id);

CREATE TABLE lessons (
    id         TEXT PRIMARY KEY,
    slug       TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE user_lesson_state (
    user_id         TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id       TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    first_viewed_at TEXT NOT NULL DEFAULT (datetime('now')),
    last_viewed_at  TEXT NOT NULL DEFAULT (datetime('now')),
    view_count      INTEGER NOT NULL DEFAULT 1,
    completed_at    TEXT,
    PRIMARY KEY (user_id, lesson_id)
);

CREATE INDEX idx_user_lesson_state_recent ON user_lesson_state(user_id, last_viewed_at DESC);
CREATE INDEX idx_user_lesson_state_completed ON user_lesson_state(user_id) WHERE completed_at IS NOT NULL;
