// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

import './css/base.scss';
import './images/turing-logo.png'
import Agency from './Agency';
import Traveler from './Traveler'
// import Trip from './Trip';
import { postData, fetchData } from './apiCalls.js'
import { renderDestinations, glideSlides, setBookingCalendar, clearTripRequestErrorField, renderUserTrips, renderYearlyExpenses, displayPage, displayErrorMessage } from './domUpdates'
import dayjs from 'dayjs';



//temporarily a global variable (get userTrips and destination search bar needs it.)
let destinations;
let agency;

let defaultDate = new Date();
let todayDate = dayjs(defaultDate).format('YYYY/MM/DD');
//current user is set in the fetch user function;
let currentUser;

///////////////////////////FETCH USER --- USER LOGIN///////////////////////////


//////////////EVENT LISTENERS////////////////////////////////////
// window.addEventListener('load', displayLoginPage());

document.getElementById('user-login-submit').addEventListener('click', (e) => {
  console.log("here in event listener")
  validateUser(e);
})

glideSlides.addEventListener('click', (e) => {
  populateSearchBar(e);
})

const destinationSearchBar = document.getElementById('destination-search');

//BUG-FIX: HERE when you enter an empty string
// destinationSearchBar.addEventListener('keyup', function(e) {
//   createFilteredList(e);
// });

// should this be a click event instead?
// destinationSearchBar.addEventListener('click', function(e) {
//   checkForReset(e)
// })

const bookATripButton = document.getElementById('book-a-trip-button');

bookATripButton.addEventListener('click', () => {
  displayPage('bookATrip');
  displayDestinationsData(agency.destinations);
  
})
//add an event listener on home button.


////////// FETCH REQUEST AND PAGE DISPLAY PAGE FUNCTION ///////////////

const fetchUser = (username) => {
let user;
  
  return fetchData(username).then((res) => {
    console.log("here is our res",)
    if (res == 'Error: 404') {
      throw new Error(404);
    }
    if (res.id) {
      return res;
    } else {
      checkForErrors(res)
    }
  }).then(data => {
    fetchUserDashboardDataByUserId(data.id);
    currentUser = data;  
    user = data; 
     return user;   
  }).then((user) => user)
  .catch(err => {

    displayErrorMessage(err, "fetchUser")
  })

}


const checkUserLoginInputs = () => {
  const usernameInput = document.getElementById('username');
  const username = usernameInput.value
  const userID = parseInt(username.slice(8))

  if (document.getElementById('password').value.toString().trimEnd() === "travel") {
    return fetchUser(`travelers/${userID}`).then((isValidUser) => isValidUser);
  } else {
    document.getElementById("user-login-error-field").innerHTML = 'Please enter valid credentials.'
  }
  
  usernameInput.value = null;
  document.getElementById('password').value = null;
  
}


const validateUser = (e) => {
  e.preventDefault();
  document.getElementById("user-login-error-field").innerHTML = ''
  const usernameInput = document.getElementById('username')
  const isValid = checkUserLoginInputs();

  if (isValid && currentUser) {
    displayPage("userDashboard")
  } else {
    return;
  }

}

function fetchUserDashboardDataByUserId(userID) {
//Do not get rid of return.
  return Promise.resolve(fetchAgencyData()).then((data) => generateAgency(data))
    .then((newAgency) => getUserTrips(newAgency, userID)).then(() => displayPage("userDashboard"))
}

//this is needed so the fetchUserDashboardData when a new trip is posted wont show dashboard.
function fetchUpdatedData(userID) {
//Do not get rid of return.
  return Promise.resolve(fetchAgencyData()).then((data) => generateAgency(data))
    .then((newAgency) => getUserTrips(newAgency, userID))
}

function fetchAgencyData() {
  return Promise.all([fetchData('trips'), fetchData('destinations')]).then(values => values).catch((err) => displayErrorMessage(err, "fetchAgencyData"));
}

function generateAgency(dataSets) {
  agency =  new Agency(dataSets[0].trips, dataSets[1].destinations);
  return agency;
}


//////////////// DISPLAY USER DASHBOARD FUNCTION/////////////
function getUserTrips(newAgency, userID) {
  agency = newAgency;
  destinations = agency.destinations;

   const pastTrips = agency.getTripsByUser(userID, todayDate, 'past'); 
   const currentTrips = agency.getTripsByUser(userID, todayDate, 'current');
   const futureTrips = agency.getTripsByUser(userID, todayDate, 'future');
   const pendingTrips = agency.getTripsByUser(userID, todayDate,'pending');
   //yearly expenses only include past that have been approved and paid for.
   const yearlyExpenses = agency.getUserYearlyExpenses(userID, parseInt(todayDate.split('/')[0]), todayDate)

   displayUserTripData(pastTrips, currentTrips, futureTrips, pendingTrips, yearlyExpenses)

   return newAgency;
}


function displayUserTripData(past, current, future, pending, yearlyExpenses) {
  const year = todayDate.split('/')[0]
  renderUserTrips(past, current, future, pending, agency);
  renderYearlyExpenses(yearlyExpenses, year);
}


//////////////LOAD PAGE FUNCTION//////////////////////
setBookingCalendar(todayDate);


///////FILTER DESTINATIONS//////////////
                           // To Do: BUG in filter destination.
                     // filter function may not be as helpful with courosel.
