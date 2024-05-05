FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Define la imagen base para la etapa de producción
FROM nginx:1.19.0-alpine

# Copia los archivos estáticos generados en la etapa de construcción al directorio de contenido de Nginx
COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80

# Inicia el servidor nginx cuando se ejecute el contenedor
CMD ["nginx", "-g", "daemon off;"]
