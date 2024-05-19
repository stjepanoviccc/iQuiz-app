# build
FROM node:22-alpine3.18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# run
FROM node:22-alpine3.18
WORKDIR /app
COPY --from=builder /app ./
RUN npm install
RUN apk add --no-cache \
    build-base \
    python3
RUN npm rebuild bcrypt --build-from-source
EXPOSE 3000
CMD ["npm", "start"]