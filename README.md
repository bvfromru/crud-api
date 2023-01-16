# Simple CRUD API
Node JS RS School's course, third task

## Simple CRUD server app built with Node.js & Typescript

[Link to the assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

### How to run

- Please clone this repository
- Go to app folder `cd simple-crud-api`
- Run `npm i` to install the dependencies
- Rename file `.env.example` to `.env` and edit the value of PORT variable.
For example, you can set it to `PORT=4000`

Use the following scripts:

- `npm run start:dev` to start the server app in development mode;

- `npm run start:prod` to build bundle and start it in production mode;

- `npm run start:multi` to run the app in multi thread mode with load balancer;

- `npm run test` to run tests;

### Endpoints

- GET `api/users` is used to get all users

- GET `api/users/${userId}` is used to get particular user by ID

- POST `api/users` is used to create record about new user and store it in database

- PUT `api/users/${userId}` is used to update existing user

- DELETE `api/users/${userId}` is used to delete existing user from database

### How to test

Use [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to send HTTP requests.

In the root folder you can find file with Postman collection `postman_collection.json` - you can import it to Postman to simplify your testing.

Default URL will be `http://localhost:4000/api/users`

If you have any questions about the App, you can always find me in Discord Vitaliy (bvfromru)#4741
