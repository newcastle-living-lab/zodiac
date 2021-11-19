-- Up
CREATE TABLE IF NOT EXISTS "activity" (
	"activity_id" INTEGER PRIMARY KEY,
	"project_id" INTEGER NOT NULL,
	"user_id" INTEGER NOT NULL,
	"type" TEXT,
	"title" TEXT,
	"description" TEXT,
	"image_filename" TEXT,
	"external_url" TEXT,
	"position" INTEGER NOT NULL DEFAULT 0,
	"created_at" INTEGER NOT NULL
);


-- Down
DROP TABLE IF EXISTS "activity";