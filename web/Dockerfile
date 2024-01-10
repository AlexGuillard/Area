FROM node:20

ENV NODE_ENV development

RUN mkdir /common-volume

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ln -s /common-volume/app-release.apk ./public/client.apk

EXPOSE 8081

CMD ["npm", "start"]

