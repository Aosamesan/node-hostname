FROM node:15-alpine

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm i
EXPOSE $NODE_HOSTNAME_PORT
ENTRYPOINT [ "npx", "cross-env", "NODE_HOSTNAME_PORT=${NODE_HOSTNAME_PORT}", "node", "src/index.js" ]