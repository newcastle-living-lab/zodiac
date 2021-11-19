-- Up
CREATE UNIQUE INDEX "idx_user_email" ON "user" ("email");

-- Down
DROP INDEX "idx_user_email";