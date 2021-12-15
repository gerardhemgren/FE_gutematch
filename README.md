#  gutematch
A CRUD web-app for make and join in matches with other players, to be disputed in real life.

The logic and control of the match is conditioned from the database.

## Authorizations with Auth0 service
Unauthorized users can only see the list of future matches which players were joined.
**To improve:** There will not be an unauthorized user view, it will be replaced by the universal user.\

Users can log-in from google or an auth0 account. For first time it auto signs up.
There's a preview log in as a "guest user", it works as a universal user.

**To improve:** The session expires when client refresh the page.\
**Fake solution:** The user's id is holded in the local storage.

## Front-End made with React js
App starts first waiting for auth0, and then asking if there is an user (**isAuthorized**: this is true when logIn/signUp. At 'refresh' isAuthorized is false (user is lost from auth0)) but then asks if it there's a record for the playerId at local storage, and finally decides if shows the matches and options available from a registered user.

## Hooks: useState and useEffect
To have the player ID in the local storage and in the database, once the user call the `loginWithRedirect` method from auth0, then the provided user's info will be available to be called by the `logIn_signUp` API service inside the useEffect.

There is another switch called `renderSwitch` used to re-render the app when it needed. Like when the user joins or creates a match, is redirected to his matches component, or when the user deletes or leaves a match, is still at 'his matches' component.\
Also to navigate between routes.

## Router with react-router
There are two routers, the first layer provided by auth0, and the next layer is the app router that controls the components to be displayed in the main container like: the matches acceded, the form to create a match and the config section.

## Dates managing with Dayjs
All the matches dates are formated and manipulated by dayjs library.\
It also auto update the value of the input-date max param.

## Hosted at Firebase.
Firebase deploy the build folder.

## App also uses:
CSS (flex) precompiled with SASS and SVG icons.\
Axios for rest API calls.\
**To improve:** Already API messages (not only errors) will be shown when a store or global context is setted.

## Design:
Was made in Adobe Xd, animations and transitions will be added soon.
