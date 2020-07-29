FROM node:lts-alpine

ENV APP=/root/app

# == mkdir and cd an app folder ====================================================================
RUN mkdir ${APP}
WORKDIR ${APP}

# == install node deps =============================================================================
ADD ./app/package.json ./
ADD ./app/yarn.lock ./

RUN npm install -g forever
RUN yarn

# == add rest of files =============================================================================
ADD ./app ./
RUN chmod +x ./start.sh

# == entrypoint ====================================================================================
CMD ${APP}/start.sh
