FROM node:18-alpine
WORKDIR /node_app
COPY package*.json ./
RUN npm ci --omit=dev --force
COPY . .
EXPOSE 8080
CMD ["npm", "run", "startProd"]