const createFilteredList = (e) => {
  // const searchedDestination = e.target.value.toLowerCase();
  //TRIM FIXED the checking just a bunch of empty spaces and freezing things.
  const searchedDestination = e.target.value.trim().toLowerCase();

  let filteredDestinations = destinations.filter((destination) => {
    return (
      // //use substring instead//unless they can search by country as well.
      // destination.location.toLowerCase().startsWith(searchedDestination)  
      destination.location.toLowerCase().includes(searchedDestination)  
    )
  });

  if (filteredDestinations) {
   displayDestinationsData(filteredDestinations)
  }

}


                           ///// SEARCH BAR/////
// function checkForReset (e) {
//     if (!e.target.value) {
//     // e.target.reset();
//     displayDestinationsData(destinations);
//   }
// }

function populateSearchBar(e) {
  console.log(e.target)
  const destinationChosen = destinations.find(destination => parseInt(destination.id) === parseInt(e.target.closest('li').id)) 
   destinationSearchBar.value = destinationChosen.location
}

///POST A NEW TRIP FUNCTIONS ---------------------------------------------------------------
                             //////////BOOK A BRIP FORM////////////////

document.getElementById('book-a-trip-form').addEventListener('submit', (e) => {
  requestTrip(e)
});
                                ///// ERROR HANDLING
  
//TO DO: SHORTEN FUNCTION.
function checkValidSearch(substring) {
  let isValid;
  let newSubstring = substring.trim().toLowerCase().toString().split(",")[0]
  //if nothing in the field.
  if (!newSubstring) {
    document.getElementById("invalid-destination-error-field").innerHTML = 'Please select a valid destination';
    return;
  }

  if (agency.destinations.some(destination => {
      return (destination.location.toLowerCase().split(",")[0]) === newSubstring
    })) {
      console.log("Found a match!")
      isValid = true;
    }

  if (!isValid) {
    document.getElementById("invalid-destination-error-field").innerHTML = 'Please select a valid destination'
  }
  return isValid;
}


const getSubstringTripId = (substring) => {
  let newSubstring = substring.trim().toLowerCase();

  return agency.destinations.find(destination => destination.location.toLowerCase().includes(newSubstring)).id;
}


const checkValidDuration = (durationInput) => {
  console.log(durationInput.value, "durationInput")
  console.log(typeof(durationInput.value), "type of value")
  
  const parsedInput = parseInt(durationInput.value);
  console.log("parsedInput", parsedInput)
  console.log("final", typeof(parsedInput) )
  if (!parsedInput) {
    document.getElementById("invalid-duration-error-field").innerHTML = 'Please enter a valid number of days';
    return false;
  } else {return parseInt(durationInput.value)}
}

//TO DO: create a dynamic select bar that will populate all the destinations and then show only the options that match your search.***
                          ///// CREATE NEW TRIP POST OBJECT
function requestTrip(e) {
  e.preventDefault();
  clearTripRequestErrorField();
  const startDate = document.getElementById('start');
  const durationInput = document.getElementById('duration');
  let destinationID; 
  const numTravelers = document.getElementById('number-of-travelers')

  const isValidDuration = checkValidDuration(durationInput);
  
  if (!isValidDuration) {
    return;
  }

  if (!checkValidSearch(destinationSearchBar.value)) {
    console.log("Invalid");
    return;
  } else {
    destinationID = getSubstringTripId(destinationSearchBar.value);
    console.log("valid")
  }

  const tripRequest = {
    id: parseInt((agency.returnTotalNumTrips() + 1)),
    userID: currentUser.id,
    destinationID: parseInt(destinationID),
    travelers: parseInt(numTravelers.value),
    date: formatDate(startDate.value),
    duration: parseInt(durationInput.value),
    status: 'pending',
    suggestedActivities: [],
  }
  
  postNewTrip(tripRequest);
  e.target.reset()
}

             
                ///// CREATE RESPONSE MESSAGE FOR USER ONCE TRIP IS REQUESTED
const createTripRequestResponseForUser = (parsedData) => {
  const tripRequestError = document.getElementById("trip-request-error-field");
  tripRequestError.innerHTML = 'Your trip was successfully booked! Retrieving your estimated cost...';

  let estimatedTripCost = 0;

  Promise.resolve(fetchUpdatedData(parsedData.userID))
    .then(() => agency.getTripById(parsedData.id).calculateNewTripCost(agency.destinations)
  ).then(totalCost => {
    estimatedTripCost = totalCost;
    console.log(estimatedTripCost, 'estimatedTripCost')
  }).then(()=> {
    tripRequestError.innerHTML = `Your estimated trip cost is $${estimatedTripCost}`
  })
}

                         ///// POST NEW TRIP WITH COMPLETED POST OBJECT
function postNewTrip(tripRequest) {
  Promise.resolve(postData('trips', tripRequest)).then(res => {
    return checkForErrors(res);
  }).then(parsedData => {
    createTripRequestResponseForUser(parsedData.newTrip)
  } )
  .catch(err => displayErrorMessage(err, "postNewTrip"))
}

                              /////CHECK FOR ERRORS
function checkForErrors(res) {
  if (!res.ok) {
    console.log(res)
    console.log("ERROR")

    throw new Error();
  } else {
    return res.json();
  }
}




/////////////MISC FUNCTIONS


                       //DISPLAY DESTINATIONS
//good place to clear error message fields?
function displayDestinationsData(destinations) { 
  renderDestinations(destinations);
}

const formatDate = (dateToFormat) => {
  const dividedDate = dateToFormat.split("-");
  const month = dividedDate[1];
  const day = dividedDate[2];
  const year = dividedDate[0];
  const rearrangedDate = [year, month, day];
  return rearrangedDate.join("/");
}