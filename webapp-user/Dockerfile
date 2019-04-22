FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

COPY src ./src

COPY public ./public

COPY config ./config

COPY bin ./bin

RUN npm install

RUN NODE_ENV=production npm run build

CMD ["npm", "start" ]
