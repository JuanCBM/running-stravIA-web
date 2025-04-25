# Etapa de construcción
FROM node:20 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:alpine
# Copiamos la configuración personalizada de Nginx si es necesaria
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copiamos los archivos compilados de la aplicación
COPY --from=builder /app/dist/running-strav-ia-web/ /usr/share/nginx/html/
# Exponemos el puerto 80
EXPOSE 80
ENV PORT=80
CMD ["nginx", "-g", "daemon off;"]
