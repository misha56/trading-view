FROM node:20

WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

ENTRYPOINT ["npm", "start"]
