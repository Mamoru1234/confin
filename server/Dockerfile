FROM node:16.15.1-alpine3.16 as builder

WORKDIR /user/app

ADD package*.json ./

RUN npm ci

ADD . .

RUN npm run build

FROM node:16.15.1-alpine3.16 as main

WORKDIR /user/app

ADD package*.json ./

RUN npm ci --prod

COPY --from=builder /user/app/build/dist ./build/dist

CMD npm run start:prod
