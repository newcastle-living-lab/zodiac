-- Up
CREATE TABLE IF NOT EXISTS "comment" (
	"comment_id" INTEGER PRIMARY KEY,
	"project_id" INTEGER NOT NULL,
	"activity_id" INTEGER NOT NULL,
	"user_id" INTEGER NOT NULL,
	"is_published" INTEGER NOT NULL DEFAULT 0,
	"is_author" INTEGER NOT NULL DEFAULT 0,
	"body" TEXT,
	"pos_x" INTEGER,
	"pos_y" INTEGER,
	"created_at" INTEGER NOT NULL
);


-- Down
DROP TABLE IF EXISTS "comment";