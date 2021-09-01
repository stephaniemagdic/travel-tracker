# [Travel Tracker](https://stephaniemagdic.github.io/travel-tracker/) 
  ####Click to view deployed site.

#### [Project Spec](https://frontend.turing.edu/projects/travel-tracker.html)

##### Week 12 (Mod2) at Turing School of Software and Design

## Project Description

Travel tracker is a web application that allows a user to navigate to their unique account, book, manage and track different their travel data.

Run the application and spin up a local server to walk through a mock login, fetch mock user data and make travel plans! 

This project:
  - implements the fetch API to access data from a local server.
  - uses the Fetch API to make network requests to API endpoints in order to retrieve data.
  - uses the Fetch API to post new data to the server
  - uses a robust test suite that accounts for user error 
  - implements error handling for edge cases while loggging in and booking a trip
  - has an accessibility lighthouse score of 100%
 
### Built-By:

* [Stephanie Magdic](https://github.com/stephaniemagdic)

### Technologies Used 

* JavaScript (ECMAScript 2009)
* HTML5
* CSS
* Express
* Node
* NPM packages/dependencies: 
  * [glide.js](https://glidejs.com/)
  * [day.js](https://www.npmjs.com/package/dayjs)
  * [Webpack](https://www.npmjs.com/package/webpack): a helpful developer tool (npm package we install as a dev dependency)
  * ESLint
* Mocha test framework and Chai TDD assertion library

### Architecture

* dist directory
  * [bundle.js](https://www.simplethread.com/javascript-modules-and-code-bundling-explained/): our minified file that webpack creates for our browser!
  * index.html 
* src directory
  * ES6 class files
    * Class Structure Example:
      * agency.js: xxx 
      * trip.js: xxx 
      * destination.js: xxx 
  * scripts.js: holds the application logic, including fetching data from our local server and manipulating the dom.
* test directory
* README.md

## Instructions for running and viewing

### Set-up:

Note: You must run both your local server and the fitlit application at the same time to use this application. This project is also deployed [here](https://stephaniemagdic.github.io/travel-tracker/).

#### Step 1: Run your local server.
  * Go to the [travel tracker API](https://github.com/turingschool-examples/travel-tracker-api) and follow the instructions in the README.md to run your local server.
  * Make sure that the server is running in your terminal by checking that you see the following message in your terminal. `Travel Tracker is now running on http://localhost:3001 !`
#### Step 2: Run the travel tracker application/client.
  * You can access the travel tracker by `cloning this repository`, navigating to and `opening up your terminal`, and running the command `npm start` in your cloned project directory. This will run the bundle.js file, which will compile and run the application.
  * You should see the following message in your terminal: `running at http://localhost:8080/`
  * Copy and paste this url link (`http://localhost:8080/`) in your browser to view the application. 
  
`Note`: Make sure to run `npm install` in your terminal after cloning the repository to install dependencies needed for the application to run!

### How to Navigate the application:  
  
* **Login Page:**  
  * From the login page, use the following credentials to fly into the site.
    * Username: traveler50 (or any other number between 1 and 50) 
    * Password: travel

* **Travel Data:**  
  * See all past, current, future, pending trips, and total yearly expenses
    * Note: pending and unnaproved trips are not included in the past trips or yearly expenses.

* **Book a Trip:** 
  * Use the bookings form to choose a starting date, number of days you'd like to book your trip for, the number of travelers and the location.
  * Trips are calculated by the estimated lodging cost (usually holds about 6), otherwise doubled, and the total air travel cost. Remember the travel cost will be added to the total for every flyer! 
  * You can search for destinations using the search input which will `filter` through all 50 destinations and display only the destinations that match your input criteria!
  * You can also click on a destination to populate the input so you can then use that destination in your trip request!

* **See Pending Trips!:**  
  * Once you submit a request, navigate back to your travel data to see your pending trip!


### Snapshot Examples of Responsive Design & Feature Highlights
 ###### Please run the application to view the entire dashboard.

#### [Responsive Design - click to view]()
#### [Populate the search bar feature-Mobile - click to view](https://i.ibb.co/3zDdhZ2/populate-Search.gif)
#### [Use the filter search feature- click to view](https://i.ibb.co/Nxp5t1J/search-filter.gif)
#### [Mock User Authentication- click to view](https://i.ibb.co/NS4jg0T/login.gif)


### Project Challenges 
 * Learning how to use new packages in a short amount of time always has its challenges, but teaches me how to research and priortize my time wisely.
 * Using thorough error handling and post requests for the 'first' time in a large project like this was challenging and enlightenting. Many aha moments.
 
### Project Wins
 * Thoroughly accounted for edge cases so bad data could not be posted and the app would work as intended in all cases of user and server error.
 * The search filter is a user friendly feature for searching through destinations. Not only can you click on and populate the search field, but you can also search by city to display only cities of interest.

### Future Iterations
  * I would love to include a modal before the user accepts a trip in order to allow the user to confirm their trip.
  * With more time, I would love to apply more styling to more accurately depict some features and styles of a more real world user-friendly application.
  * I would like to include a put request so users are not able to request trips on the same date and user as agent functionality so an agent can approve/deny pending trips.
  

