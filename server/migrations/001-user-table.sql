-- Up
CREATE TABLE IF NOT EXISTS "user" (
	"user_id" INTEGER PRIMARY KEY,
	"email" TEXT,
	"name" TEXT,
	"active" INTEGER NOT NULL DEFAULT 0,
	"last_login" INTEGER
);

-- Down
DROP TABLE IF EXISTS "user"