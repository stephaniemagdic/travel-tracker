import './css/base.scss';
import './images/turing-logo.png'
import Agency from './Agency';
import Traveler from './Traveler'
import { postData, fetchData } from './apiCalls.js'
import { renderDestinations, glideSlides, setBookingCalendar, clearTripRequestErrorField, renderUserTrips, renderYearlyExpenses, displayPage, displayErrorMessage, formatDate } from './domUpdates'
import dayjs from 'dayjs';
import './images/road-map.png';
import './images/travel-luggage.png';

/* ------------------------GLOBAL VARIABLES ----------------------------------*/
let destinations;
let agency;
let defaultDate = new Date();
let todayDate = dayjs(defaultDate).format('YYYY/MM/DD');
let currentUser;

/* -------------------------EVENT LISTENERS ----------------------------------*/
const destinationSearchBar = document.getElementById('destination-search');
const displayTripsButton = document.getElementById('display-trips-button');
const bookATripButton = document.getElementById('book-a-trip-button');

document.getElementById('user-login-submit').addEventListener('click', (e) => {
  validateUser(e);
});

glideSlides.addEventListener('click', (e) => {
  populateSearchBar(e);
});

displayTripsButton.addEventListener('click', () => {
  displayPage('trips');
});

bookATripButton.addEventListener('click', () => {
  displayPage('bookATrip');
  displayDestinationsData(agency.destinations);
  setBookingCalendar(todayDate);
});


document.getElementById('book-a-trip-form').addEventListener('submit', (e) => {
  requestTrip(e)
});


/* -----------------USER LOGIN/FETCH DATA FUNCTIONS --------------------------*/
const checkForErrors = (res) => {
  if (!res.ok || res.message === "No traveler found with an id of NaN") {
    throw new Error(`${res}`);
  } else {
    return res.json();
  }
}

const fetchUser = (username) => {
  let user;
  
  return fetchData(username).then((res) => {
    // if (res == 'Error: 404') {
    //   throw new Error(404);
    // }
    if (res.id) {
      return res;
    } else {
      checkForErrors(res)
    }
  }).then(data => {
    fetchUserDashboardData(data.id);
    //dont need both of these variables.
    currentUser = data;  
    // user = data; 
    // return user;   
    //new below  
    return data;
  })
  .then((user) => user)
  .catch(err => displayErrorMessage(err, "fetchUser"));
}

