FROM node:16.13.0-alpine

RUN set -eux; \
    mkdir -p /var/www/app; \
    chmod 777 /var/www/app

COPY . /var/www/app
WORKDIR /var/www/app

EXPOSE 3000

RUN npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "start" ]
