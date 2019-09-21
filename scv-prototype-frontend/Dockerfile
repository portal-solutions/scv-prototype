# First step: build production distribution
FROM node:10-alpine as build
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

# Second step: build NGINX image with distribution files
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
