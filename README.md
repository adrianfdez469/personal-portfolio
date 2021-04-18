# Personal Portfolio

The idea is facilitate a digital tool where profesionals can create there own personal portfolios, and put it online.

## Developers guide:

### Run the app locacly

To run the app localy in your machine, you should create a env.local file, with all the global variables specifies on the env.local.example file.

### Database

There are two forms to run the database

- Via docker container
- Installed on your machine

#### The Docker way:

> Docker must be installed to do this:
> Create an `.docker.env` file with the enviroment variables of the `.docker.env.example` file. These will be used for crating the database in a docker container. Be aware: the variables must match with on the DATABASE_URL of .env file.
> After this, open a terminal and go to the root of the project and run `docker-compose up -d`
> Run: `npx prisma migrate dev --preview-feature` for updating the migrations on the database (every time the prisma schema changes). This is mandatory after creating the database. This will use the DATABASE_URL eviroment variable of .env file.
> You will be able to connect to the database through port 5434

#### The Postgres installation way

Install postgress on your machine and create a database. You can use this scrpipt:

```sql
  CREATE DATABASE new_db
  WITH ENCODING = 'UTF8';
```

Run: `npx prisma migrate dev --preview-feature` for updating the migrations on the database (every time the prisma schema changes). This is mandatory after creating the database. This will use the DATABASE_URL eviroment variable of .env file.

### IDE specifications

Also we recomend to use VSCode with ESLint and Prettier pluggins installed to follow along with our airbnb coding patterns.

### Framework used

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Local enviroment

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
