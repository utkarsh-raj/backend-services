# backend-services
CRUD and some async services in JavaScript

Utilises Node.js, Redis and the ExpressJS framework. The MongoDB Atlas Cloud Database service is used for persistence of data. 

The documentation can be found at https://cryptic-lake-79013.herokuapp.com/docs/#!/default/
Can also be built locally by following the instructions:
  - ```cd documentation```
  - ```npm install```
  - ```node index.js```
  - Go to http://localhost:8080/docs/#/default

The application must be built locally to see the APIs in action.
1. Make sure you have node.js installed, to test it run node -v or npm -v on your cmd/terminal. 
2. If node is not installed then, download the installer from https://nodejs.org/en/download/ 
3. Then run the following commands from your cmd/terminal. 
	- ```git clone https://github.com/utkarsh-raj/backend-services.git``` 
	- ```cd backend-services``` 
	- ```npm install``` - To install all the dependencies. 
	- ```node app.js``` - to launch the application.
4. Open localhost:8000 in your browser or Postman and the endpoints can be utilised.

Note: We need the Redis Server built on the local system for the application to work. This is because the Heroku Addon for the RedisToGo services require Credit Card info, which I currently do not possess.
Also Note: We need MongoDB Atlas login credential for the Database, which can be obtained for free for a Development Based Plan from https://www.mongodb.com/cloud/atlas
