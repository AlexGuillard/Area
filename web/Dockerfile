FROM node:21-alpine

COPY . .

RUN npm install

EXPOSE 8081

RUN mkdir common-volume

CMD ["npm", "start"]
