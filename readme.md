# Realtime Dashboard
This is my playground to learn about streaming technologies.  This bench project also aims to technically showcase that it is possible to link up different technologies to build a realtime dashboard to show analysis results. 

The technologies/tools/libraries/frameworks that will be involved are:
- Web Development: Angular, Angular Material, Socket.io, Express, JWT authentication. 
- - (Will try SocketCluster and Vue.js later since I see them as better alternatives to Socket.io and Angular)
- Distributed Streaming Platform: Apache Kafka
- Distributed Data Processing: Apache Spark

## Current Features
It has been quite a while since the last time I did web development (5 years!!) so it took some time to get up and running. The current features of this project are:
- Authentication using JWT to improve authentication approach and better support for non-browser clients. 
- - The user store is still mocked using a list of users in JSON format.
- Separation of authentication service and the analytics service. The purpose it to let them scale independently later on.
- Angular Material and Ngx Charts for good user interface and easy visualisation update on data changes.
- Realtime WebSockets using Socket.io for realtime UI updates. The access to it has  also been secured using JWT .
- API services connected to Kafka to push data (unsecured)
- Local Spark connected to dockerized Kafka.

## Future Features 
- Multiple metrics or data sets
- Dockerization of services

## Stretch goal: 
- Authentication against a database + role-based access.
- Create a simple prediction model, serve a prediction service and use the dashboard to display prediction results.

## How to Use
### Start Dockerized Streaming Services
I'm using some publicly available docker images for Kafka and Spark:
- Kafka
- - https://hub.docker.com/r/wurstmeister/kafka/
- - https://hub.docker.com/r/wurstmeister/zookeeper/
- Spark
- - https://hub.docker.com/r/bde2020/spark-master/
- - https://hub.docker.com/r/bde2020/spark-worker/

The Kafka service needs to be started before the analytics API since it depends on Kafka. Make sure you have docker installed and running before doing the following (assuming that you're in the project root folder):
`docker-compose up`

### Start API Services
There are 2 APIs: Authentication and Analytics. Both are developed using ExpressJS and are in and api-auth-express and api-analytics-express respectively. Make sure you have NodeJS and NPM installed before you do the following

Go to the `api-auth-express` folder and start the service (will be on port :3001)
`cd api-auth-express`
`npm install`
`PORT=3001 nodemon`

Open a new terminal, go to the `api-analytics-express` folder, and start the service (will be on port :3000)
`cd api-analytics-express`
`npm install`
`PORT=3000 nodemon`

### Start UI Services
Open a new terminal, go to the `ui-dashboard-angular` and start the service (will be on port :4200)
`
npm install -g @angular/cli
cd ui-dashboard-angular
npm install
ng serve
`

## Project/Subproject Naming Convention
Just an idea to name projects and subprojects. The naming convention is as follows:
[module-name/project-name]-component-function-[version]-[technology]

Examples:
- api-auth-express
- api-auth-restify
- ui-dashboard-0.1
- api-socket-0.7-socketcluster

Other example with example projects:
- shell-oilwell-predictions/stream-messaging-0.3-kafka
- walmart-store-analysis/stream-analytics-0.1-spark
- poc-project-name/api-socket-0.1-socketcluster