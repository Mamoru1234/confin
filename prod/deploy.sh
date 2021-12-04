#!/usr/bin/env bash

if [[ -f ".env" ]]; then
  echo "Exporting .env variables"
  export $(grep -v '^#' .env | xargs)
fi

ssh -i "$SERVER_PEM_LOCATION" "ec2-user@$SERVER_HOST" "cd ~/confin && docker-compose pull"
ssh -i "$SERVER_PEM_LOCATION" "ec2-user@$SERVER_HOST" "cd ~/confin && docker-compose up -d"
