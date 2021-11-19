-- Up
CREATE TABLE IF NOT EXISTS "project" (
	"project_id" INTEGER PRIMARY KEY,
	"name" TEXT,
	"description" TEXT,
	"visibility" TEXT NOT NULL DEFAULT 'private',
	"created_at" INTEGER
);

CREATE TABLE IF NOT EXISTS "project_user_link" (
	"project_id" INTEGER NOT NULL,
	"user_id" INTEGER NOT NULL,
	PRIMARY KEY (project_id, user_id)
);


-- Down
DROP TABLE IF EXISTS "project";
DROP TABLE IF EXISTS "project_user_link";