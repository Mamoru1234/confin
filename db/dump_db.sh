#!/usr/bin/env bash

set -eu;

echo "Start dump on server"

ssh -tt tickets-server 'docker exec -it db.confin pg_dump -U server --column-inserts --data-only > dump.sql'

echo "Start copy"

scp tickets-server:~/dump.sql .
