FROM node:21-alpine

# COPY . .

# RUN npm ci

# EXPOSE 8081

# RUN mkdir common-volume

# CMD ["npm", "start"]

RUN mkdir common-volume

WORKDIR /usr/src/app/react-docker

COPY package*.json ./

RUN npm install

EXPOSE 8081

CMD ["npm", "start"]

