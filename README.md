# Home Library Service
## REST service: Containerization and Database (PostgreSQL) & ORM

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js >=24.10.0 - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- Docker Hub account (for pulling images, optional if using prebuilt images)

### 1. Clone the repository  
## Downloading

```
git clone {https://github.com/novedice/nodejs2025Q2-service.git}
```
## Changing branch

```
git checkout development
```

### 2. Create .env file
```
mv .env.example .env
```

### 3. Run the application

- If you want to use prebuilt Docker Hub images:
```
docker-compose up
```

- If you want to rebuild the images locally:
```
docker-compose up --build
```


*Docker Configuration*  

- Application image: novedice/home-library:latest

- Database image: novedice/database-postgres:latest

- Containers are connected through a user-defined bridge network app-network.

- Database files are stored in a Docker volume: postgres_data.

- Containers automatically restart if they crash (restart: unless-stopped).

### 4. Verify containers are running*  
```
docker ps
```
  
home-library-app — Application container

database — PostgreSQL container
  

After starting the app on port (4000 as default)
The app will be available at: http://localhost:4000

### 5. Testing

- To run tests inside the container:
```
docker exec -it home-library-app npm run test
```

- Or you can run it after installing node modules
```
npm install
npm run test
```

## API Endpoints

### Users
- `GET /user` — Get all users  
- `GET /user/:id` — Get user by id  
- `POST /user` — Create a new user  
- `PUT /user/:id` — Update user password  
- `DELETE /user/:id` — Delete user  

### Artists
- `GET /artist` — Get all artists  
- `GET /artist/:id` — Get artist by id  
- `POST /artist` — Create a new artist  
- `PUT /artist/:id` — Update artist  
- `DELETE /artist/:id` — Delete artist  

### Albums
- `GET /album` — Get all albums  
- `GET /album/:id` — Get album by id  
- `POST /album` — Create a new album  
- `PUT /album/:id` — Update album  
- `DELETE /album/:id` — Delete album  

### Tracks
- `GET /track` — Get all tracks  
- `GET /track/:id` — Get track by id  
- `POST /track` — Create a new track  
- `PUT /track/:id` — Update track  
- `DELETE /track/:id` — Delete track  

### Favorites
- `GET /favs` — Get all favorites  
- `POST /favs/track/:id` — Add track to favorites  
- `DELETE /favs/track/:id` — Remove track from favorites  
- `POST /favs/album/:id` — Add album to favorites  
- `DELETE /favs/album/:id` — Remove album from favorites  
- `POST /favs/artist/:id` — Add artist to favorites  
- `DELETE /favs/artist/:id` — Remove artist from favorites  
  

Notes

- No local PostgreSQL installation is required — the database runs inside a Docker container.
- Prisma ORM handles migrations and data access.
- All database connection variables are stored in .env.
