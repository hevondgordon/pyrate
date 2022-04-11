FROM node:16.14.2 as app-build

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

FROM nginx:1.21

COPY --from=app-build /app/build usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

