# Welcome to the backend part for Project 7 of the Web Developer path of Gabriel Delaigue.

## Back end prerequisites

You will need to have Node, npm and MySQL workbench installed locally on your machine.

## Backend installation

If you have not yet cloned the repo, clone it using 
``` git clone https://github.com/InahiDev/P7_Groupomania_backend ```

The DataBase is using MySQL for language and Sequelize as ORM.
You can configure your username & password in the file /backend/sequelize.js in both const USERNAME and const PSWD.
For the migration of the DataBase, run ``` sequelize db:create && sequelize db:migrate ```
The default port of the DB should be 3306, if not, check it on MySQL Workbench and you can change it in the const DB_PORT.

You should now run npm install in the terminal.
You now can run npm run start, nodemon server (if correctly installed) or just node server. The server should now run on localhost with port set on 3000. The console will ensure you the port by displaying the port is listening on. The backend server should now run on the port 3000 by default.

## Routes and Authentification

### User Routes

Before using the entire API, you have to create an account. The routes in charge of account creation, loging and account deletion or reachable at the path /api/auth & each endpoint is:

/signup for creation (POST)
/login for login (POST)
/unsubscribe for account deletion (DELETE)

Once loged in, the server will give you back a token ancrypting your user ID (UUIDv4), your role (admin or not). This token will allow you to access the rest of the API.

### Post routes.

All CRUD operations are settled in the post routes reachable at the path /api/post

Endpoints:

'/' to get all posts (GET)
'/:id' to get the targeted post (GET)
'/' for creation (POST)
'/:id' to update the targeted post (PUT)
'/:id' to delete the targeted post (DELETE)
'/:id/like' to set the like status of the account owner (POST)