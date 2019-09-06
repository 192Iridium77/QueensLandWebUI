FROM node:11.13.0-alpine

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=80

RUN apk add python make g++

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
# RUN apk update && apk upgrade
# RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN chmod +x ./entrypoint.sh
RUN npm install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

EXPOSE 80

# start the app
ENTRYPOINT ["sh", "-c", "./entrypoint.sh"]
