Light House Labs - Midtern Project - Schoodle
=========

## Description

How many times have you needed to plan a meeting, party or event but run into trouble determining when everyone is available? It can be very difficult keeping everyone's availability stright. 

Schoodle solves this problem!

Schoodle is an event coordination application the lets users create events with a number of proposed times and dates. Other users can then vote on each proposed time to indicate their availabilty; either Yes, No or Maybe. The event host can then use this information to determine the most appropiate time to schedule it.

There are no user accounts needed to use the application. Anyone can create an event or vote on an existing event if they have the event URL. Each event is created and hosted at a randomly generated URL so the event host can share it only with their intended invitees. 

The application assigns sessions to keep track of uniquiqe vistiors and enable users to revisit event pages to change their availabily.

Responsive elementes have also been included to allow the application to be used from a variety of screen sized. 

## Final Product

!["Small Screen View"](https://raw.githubusercontent.com/jeff-sexton/tweeter/master/docs/Tweeter-Small-View.png)
!["Desktop View"](https://raw.githubusercontent.com/jeff-sexton/tweeter/master/docs/Tweeter-Desktop-View.png)
!["UI Demo"](https://raw.githubusercontent.com/jeff-sexton/tweeter/master/docs/Tweeter-UI.gif)

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Express
- Ejs
- dotenv
- body-parser
- chalk
- cookie-session
- moment
- morgan
- node-sass-middleware

## Development Dependencies

- nodemon

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Possible Future Features

- Allow user subscription to event updates
- Automatically email any subscrbed users when changes are made
- Connect to social media APIs to allow an event creator to invite guests through these channels
- Add error feedback to the user by rendering it client side with DOM manipulation
- Allow users to list all events they have created and voted on
- Allow event creators to edit event details and add/remove possible event times after event creation
- Allow more event customization by allowing event creators to add images for the event
- Allow the creation of permanent user accounts with sign on/off functionality
- Improve user time zone handling by allowing users to select their current time zone for event time localization




