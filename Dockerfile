FROM node:18-alpine

EXPOSE ${PORT}

WORKDIR /usr/app/src

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD [ "npm", "run", "start:dev", "--", "src/main.ts" ]