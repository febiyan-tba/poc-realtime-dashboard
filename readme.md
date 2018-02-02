# Realtime Dashboard
This project aims to technically showcase that it is possible to link up different technologies to build a realtime dashboard to show analysis results. This is also my playground to learn about them. 

The technologies/tools/libraries/frameworks that will be involved are:
- Web Development: Angular, Angular Material, Socket.io, Express, JWT authentication. (SocketCluster and Vue.js later since they look more promising)
- Distributed Streaming Platform: Apache Kafka
- Distributed Data Processing: Apache Spark

## Current Features
It has been quite a while since the last time I did web development (5 years!!) so it took some time to get up and running. The current features of this project are:
- Authentication using JWT to improve authentication approach and better support for non-browser clients. The user store is still mocked using a list of users in JSON format.
- Separation of authentication service and the analytics service. The purpose it to let them scale independently later on.
- Angular Material and Ngx Charts for a good user interface and easy visualisation update on data changes.
- Realtime WebSockets using Socket.io for realtime UI updates. It also has been secured using JWT for a secure access.

## Future Features 
- API services connected to Kafka to push data
- Kafka connected to Spark to process aggregations
- Multiple metrics or data sets
- Dockerization of services

## Stretch goal: 
- Authentication against a database + role-based access.
- Serve a prediction service and use the dashboard to display prediction results. I'm still trying to figure out the recommended approach.

## How to Use
Since most of the services/apps now are using Node.JS, do `npm install` in most subprojects and use `PORT=XXXX nodemon`, `node app.js`, or `ng serve` to start the apps.

## Project/Subproject Naming Convention
The naming convention is as follows:
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