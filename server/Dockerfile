FROM node:14.15.3-alpine3.12 as builder

WORKDIR /user/app

ADD package*.json ./

RUN npm ci

ADD . .

RUN npm run build

FROM node:14.15.3-alpine3.12 as main

WORKDIR /user/app

ADD package*.json ./

RUN npm ci --prod

COPY --from=builder /user/app/build/dist ./build/dist

CMD npm run start:prod
