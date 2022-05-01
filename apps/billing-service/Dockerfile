FROM node:14 AS development

ADD . /app
WORKDIR /app


COPY apps/billing-service/package.json dist/apps/billing-service/
COPY apps/billing-service/tsconfig.build.json dist/apps/billing-service/
COPY apps/billing-service/tsconfig.json dist/apps/billing-service/

EXPOSE 3003

RUN yarn --cwd dist/apps/billing-service

RUN yarn

CMD yarn --cwd apps start:billing-service:dev
