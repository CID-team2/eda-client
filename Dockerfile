# syntax=docker/dockerfile:1

FROM node:14.17.6
RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts -g --silent

COPY . /app
CMD ["npm", "start"]
