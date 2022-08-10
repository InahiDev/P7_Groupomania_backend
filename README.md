# Welcome to the backend part for Project 7 of the Web Developer path of Gabriel Delaigue.

## Back end prerequisites

You will need to have Node, npm and MySQL workbench installed locally on your machine.

## Backend installation

If you have not yet cloned the repo, clone it using 
``` git clone https://github.com/InahiDev/P7_Groupomania_backend ```

The DataBase is basically using MySQL for language and Sequelize as ORM.</br>

For the migration of the DataBase, go on MySQL Workbench and select Administration > Data Import/Restore</br>
Select option "Import from Self-Contained File" and select the groupomania.sql file located in the root directory</br>

You should now run ```npm install``` in the terminal. It will install dependecies and package the server needs.</br>

### Dotenv variables
The entire project uses environmental variables in order to pass some informations and configure interactions.</br>
You can configure your username & password in the file /backend/sequelize.js directly or use .env file to set these.</br>

Your username should be saved in ```DB_USERNAME```</br>
The password related to it should be saved in ```DB_PSWD```</br>
The port where your database is running should be saved in ```DB_PORT```</br> The default port of the DB should be 3306, if not, check it on MySQL Workbench and you can change it in the .env file.
The dialect for configuration is saved under ```DB_DIALECT```</br>
The port you want your server to run on, is settled by the environment variable ```PORT```</br>
The last environment variable you should set up is the encryption key for the token system of authentification. This value is set in ```TOKEN_KEY```</br>

## Starting server

You now can run npm run start, nodemon server (if correctly installed) or just node server. The server should now run on localhost with port set on 3000.</br>
The console will ensure you the port by displaying "Listening on port XXXX". The backend server should now run on the port 3000 by default.

## Routes and Authentification



### User Routes

Before using the entire API, you have to create an account. The routes in charge of account creation, loging and account deletion or reachable at the path ```/api/auth``` & each endpoints are :</br>

#### Endpoints :
```/signup``` for creation (POST)</br>
```/login``` for login (POST)</br>
```/unsubscribe``` for account deletion (DELETE)</br>
</br>
Once loged in, the server will give you back a token ancrypting your user ID (UUIDv4), your role (admin or not). This token will allow you access to the rest of the API.</br>

### Post routes.

All CRUD operations are settled in the post routes reachable at the path ```/api/post``` & each enpoints are :</br>

#### Endpoints :

```/``` to get all posts (GET)</br>
```/:id``` to get the targeted post (GET)</br>
```/``` for creation (POST)</br>
```/:id``` to update the targeted post (PUT)</br>
```/:id``` to delete the targeted post (DELETE)</br>
```/:id/like``` to set the like status of the account owner (POST)</br>