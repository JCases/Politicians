FROM node:20

WORKDIR /usr/src/app/my-app

COPY package*.json ./

RUN npm install

EXPOSE 3010

CMD ["npm", "start"]