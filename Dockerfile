FROM node:13.5.0-alpine

RUN mkdir /root/app
WORKDIR /root/app

ADD ./app/package.json ./
ADD ./app/yarn.lock ./

RUN npm install -g forever
RUN yarn

ADD ./app ./
RUN chmod +x ./start.sh

CMD /root/app/start.sh
