# MEAN Stack Authentication with JWT example

Angular example using JWT authentication with Node.js and MongoDB.

## Stack

* Node.js
* ExpressJS
* MongoDB
* Angular 9
* Angular Material

## Features

* JWT - access Token
* JWT - refresh Token (when access Token is an expired we get new one by refresh Token)
* Signup
* Login
* Authentication Guard

## Development

### Environment variables

Before staring the server you need to configure environment variables.

1. Go to **server** directory
1. Copy **.env.example** to **.env** file
1. Change the values in **.env** file
1. If you chane the port of the server you need to change also the port in angular project in **client/src/environments/environment.ts**

### Install

Install client dependencies

```bash
cd client && npm install
```

Install server dependencies

```bash
cd server && npm install
```

### Run

To run client Angular app (will run at localhost:4200)

```bash
cd client && npm start
```

To run server (will run at localhost:8080)

```bash
cd server && npm start
```
