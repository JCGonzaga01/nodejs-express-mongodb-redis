FROM node:alpine
WORKDIR /workspace/app
COPY package.json /workspace/app
RUN yarn install
COPY . /workspace/app
EXPOSE 4000
CMD [ "yarn", "start" ]