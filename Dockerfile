FROM node:19-alpine

WORKDIR /app

COPY . .
RUN yarn --frozen-lockfile

CMD ["yarn", "turbo", "start"]
