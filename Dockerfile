# Etapa de construcción
FROM node:20 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción
FROM node:20-slim
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist/* ./dist/
EXPOSE 8000
CMD ["serve", "-s", "dist", "-l", "8000"]
