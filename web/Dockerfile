FROM node:21-alpine

COPY . .

RUN npm ci

EXPOSE 8081

RUN mkdir common-volume

CMD ["npm", "start"]
