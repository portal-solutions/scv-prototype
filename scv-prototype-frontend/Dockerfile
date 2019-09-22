FROM nginx:stable-alpine
ARG BUILD_DIR
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
ADD ${BUILD_DIR} /usr/share/nginx/html
EXPOSE 80
