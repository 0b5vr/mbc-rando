FROM node:13.5.0-alpine

ENV APP=/root/app

# == mkdir and cd an app folder ====================================================================
RUN mkdir ${APP}
WORKDIR ${APP}

# == install node deps =============================================================================
ADD ./app/package.json ./
ADD ./app/yarn.lock ./

RUN npm install -g forever
RUN yarn

# == remove unnecessary and big files (WOW) ========================================================
RUN rm -rf ${APP}/node_modules/kuromoji/test
RUN echo -n > ${APP}/node_modules/kuromoji/dict/*

# == add rest of files =============================================================================
ADD ./app ./
RUN chmod +x ./start.sh

# == entrypoint ====================================================================================
CMD ${APP}/start.sh
