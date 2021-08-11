import './css/base.scss';
import './images/turing-logo.png'
import Agency from './Agency';
import Traveler from './Traveler'
import { postData, fetchData } from './apiCalls.js'
import { renderDestinations, glideSlides, setBookingCalendar, clearTripRequestMessageFields, renderUserTrips, renderYearlyExpenses, displayPage, displayErrorMessage, formatDate } from './domUpdates'
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

displayTripsButton.addEventListener('click', () => {
  displayPage('trips');
  clearTripRequestMessageFields();
});

bookATripButton.addEventListener('click', () => {
  displayPage('bookATrip');
  displayDestinationsData(agency.destinations);
  setBookingCalendar(todayDate);
});

document.getElementById('book-a-trip-form').addEventListener('submit', (e) => {
  requestTrip(e)
});

glideSlides.addEventListener('click', (e) => {
  populateSearchBar(e);
});

destinationSearchBar.addEventListener('keyup', function(e) {
  createFilteredList(e);
});

destinationSearchBar.addEventListener('mouseout', function(e) {
  resetDestinations(e);
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
  return fetchData(username).then((res) => {
    if (res.id) {
      return res;
    } else {
      checkForErrors(res)
    }
  }).then(data => {
    fetchUserDashboardData(data.id);
    currentUser = data;  
    return data;
  })
    .then((user) => user)
    .catch(err => displayErrorMessage(err, "fetchUser"));
}

const createNewTraveler = (travelerData) => {
  currentUser = new Traveler(travelerData);
}

const checkUserLoginInputs = () => {
  const usernameInput = document.getElementById('username');
  const userID = parseInt(usernameInput.value.slice(8));
  
  if (document.getElementById('password').value.toString().trimEnd() === "travel") {
    return fetchUser(`travelers/${userID}`).then((isValidUser) => {
      currentUser = new Traveler(isValidUser)
      createNewTraveler(isValidUser);
      welcomeUser(isValidUser);
      return isValidUser;
    });
  } else {
    document.getElementById("user-login-error-field").innerHTML = 'Please enter valid credentials'
  }
  
  usernameInput.value = null;
  document.getElementById('password').value = null;
}

const welcomeUser = () => {
  document.getElementById("welcome-traveler").innerHTML = `
    Welcome Back to Travel Tracker, ${currentUser.returnFirstName()}!
    `
  document.getElementById("header-container").classList.remove("hidden")
}

const validateUser = (e) => {
  e.preventDefault();
  document.getElementById("user-login-error-field").innerHTML = ''
  const isValid = checkUserLoginInputs();

  if (isValid && currentUser) {
    welcomeUser();
    displayPage("userDashboard");
  } else {
    return;
  }
}

function fetchUserDashboardData(userID) {
  return Promise.resolve(fetchAgencyData()).then((data) => generateAgency(data))
    .then((newAgency) => getUserTrips(newAgency, userID)).then(() => displayPage("userDashboard"))
}

function fetchUpdatedData(userID) {
  return Promise.resolve(fetchAgencyData()).then((data) => generateAgency(data))
    .then((newAgency) => getUserTrips(newAgency, userID))
}

function fetchAgencyData() {
  return Promise.all([fetchData('trips'), fetchData('destinations')]).then(values => values).catch((err) => displayErrorMessage(err, "fetchAgencyData"));
}

function generateAgency(dataSets) {
  agency = new Agency(dataSets[0].trips, dataSets[1].destinations);
  return agency;
}

/* -----------------DISPLAY USER DASHBOARD FUNCTION --------------------------*/
function getUserTrips(newAgency, userID) {
  agency = newAgency;
  destinations = agency.destinations;

  const pastTrips = agency.getTripsByUser(userID, todayDate, 'past'); 
  const currentTrips = agency.getTripsByUser(userID, todayDate, 'current');
  const futureTrips = agency.getTripsByUser(userID, todayDate, 'future');
  const pendingTrips = agency.getTripsByUser(userID, todayDate,'pending');
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

const getCityTripId = (substring) => {
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
  e.preventDefault();
  clearTripRequestMessageFields();
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
    destinationID = getCityTripId(destinationSearchBar.value);
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

const createTripRequestResponseForUser = (parsedData) => {
  let estimatedTripCost = 0;

  const totalTripCostField = document.getElementById("estimated-trip-price")

  totalTripCostField.innerHTML = 'Your trip was successfully booked! Retrieving your estimated cost...';

  Promise.resolve(fetchUpdatedData(parsedData.userID))
    .then(() => agency.getTripById(parsedData.id).calculateNewTripCost(agency.destinations))
    .then(totalCost => estimatedTripCost = totalCost)
    .then(()=> totalTripCostField.innerHTML = `Trip Request Processed! Your estimated trip cost to ${agency.getDestinationLocationByID(parsedData.destinationID)} is $${estimatedTripCost}.`)
}

const postNewTrip = (tripRequest) => {
  Promise.resolve(postData('trips', tripRequest)).then(res => {
    return checkForErrors(res);
  }).then(parsedData => {
    createTripRequestResponseForUser(parsedData.newTrip)
  } )
    .catch(err => displayErrorMessage(err, "postNewTrip"))
}
              
function displayDestinationsData(destinations) { 
  renderDestinations(destinations);
}

              /// SEARCH BAR FILTER
const populateSearchBar = (e) => {
  const destinationChosen = destinations.find(destination => parseInt(destination.id) === parseInt(e.target.closest('li').id)) 
  destinationSearchBar.value = destinationChosen.location
}

const createFilteredList = (e) => {
  if (e.target.value.includes(" ")) {
    return;
  }

  if (!(/[a-zA-Z]/).test(e.target.value)) {
    return;
  }

  if (!e.target.value) {
    return;
  }

  const searchedDestination = e.target.value.toLowerCase();

  let filteredDestinations = destinations.filter((destination) => {
    return (
      destination.location.split(",")[0].toLowerCase().includes(searchedDestination)  
    )
  });
  
  if (filteredDestinations.length === 0) {
    return
  } else {
    displayDestinationsData(filteredDestinations)
  }
  
}

const resetDestinations = (e) => {
  if (!e.target.value) {
    displayDestinationsData(destinations)
  }
}
