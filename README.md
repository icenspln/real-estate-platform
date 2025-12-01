## Real estate platform

#### Description

API for managing the backend of a real estate listing platform, where users can signup, and login either as a guest or an agent, and see the platform's listed properties and details.

The goal is basic, to allow users with the "agent" role to create, manage and publish their properties, and allows guest to see those published properties, and to allow users with "admin" role to manage all the platform's resources.

#### Features

- dockerized architecture
- authentication and authorization with JWT
- role based access control system
- dependency injection approach
- proxied api (nginx)

#### Overview
<img width="701" height="436" alt="overview" src="https://github.com/user-attachments/assets/c6221f29-812c-4546-a68a-5767ba135251" />


#### Start

Make sure docker is installed and running, run `docker compose up --build -d` or `docker compose up --build` to see the logs.

- `compose.yml` has 3 services, proxy, api & a postgres database
- `proxy` folder contains the dockerfile and nginx config file
- starting point is `api/server.js`
- the first admin is initialized using a secret token in the `api/.env` file (create one), and the `/api/bootstrap/admin?token=<token>` endpoint, after the first admin is created, the endpoint is disabled
- all the endpoints can be found in `api/routes`
- make sure there is `api/static` directory before you upload static files/images
