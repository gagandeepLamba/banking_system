FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npm run dev"]
