FROM node:14 AS development

ADD . /app
WORKDIR /app

COPY apps/order-service/package.json dist/apps/order-service/
COPY apps/order-service/tsconfig.build.json dist/apps/order-service/
COPY apps/order-service/tsconfig.json dist/apps/order-service/

EXPOSE 3003

RUN yarn --cwd dist/apps/order-service

RUN yarn

RUN yarn order-service:migrate

CMD yarn --cwd apps start:order-service:dev
