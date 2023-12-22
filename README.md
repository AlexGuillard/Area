# Project Start
## How to use
### Start

You need to have [Docker](https://www.docker.com/) installed on your computer.

You also need to have a `.env` file in the root folder of the project with the following lines:

```env
POSTGRES_USER=The user you want to use to connect to the database like 'postgres'
POSTGRES_PASSWORD=The password you want to use to connect to the database like '123'
POSTGRES_DB=Name of the database you want to use like 'nest'
SERVER_URL=Url of the server like 'http://localhost:8080'
WEB_URL=Url of the web app like 'http://localhost:8081'
GOOGLE_CLIENT_ID=Your GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=Your GOOGLE_CLIENT_SECRET
```

You can start the project with the following command:

```bash
docker-compose up [-d] [--build]
# -d to run it in background
# --build to rebuild the images rather that running build each time
```
(you can remove -d to see the logs)

It will start each part of the projects in this order:
- The database
- The backend
- The setup of the database using a backend image
- The mobile app
- The web app

### Stop

You can stop the project with the following command:

```bash
docker-compose down
# or if you want to remove it clean
docker-compose down --volumes --remove-orphans
```

### Update images

You can update the images of the project with the following command:
(don't forget to stop the project before [Stop](#stop))

```bash
docker-compose build
```

### Clean images

You can clean the images of the project with the following command:

```bash
docker image prune
```

It will remove all the images that are not used by a container like `<None>` images.
