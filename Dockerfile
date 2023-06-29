FROM node:14.15.1

WORKDIR /app

COPY . .

RUN npm install --only=production

USER node

CMD [ "npm", "start" ]

EXPOSE 3000