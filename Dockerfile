FROM node:18-alpine

EXPOSE ${PORT}

WORKDIR /hls/app/src

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD [ "npm", "run", "start:dev" ]