const checkUserLoginInputs = () => {
  const usernameInput = document.getElementById('username');
  const userID = parseInt(usernameInput.value.slice(8))

  if (document.getElementById('password').value.toString().trimEnd() === "travel") {
    return fetchUser(`travelers/${userID}`).then((isValidUser) => isValidUser);
  } else {
    document.getElementById("user-login-error-field").innerHTML = 'Please enter valid credentials'
  }
  
  //TO DO:put these in a clear input function
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

//TO DO: seperate out these two following function.
function fetchUserDashboardData(userID) {
//Do not get rid of return.
  return Promise.resolve(fetchAgencyData()).then((data) => generateAgency(data))
    .then((newAgency) => getUserTrips(newAgency, userID)).then(() => displayPage("userDashboard"))
}

//**FIX 
//this is needed so the fetchUserDashboardData when a new trip is posted wont show dashboard.
//Is there a way to make the getUserTrips live somewhere else?* for SRP?------
function fetchUpdatedData(userID) {
//Do not get rid of return.
  return Promise.resolve(fetchAgencyData()).then((data) => generateAgency(data))
    .then((newAgency) => getUserTrips(newAgency, userID))
}

function fetchAgencyData() {
  return Promise.all([fetchData('trips'), fetchData('destinations')]).then(values => values).catch((err) => displayErrorMessage(err, "fetchAgencyData"));
}

function generateAgency(dataSets) {
  agency = new Agency(dataSets[0].trips, dataSets[1].destinations);
  //need to return out of here for...getUserTrips.
  return agency;
}

/* -----------------DISPLAY USER DASHBOARD FUNCTION --------------------------*/
function getUserTrips(newAgency, userID) {
  agency = newAgency;
  destinations = agency.destinations;
  console.log("todayDate", todayDate)

  const pastTrips = agency.getTripsByUser(userID, todayDate, 'past'); 
  console.log("pastTrips", pastTrips)
  const currentTrips = agency.getTripsByUser(userID, todayDate, 'current');
  console.log("CURRENT TRIPS...")
  const futureTrips = agency.getTripsByUser(userID, todayDate, 'future');
  const pendingTrips = agency.getTripsByUser(userID, todayDate,'pending');
  console.log("SEARCH YEAR", parseInt(todayDate.split('/')[0]));
  const yearlyExpenses = agency.getUserYearlyExpenses(userID, parseInt(todayDate.split('/')[0]), todayDate)

  displayUserTripData(pastTrips, currentTrips, futureTrips, pendingTrips, yearlyExpenses)

  return newAgency;
}

function displayUserTripData(past, current, future, pending, yearlyExpenses) {
  const year = todayDate.split('/')[0]
  renderUserTrips(past, current, future, pending, agency);
  renderYearlyExpenses(yearlyExpenses, year);
}


                                ///// ERROR HANDLING
  
//TO DO: SHORTEN FUNCTION.
const checkForDestinationSearchMatch = (substring) => {
  let isValid;
  let newSubstring = substring.trim().toLowerCase().toString().split(",")[0]

  if (!newSubstring) {
    document.getElementById("invalid-destination-error-field").innerHTML = 'Please select a valid destination';
    return;
  }

  if (agency.destinations.some(destination => {
      return (destination.location.toLowerCase().split(",")[0]) === newSubstring
    })) {
      isValid = true;
    }

  if (!isValid) {
    document.getElementById("invalid-destination-error-field").innerHTML = 'Please select an available destination'
  }
  return isValid;
}

const getSubstringTripId = (substring) => {
  let newSubstring = substring.trim().toLowerCase();
  return agency.destinations.find(destination => destination.location.toLowerCase().includes(newSubstring)).id;
}

const checkValidDuration = (durationInput) => {
  const parsedInput = parseInt(durationInput.value);
  if (!parsedInput) {
    document.getElementById("invalid-duration-error-field").innerHTML = `Please enter a # of days you'd like to book your trip`;
    return false;
  } else {
    return parseInt(durationInput.value)
    }
}

const requestTrip = (e) => {
// function requestTrip(e){
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

  if (!checkForDestinationSearchMatch(destinationSearchBar.value)) {
    return;
  } else {
    destinationID = getSubstringTripId(destinationSearchBar.value);
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

//TO DO: change this to be a modal***
const createTripRequestResponseForUser = (parsedData) => {
  let estimatedTripCost = 0;
  const tripRequestError = document.getElementById("trip-request-error-field");
  // tripRequestError.innerHTML = 'Your trip was successfully booked! Retrieving your estimated cost...';
  Promise.resolve(fetchUpdatedData(parsedData.userID))
    .then(() => agency.getTripById(parsedData.id).calculateNewTripCost(agency.destinations))
    .then(totalCost => estimatedTripCost = totalCost)
    .then(()=> tripRequestError.innerHTML = `Your estimated trip cost is $${estimatedTripCost}`)
}

const postNewTrip = (tripRequest) => {
  Promise.resolve(postData('trips', tripRequest)).then(res => {
    return checkForErrors(res);
  }).then(parsedData => {
    createTripRequestResponseForUser(parsedData.newTrip)
  } )
  .catch(err => displayErrorMessage(err, "postNewTrip"))
}
              


/////////////MISC FUNCTIONS

                       //DISPLAY DESTINATIONS
function displayDestinationsData(destinations) { 
  renderDestinations(destinations);
}



//FUNCTIONALITY TO FIX

//TO DO: BUG-FIX: HERE when you enter an empty string
destinationSearchBar.addEventListener('keyup', function(e) {
  createFilteredList(e);
});

// should this be a click event instead?
// destinationSearchBar.addEventListener('click', function(e) {
//   checkForReset(e)
// })


//TO DO: add an event listener on home button.

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


///////FILTER DESTINATIONS//////////////
                           // To Do: BUG in filter destination.
                     // filter function may not be as helpful with courosel.
const createFilteredList = (e) => {
  // const searchedDestination = e.target.value.toLowerCase();
  //TRIM FIXED the checking just a bunch of empty spaces and freezing things.
  // if(typeof(e.target.value === "string") 

  // if ((/^([a-z]{5,})$/.test(e.target.value))) {
  //   return;
  // }\

  //to lower case or trim failing here?

 //period is getting through here...
  if(!(/[a-zA-Z]/).test(e.target.value)) {
    return;
  }

  if (!e.target.value) {
    return;
  }
  

  // const searchedDestination = e.target.value.trim().toLowerCase();
   const searchedDestination = e.target.value.trim().toLowerCase();


  let filteredDestinations = destinations.filter((destination) => {
    return (
      // //use substring instead//unless they can search by country as well.
      // destination.location.toLowerCase().startsWith(searchedDestination)  
      destination.location.toLowerCase().includes(searchedDestination)  
    )
  });
  
  if (filteredDestinations === []) {
    return;
  }

  if (filteredDestinations) {
   displayDestinationsData(filteredDestinations)
  }
  
}