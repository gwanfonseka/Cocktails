# INITIAL REQUIREMENT

[https://www.thecocktaildb.com/] - please use cocktail api from this site, you don't need to pay any fee to access these api

## Features

### Feature 1 - Home
- When user arrives on home page, user can view 5 random cocktails on home page - [Completed]
- Every cocktail will contain cocktail name, cocktail image, category - [Completed]
- User can click a "Refresh" button on this page to get another 5 random cocktails - [Completed]

### Feature 2 - Search
- User can search for a cocktail and add it to favourites list - [Completed]
- The search result will contains cocktail name, cocktail image and "Add" button - [Completed]
- Press "Add" button will add the cocktail to Favourites list - [Completed]

### Feature 3 - Favourites
- User will see a list of favourites cocktails - [Completed]
- User will see cocktail name, cocktail image and "Remove" button - [Completed]
- User can remove a cocktail from favourites list - [Completed]

## Unit tests
- Please include unit tests for the new features - [Incompleted]

Note on this point - Testing has been done and automated with Cypress. Check below for instructions to run the tests. Unit testing couldn't be done since I only have some basic
knowledge in Jest. This is something I want to learn with AMUSED group. I would like to put some extra effort and extra time to learn this part if I get a chance.

## Bonus
- Responsive web application - [Completed]
- Add any [additional] feature which gives better user experience

## Additional Features
- Notifications have been developed for user actions
- Additional page developed to display cocktail's details when user click on a cocktail
- Quality, cleanliness and consitancy of the code has been checked with [ESLINT]
- Automated test cases with [Cypress]

# INSTRUCTIONS

## Run the application
- `npm install` - install dependancies
- `npm start` - run application

## ESLINT
- `npm run esliint` - run ESLINT (standards applied in .eslintrc.js)

## Cypress
- `npm run cypress:open` - run cypress automated test cases
- Choose `E2E Testing`
- Click on `Start E2E testing`
- 2 specs have been written and configured - run both (application should be running when you execute the test cases)

Auther - Nimesh Fonseka | gwanfonseka@gmail.com | +94779766240