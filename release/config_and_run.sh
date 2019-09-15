#!/bin/sh

if [ -z "$VARNAME" ]; then
    VARNAME="app_config";
fi

JSON_OUTPUT=''
if [ -z "$CONFIG_VARS" ]; then
    JSON_OUTPUT=$(env | awk -F= '{print "\x22"$1"\x22:\x22"$2"\x22"}' | paste -sd',')
else
    SPLIT=$(echo $CONFIG_VARS | tr "," "\n")
    for v in $SPLIT; do
        JSON_OUTPUT="$JSON_OUTPUT\"${v}\":\"$(printenv $v)\","
    done
    JSON_OUTPUT=${JSON_OUTPUT%?}
fi

echo 'var '$VARNAME'={'$JSON_OUTPUT'};' > /usr/share/nginx/html/config.js
echo "Config saved"
nginx -g "daemon off;"
