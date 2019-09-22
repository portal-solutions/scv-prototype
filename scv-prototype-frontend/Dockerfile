FROM nginx:stable-alpine
ARG BUILD_DIR
RUN echo "server { location / { try_files $uri /dev/null /index.html; } }" > /etc/nginx/conf.d/SPA.conf
ADD ${BUILD_DIR} /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
