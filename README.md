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

After that, you need to setup the database. You must create a `.env` in `db` folder with the following content:

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
cd db && npm install
```

Finally, you can setup the database with the following command:

```bash
npm run dev:deploy
```
