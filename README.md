# IE-Library-Case
Setup and Running the Project
1. Clone the Repository
First, clone the project to your local machine:


git clone https://github.com/furkanmeydan/ie-library-case.git
cd ie-library-case

2. Environment Variables
The necessary environment variables can be configured in the docker-compose.yml file. This file contains settings for the PostgreSQL database and the application.

3. Run the Services with Docker Compose
To start all services using Docker Compose, run the following command:

docker-compose up -d
This command will start the following services:

PostgreSQL: Database service (localhost:5432).
pgAdmin: PostgreSQL management interface (localhost:5050).
Node.js Application: The library management system (localhost:3000).


if you want to build application without docker services then:
- run "npm run build" and "npm run start" after db connection done in source code