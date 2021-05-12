#/usr/vin/env bash

if [[ -f ".env" ]]; then
  echo "Exporting .env variables"
  export $(grep -v '^#' .env | xargs)
fi

#services=(db frontend server)
#
#for service in ${services[*]}
#do
#  echo "Service: $service"
#  pushd "../$service";
#  docker-compose build;
#  docker-compose push;
#  popd;
#done

ssh -i "$SERVER_PEM_LOCATION" "ec2-user@$SERVER_HOST" "cd ~/confin && docker-compose pull"
ssh -i "$SERVER_PEM_LOCATION" "ec2-user@$SERVER_HOST" "cd ~/confin && docker-compose up -d"
