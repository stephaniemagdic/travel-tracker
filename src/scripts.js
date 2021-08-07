// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file


import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');


// global variables:  current User(which is the object data that is fetched from the single user endpoint after the login. (ps you could call a method on the agency class to retrieve users data and use that when you instantiate your user class do give them their bookings)), date

//////////////EVENT LISTENERS/////////////
// window.addEventListener('load', displayLoginPage());

////////// FETCH REQUEST AND PAGE DISPLAY PAGE FUNCTION ///////////////

fetchUserDashboardData();
//if users info is correct call this function.
function fetchUserDashboardData() {
  Promise.resolve(fetchAgencyData()).then((data) => generateAgency(data))
    .then(() => getUserTrips());
    console.log("test")
}

function fetchAgencyData() {
  return Promise.all([fetchData('trips') , fetchData('destinations')]).then(values => values);
}

function generateAgency(dataSets) {
  agency = new Agency(dataSets[0], dataSets[1]);
}

function fetchData(type) {
  return fetch(`http://localhost:3001/api/v1/{type}`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(`ERROR with ${type}: ${err}`))
}

function getUserTrips() {
  console.log (" we are in get User trips!")
}
////////// GRAB THE FORM INPUT /////////////////////////






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