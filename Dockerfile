FROM node:14-alpine3.11

RUN mkdir -p /openrpg
WORKDIR /openrpg

RUN apk update --no-cache && \
    apk upgrade --no-cache && \
    apk add tini

ADD package.json yarn.lock ./
RUN yarn

ADD . ./
RUN yarn build

ENV NUXT_HOST=0.0.0.0
EXPOSE 3000

ENTRYPOINT ["tini", "--"]
CMD ["yarn", "start"]
