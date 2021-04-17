CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "lastForgotPassRequest" BIGINT NOT NULL DEFAULT 0,
  "password" TEXT NOT NULL
);

CREATE TABLE tag(
    id SERIAL PRIMARY KEY,
    value TEXT NOT NULL
);

CREATE TABLE "outcome_item"(
   id SERIAL PRIMARY KEY,
   amount INT NOT NULL,
   currency VARCHAR(5) NOT NULL,
   description TEXT NOT NULL
);

CREATE TABLE "outcome_item_tags"(
    "tag_id" INT REFERENCES tag(id),
    "outcome_item_id" INT REFERENCES outcome_item(id),
    PRIMARY KEY (tag_id, outcome_item_id)
)
