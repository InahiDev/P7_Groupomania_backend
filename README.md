# Welcome to the backend part for Project 7 of the Web Developer path of Gabriel Delaigue.

## Back end prerequisites

You will need to have Node, npm and MySQL workbench installed locally on your machine.

## Backend installation

If you have not yet cloned the repo, clone it using 
``` git clone https://github.com/InahiDev/P7_Groupomania_backend ```

The DataBase is using MySQL for language and Sequelize as ORM.</br>
You can configure your username & password in the file /backend/sequelize.js in both const USERNAME and const PSWD.
For the migration of the DataBase, run</br>
``` sequelize db:create && sequelize db:migrate ```</br>
The default port of the DB should be 3306, if not, check it on MySQL Workbench and you can change it in the const DB_PORT.

You should now run npm install in the terminal.</br>
You now can run npm run start, nodemon server (if correctly installed) or just node server. The server should now run on localhost with port set on 3000.</br>
The console will ensure you the port by displaying the port is listening on. The backend server should now run on the port 3000 by default.

## Routes and Authentification

### User Routes

Before using the entire API, you have to create an account. The routes in charge of account creation, loging and account deletion or reachable at the path ```/api/auth``` & each endpoints are :</br>
</br>
```/signup``` for creation (POST)</br>
```/login``` for login (POST)</br>
```/unsubscribe``` for account deletion (DELETE)</br>
</br>
Once loged in, the server will give you back a token ancrypting your user ID (UUIDv4), your role (admin or not). This token will allow you access to the rest of the API.</br>

### Post routes.

All CRUD operations are settled in the post routes reachable at the path ```/api/post``` & each enpoints are :</br>

#### Endpoints:

```/``` to get all posts (GET)</br>
```/:id``` to get the targeted post (GET)</br>
```/``` for creation (POST)</br>
```/:id``` to update the targeted post (PUT)</br>
```/:id``` to delete the targeted post (DELETE)</br>
```/:id/like``` to set the like status of the account owner (POST)</br>