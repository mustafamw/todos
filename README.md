# Todos Task

## Todos API

The task consist of Frontend and Backend.

To install & run Backend API:

```
navigate './todos-api'
```

Prerequisite - Must be installed if you're not using a Docker: 
- MongoDB 
- Node

## Available Scripts
In the project directory, you can run:

If you are using a Docker Container, run the command below:
>docker-compose up

If you are installing a locally, run the command below:

>npm start

The config file ("config/config.js") which contains all the configuration for the application. "npm start" by default uses the development environment.

Will install the package.json and then runs the app. When the app is ready then the Browser will open up the swagger API Docs automatically otherwise visit http://localhost:3000/api-docs/ *unless the config file ("config/config.js") have been changed then refer to the configuration* :
```
{
    'application': {
        'domain': 'localhost',
        'port': 3000
    },
    'swagger': {
        'path': '/api-docs'
    }
}
```

To install & run Frontend App:

```
navigate './todos-app'
```

## Todos App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:3001/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

Github:
https://github.com/webmanic/todos

Live Link:
http://hushtech.co.uk

API Swagger:
http://hushtech.co.uk:3000/api-docs/

