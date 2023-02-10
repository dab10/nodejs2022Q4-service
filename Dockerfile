FROM node:18-alpine

EXPOSE ${PORT}

WORKDIR /hls/app/src

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]