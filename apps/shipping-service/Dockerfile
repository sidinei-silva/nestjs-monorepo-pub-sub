FROM node:14 AS development

ADD . /app
WORKDIR /app


COPY apps/shipping-service/package.json dist/apps/shipping-service/
COPY apps/shipping-service/tsconfig.build.json dist/apps/shipping-service/
COPY apps/shipping-service/tsconfig.json dist/apps/shipping-service/

EXPOSE 3003

RUN yarn --cwd dist/apps/shipping-service

RUN yarn

CMD yarn --cwd apps start:shipping-service:dev
