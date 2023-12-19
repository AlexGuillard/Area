# Project Start
## How to use
### Start

You can start the project with the following command:

```bash
docker-compose up -d
```
(you can remove -d to see the logs)

It will start each part of the projects in this order:
- The database
- The backend
- The mobile app
- The web app

After that, you need to setup the database. You must create a `.env` in `server` folder with the following line:

```env
DATABASE_URL="postgresql://[POSTGRES_USER]:[POSTGRES_PASSWORD]@[ADRESS]/[POSTGRES_DB]?schema=public"
```
Where you must replace the following:
- `[POSTGRES_USER]` by the user you want to use to connect to the database
- `[POSTGRES_PASSWORD]` by the password you want to use to connect to the database
- `[ADRESS]` by the adress of the database (in local, it's `localhost:5432`)
- `[POSTGRES_DB]` by the name of the database you want to use

Then, you need install the dependencies of the db. You can do it with the following command:

```bash
cd server && npm install
```

Finally, you can setup the database with the following command:

```bash
npm run db:dev:deploy
```

### Stop

You can stop the project with the following command:

```bash
docker-compose down
```

If you want to remove a specific image (for example, the server), you can do it with the following command:

```bash
docker rmi [IMAGE_NAME]
```
(IMAGE_NAME is the name of the image you want to remove, for example `area-server` for the server, or `area-client_web` for the web app)

You can list all the images with the following command:

```bash
docker images
```
