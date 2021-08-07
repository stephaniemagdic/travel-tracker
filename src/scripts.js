// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file


import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import Agency from './Agency';
// import Trip from './Trip';

import { renderDestinations } from './domUpdates'



console.log('This is the JavaScript entry file - your code begins here.');


// global variables:  current User(which is the object data that is fetched from the single user endpoint after the login. (ps you could call a method on the agency class to retrieve users data and use that when you instantiate your user class do give them their bookings)), date

//////////////EVENT LISTENERS/////////////
// window.addEventListener('load', displayLoginPage());

document.getElementById('user-login-submit').addEventListener('click', (e) => {
  console.log("here in event listener")
  validateUser(e);
})


////////// FETCH REQUEST AND PAGE DISPLAY PAGE FUNCTION ///////////////

const validateUser = (e) => {
  //logic to check user data and fetch at single user will go here.
  console.log(e)
  e.preventDefault()
  console.log("here")
  fetchUserDashboardDataByUserId(1)
}
//call this function after validate user function and then pass int the userID...
// user ID WILL BE PASSED IN AS ARGUMENT EVENTUALLY HERE.
// fetchUserDashboardDataByUserId(userID);
//if users info is correct call this function.
function fetchUserDashboardDataByUserId(userID) {
  Promise.resolve(fetchAgencyData()).then((data) => generateAgency(data))
    .then((data) => getUserTrips(data, userID));
  console.log("test")
}

function fetchAgencyData() {
  return Promise.all([fetchData('trips'), fetchData('destinations')]).then(values => values);
}

function generateAgency(dataSets) {
  return new Agency(dataSets[0].trips, dataSets[1].destinations);
}

function fetchData(type) {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(`ERROR with ${type}: ${err}`))
}


let destinations;
//today date needs to be set ... 
function getUserTrips(data, userID) {
  //passing in the data which is the instance of agency 

  // const agency = data; 
  console.log("this should be an instance of agency-->", data)

  console.log('this should be 1', userID)

  // will use userID to fetch the correct trips.

  const agency = data;

  console.log(agency.getTripsByUser(userID, 'past', "2021/08/05"))
  // need to call the next function in TYpora document which is to pass these in to a display function which will call the render functions!
  // the render functions will include display destinations data .. see below
  
  
  //make this global so you can see it with your filter.

  destinations = agency.destinations;
  displayDestinationsData(agency.destinations)
}
////////// GRAB THE FORM INPUT /////////////////////////



///////FILTER DESTINATIONS//////////////
document.getElementById('destination-search').addEventListener('keyup', function(e) {
  createFilteredList(e);
});
  
const createFilteredList = (e) => {
  console.log("we are in the filtered function")
  console.log(e.target)
  const searchedDestination = e.target.value.toLowerCase();

  let filteredDestinations = destinations.filter((destination) => {
    return (
      // change this to start with starts with ... not includes...
      //use substring instead//unless they can search by country as well.
      destination.location.toLowerCase().includes(searchedDestination)  
    )
  });
 
  displayDestinationsData(filteredDestinations)
}


///////BOOK A TRIP SUBMIT BUTTON /////////////////////

document.getElementById('book-a-trip-form').addEventListener('submit', (e) => {
  requestTrip(e)
});

function requestTrip(e) {
  //change the form min to todays date... on page reload.
  // grab element attribute and set to todayDate.
  const dateControl = document.querySelector('input[type="date"]');
 
  e.preventDefault();
  // const formData = new FormData(e.target);

  const tripRequest = {
    // date: formData.get('tripStart'),
    // id: ,
    // userID,
    // destinationID,
    // travelers: ,
    date: formatDate(dateControl.value),
    // duration: ,
    // status: ,
    // suggestedActivities: ,
  }
  console.log(tripRequest)
}


const formatDate = (dateToFormat) => {
  const dividedDate = dateToFormat.split("-");
  const month = dividedDate[1];
  const day = dividedDate[2];
  const year = dividedDate[0];
  const rearrangedDate = [year, month, day];
  return rearrangedDate.join("/");
}




function displayDestinationsData(destinations) {
  console.log("here in destinations data function-->", destinations)

  renderDestinations(destinations);
}