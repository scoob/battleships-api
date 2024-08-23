# Project Name
Battleship Calibration Api

## Description
A REST API that provides two operations for calibrating Turrets on a Battleship.

## Table of Contents

- Installation
- Usage
- Contributing
- License

## Dependencies
- yarn 1.2+ | npm 10+
- Node 21+

## Installation
Install required packages
```
yarn
```
alternatively ```    npm install     ```

## Usage
Ensure ```   .env  ``` is in the root and has a 'LOGGING' flag set to 'true'

Start local development server for http://localhost:3000
```
npm run start:dev
```

Run tests
```
npm run test
```
## Choice of technology
- NestJs for scalable Node.js server-side applications.
- Support Typescript
- Usis ExpressJs under the hood

## Decisions & Assumptions
- A rotation counts as a test (No. of tests) therefore there is no accumulation of run tests
- Used a ValidationPipe to validate the '/settings' endpoint and proviode validation to data input
- Did not implement a DB service to store the results due ot time and simplicity of functionality
- Provided logging middleware for requests and responses
- Didnt provide error middleware or filtering to provide concistent error messaging
- Abstracted a Turret out to a Weapon, allowing for multuple 'types' of weapons ie Cannons, Missiles etc: this could allow for a more scalable calibration application with some service updates and factory.
- provided  primitive Logging flag in .env to switch logging on and off
- Provided tests to cover successful and rejected responses which covered service and reporting


## Improvements
- Provide more Error filter/middleware to improve error design and consistency
- Provide DB integration and services
- Create a Ship model and allow allocation of different Weapons/Assets
- Could abstract a Setting out to provide common properties ie. Location etc if more are known
- Logging configuration: currently loggin to the console for 'error', 'warning', and 'general'. Should allow for levels to be set
- Error messaging could be within constants to provide consistency
- Location Enum
- More documentation and tests
- Split validation unit test out to individual tests for better maintainability
- Dockerfile for easier setup and use

