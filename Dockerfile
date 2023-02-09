FROM node:18-alpine

EXPOSE 3000

WORKDIR /hls/app/src

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]