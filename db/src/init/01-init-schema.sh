#!/usr/bin/env bash
set -e;

PGPASSWORD="$APP_USER_PASSWORD" psql -v ON_ERROR_STOP=1 --username "server" -f /docker-entrypoint-initdb.d/sql/schema_v0.sql
