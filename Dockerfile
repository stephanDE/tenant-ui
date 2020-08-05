FROM node:12.18.2-alpine3.10 AS build

COPY . /app
WORKDIR /app

RUN npm install && npm install -g @angular/cli
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist/facility-ui /app/dist/
ADD nginx/nginx_site.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
