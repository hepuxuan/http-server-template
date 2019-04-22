FROM node:8 as build-stage
COPY package*.json ./
COPY src ./src
COPY public ./public
COPY babel.config.js ./babel.config.js
RUN npm install
RUN npm run build
FROM nginx
COPY http-template.conf /etc/nginx/conf.d/http-template.conf
COPY --from=build-stage dist /var/www/home-page/dist