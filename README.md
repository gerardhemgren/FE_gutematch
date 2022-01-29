#  gutematch
A CRUD web-app for set and join soccer games with other players, to be disputed in real life.

The logic and control of the games are conditioned from the database.
The project was made in PostgreSQL (with constrains, functions and views), then the APIs in Node with Express.
After the UI with React was initialized, auth service followed. 
When Router was settled, new hook were and will be added for refactoring, cleaning the way for a the state management.

## Authorizations with Auth0 service
Users can log-in from google or an auth0 account. For first time it auto signs up.
There's a preview log-in as a "guest user", it works as a universal user.

**To improve:** The session expires when client refresh the page.\
**Fake solution:** The user's id is holded in the local storage.

## Front-End made with React js
App starts first waiting for auth0, and then asking if there is an user (**isAuthorized**: this is true when logIn/signUp. At 'refresh' isAuthorized is false (user is lost from auth0)) but then asks if it there's a record for the playerId at local storage, and finally decides the games and options available from the guest/registered user.

## Hooks: useState, useEffect, useContext
To have the player ID in the local storage and in the database, once the user call the `loginWithRedirect` method from auth0, then the provided user's info will be available to be called by the `logIn_signUp` API service inside the useEffect.

There is another switch called `renderSwitch` used to re-render the app when it needed. Like when the user joins or creates a game, is redirected to his games component, or when the user deletes or leaves a game, is still at 'my games' component.\
Also to navigate between routes.

useContext is used to communicate the playerIid across the whole app.

## Router with react-router
The app router controls the components to be displayed in the main container like: the games acceded, the form to create a game and the profile section, and also manage the UI if an user is loged or not.

## Dates managing with Dayjs
All the games dates are formatted, manipulated and work with time-zone by day.js library.\
It also auto update the value of the input-date max param at GameForm component.

## Hosted at Firebase.
Firebase deploy the build folder.

## App also uses:
CSS (flex & Grid) precompiled with SASS.\
SVG icons.\
Axios for rest API calls.\
A Modal feature reusing a component with props, switch case, api services, etc.\
**To improve:** Already API messages will be shown when a store or global context is setted.

## Design:
Was made in Adobe Xd, animations and transitions will be added soon.


## Commits:
Are detailed at [Commits](Commits)
