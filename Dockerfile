FROM node:14-alpine as build
RUN apk add --no-cache git
RUN git clone -b routing https://github.com/CID-team2/eda-client.git /app
WORKDIR /app
RUN yarn install --production --silent
RUN yarn global add react-scripts@3.4.1 --silent
RUN yarn run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
