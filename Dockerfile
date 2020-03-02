FROM node:latest

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -yqq postgresql-client

COPY package.json .
RUN yarn install

COPY . .

RUN chmod +x ./wait_for_postgres.sh

EXPOSE 3000
CMD ["yarn", "start"]