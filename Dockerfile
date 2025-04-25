# Etapa de construcción
FROM node:20 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Construimos la aplicación
RUN npm run build
# Verificamos el contenido
RUN ls -la dist/running-strav-ia-web/

# Etapa de producción
FROM nginx:alpine
# Eliminamos la configuración por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*
# Copiamos nuestra configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copiamos los archivos de la aplicación
COPY --from=builder /app/dist/running-strav-ia-web/* /usr/share/nginx/html/
# Verificamos que los archivos se copiaron
RUN ls -la /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
