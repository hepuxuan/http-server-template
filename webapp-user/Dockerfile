FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

COPY src ./src

COPY public ./public

COPY config ./config

COPY bin ./bin

RUN npm install

RUN NODE_ENV=production npm run build

ENV PORT=8083

ENV NODE_ENV=production

ENV API_HOST=host.docker.internal

EXPOSE 8083

CMD ["npm", "start" ]
