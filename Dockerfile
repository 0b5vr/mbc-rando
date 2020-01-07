FROM node:13.5.0-alpine

ENV APP=/root/app

RUN mkdir $APP
WORKDIR $APP

ADD ./app/package.json ./
ADD ./app/yarn.lock ./

RUN npm install -g forever
RUN yarn

ADD ./app ./
RUN chmod +x ./start.sh

CMD $APP/start.sh
