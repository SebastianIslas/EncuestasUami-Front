# pull the official base image
FROM node:18-alpine as build
# set working direction
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
RUN npm run build

# add app
FROM nginx:1.22-alpine as server
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
