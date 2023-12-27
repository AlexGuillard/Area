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
DISCORD_CLIENT_ID=Your DISCORD_CLIENT_ID
DISCORD_CLIENT_SECRET=Your DISCORD_CLIENT_SECRET
DISCORD_REDIRECT_URI=Your redirect url from the Redirects in the applications of Discord
PGADMIN_DEFAULT_EMAIL=Email of the pgadmin user like 'admin@admin.com'
PGADMIN_DEFAULT_PASSWORD=Password of the pgadmin user like '123'

```

You can start the project with the following command:

```bash
docker-compose up -d
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
```

### Update images

You can update the images of the project with the following command:
(don't forget to stop the project before [Stop](#stop))

```bash
docker-compose build
```

### PgAdmin

You can access the pgadmin interface at the following url: http://localhost:8083
You must connect with the email and password you set in the `.env` file.
After that you can add a new server with the following informations:
- Name: `It can be anything`
- Host name/address: `db`
- Port: `5432`
- Username: `It should be defined in the .env file as POSTGRES_USER`
- Password: `It should be defined in the .env file as POSTGRES_PASSWORD`
