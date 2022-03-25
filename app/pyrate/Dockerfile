FROM node:16

WORKDIR /app

COPY . .

RUN yarn 
RUN npx next build

CMD ["yarn", "run", "start"]

EXPOSE 3000

