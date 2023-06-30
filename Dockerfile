FROM node:14.15.1

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . /app/

USER node

CMD [ "npm", "start" ]

EXPOSE 3000