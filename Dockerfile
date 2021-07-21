# Basado en Azure pipelines y Linux
FROM node:12.13.0

# Crea directorio de la aplicación
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# Inicia la api utilizando la configuración de producción
CMD npm run start:prod