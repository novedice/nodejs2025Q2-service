FROM node:24.10.0

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install 

COPY . .

CMD ["npm", "run", "start"]