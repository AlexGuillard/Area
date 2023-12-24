FROM node:20

ENV NODE_ENV development

RUN mkdir common-volume

WORKDIR /usr/src/app/react-docker

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "start"]

