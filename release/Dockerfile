FROM nginx:alpine

COPY ./deploy /usr/share/nginx/html

RUN mkdir -p /app
COPY ./release/config_and_run.sh /app/config_and_run.sh
COPY ./release/nginx.conf /etc/nginx/conf.d/default.conf

ENV CONFIG_VARS="AUTH_ENDPOINT,USER_API_ENDPOINT"
ENTRYPOINT /app/config_and_run.sh
