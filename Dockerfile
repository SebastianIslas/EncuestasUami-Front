# Container para crear el build de la aplicación
FROM node:18-alpine as build
# Creamos un directorio de trabajo
WORKDIR /app
# Copiamos las dependencias
COPY package.json ./
COPY package-lock.json ./
# Instalamos las dependencias
RUN npm i
# Copiamos el resto de archivos
COPY . ./
# Hacemos el build de la app
RUN npm run build

# Container del server
FROM nginx:1.22-alpine as server
# Copiamos la config de nginx que sirve para este tipo de frameworks
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
# Copiamos el build
COPY --from=build /app/build /usr/share/nginx/html
# Exponemos el puerto 80 del container
EXPOSE 80
