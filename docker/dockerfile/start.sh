#!/usr/bin/env bash

API_PATH=$API_PATH;


if [ -z "$API_PATH" ]; then
    API_PATH="127.0.0.1:9300";
fi


apiUrl="proxy_pass  http://$API_PATH/rjgf/api;"

sed -i '23c '"$apiUrl"'' /etc/nginx/conf.d/default.conf

nginx -g "daemon off;"
