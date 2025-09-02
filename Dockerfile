FROM node:24-alpine

WORKDIR /versenyauto

ENV NODE_ENV=development

# Package-ok másolása
COPY package*.json ./

RUN npm install

# Projektfájlok másolása
COPY . .
COPY src/db/migrations ./src/db/migrations

# TypeScript build (dist mappa létrehozása)
RUN npm run build

RUN mkdir -p dist/db/migrations
COPY src/db/migrations ./src/db/migrations

# Port megnyitása
EXPOSE 3000

# Node a buildelt JS fájlt indítja
CMD ["node", "dist/app.js"]
