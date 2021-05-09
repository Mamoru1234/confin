FROM nginx:1.19.0-alpine

ADD ./crontab.txt /crontab.txt

RUN apk update && apk add certbot certbot-nginx && chmod 755 /crontab.txt && /usr/bin/crontab /crontab.txt

WORKDIR /user/app

ADD ./nginx /etc/nginx/templates

ADD ./dist/frontend ./dist
