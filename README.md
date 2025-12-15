# Home Library Service
## REST service: Logging & Error Handling and Authentication and Authorization

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js >=24.10.0 - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- Docker Hub account (for pulling images, optional if using prebuilt images)

### 1. Clone the repository  
## Downloading

```
git clone https://github.com/novedice/nodejs2025Q2-service.git
```
## Changing branch

```
git checkout development
```

## 2. Environment configuration
### 2.1 Create .env file
```
cp .env.example .env
```

### 2.2 Update .env file

⚠️ IMPORTANT

When running the application locally via Docker, update DATABASE_URL:
```
# DATABASE_URL="postgresql://user:password@db:5432/home_library"
DATABASE_URL="postgresql://user:password@localhost:5432/home_library"
```

All other variables can remain unchanged.

  
### 3. Run the application

The application and database will be built and run locally.
```
docker-compose up --build
```

*Docker Configuration*  

 - Application: built locally from Dockerfile
 - Database: PostgreSQL 16
 - Network: user-defined bridge network
 - Volume: postgres_data for persistent database storage
 - Restart policy: unless-stopped  

  
### 4. Verify containers are running*  
```
docker ps
```

home-library-app-nodejs2025q2 — Application container

database-nodejs2025q2 — PostgreSQL container

  
## 5. Apply database generate

```
npx prisma generate
```
  
## 6. Apply database migrations
  
apply Prisma migrations to create the necessary tables:
```
npx prisma migrate deploy
```
  
After starting the app on port (4000 as default)
The app doc will be available at: http://localhost:4000/doc
  
## 7. Testing
Authorization test
```
npm run test:auth
```
  
## 8. Logging & Error Handling
  
Implemented features:

 - Custom LoggingService
 - Logging levels based on NestJS (log, error, warn, debug, verbose)
 - Logging of:
    - request URL
    - request body
    - query parameters
    - response status code

 - Logs are written to files
 - Log file rotation by size (configurable via environment variables)
 - Separate logging for error-level messages
 - Global ExceptionFilter for handling HTTP and unexpected errors
  
## 9. Authentication & Authorization

 - POST /auth/signup
 - POST /auth/login
 - POST /auth/refresh
 - Passwords are stored as hashed values
 - JWT Access Tokens:
 - Payload contains userId and login
 - Secret key stored in .env
 - Authentication required for all routes except:
    - /auth/signup
    - /auth/login
    - /auth/refresh
    - /doc
 - Custom middleware checks JWT for protected routes

## 10. API Endpoints

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

 - The project is fully Dockerized
 - Database runs in a container
 - Prisma ORM manages schema and migrations
 - Environment variables are required for correct startup
