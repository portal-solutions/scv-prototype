FROM nginx:stable-alpine
ARG BUILD_DIR
ADD ${BUILD_DIR} /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
