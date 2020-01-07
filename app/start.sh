#! /bin/sh

APP_DIR=/root/app

APP_NAME=app

LOG_DIR=/root/logs
mkdir ${LOG_DIR} -p

cd ${APP_DIR}

forever start -a -l ${LOG_DIR}/${APP_NAME}_forever.log -o ${LOG_DIR}/${APP_NAME}_stdout.log -e ${LOG_DIR}/${APP_NAME}_stderr.log .
forever list
forever --fifo logs 0
