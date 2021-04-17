#!/usr/bin/env bash
set -e;

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER server WITH ENCRYPTED PASSWORD '$APP_USER_PASSWORD';
    CREATE DATABASE server;
    GRANT ALL PRIVILEGES ON DATABASE server TO server;
EOSQL
