# Weather and Todo App

This app uses the open weather api to fetch the current weather and 5 day forecast for New York. I also allows users to create, delete, edit, and mark todos as completed
## Tech Stack

Tech Stack: React.js, TailwindCSS, Express, Sequeilze, Postgres

## Getting Started

First clone repo to your local machine. Get a weather api key at https://openweathermap.org/. And lastly get a postgres database setup

## Get running on local

### Install dependencies need for server

```
cd server
npm install
```

### Connect Database
Create a .env and put your database url with the variable DATABASE_URL. Use .env.example to reference. Make sure .env is in root 

```
touch .env
```
### Update your database

```
npx seqeulize:db migrate
```

### Run Server

```
node server.js
```

### Install dependencies need for Frontend

```
cd client/my-react-app
npm install
```

### Connect Server and Weather API
Create a .env and put your weather api key with the variable VITE_API_KEY. Then put the server url as VITE_SERVER_URL. Use .env.example to reference. Make sure .env is in root 

```
touch .env
```

### Run Client

```
npm run dev
```





