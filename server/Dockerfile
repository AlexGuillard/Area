FROM node:20

ENV NODE_ENV development

RUN mkdir common-volume

WORKDIR /usr/src/app/nest-docker

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 8081

CMD ["npm", "run", "start"]

