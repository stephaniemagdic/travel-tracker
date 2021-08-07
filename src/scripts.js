// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file


import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import Agency from './Agency';
// import Trip from './Trip';


import { renderDestinations, glideSlides } from './domUpdates'


console.log('This is the JavaScript entry file - your code begins here.');


// global variables:  current User(which is the object data that is fetched from the single user endpoint after the login. (ps you could call a method on the agency class to retrieve users data and use that when you instantiate your user class do give them their bookings)), date

//temporarily a global variable (get userTrips and destination search bar needs it.)
let destinations;

//////////////EVENT LISTENERS/////////////
// window.addEventListener('load', displayLoginPage());

document.getElementById('user-login-submit').addEventListener('click', (e) => {
  console.log("here in event listener")
  validateUser(e);
})

glideSlides.addEventListener('click', (e) => {
  // if (e.target.classList.contains('home-button')) {
  //   showHomePage()};
  populateSearchBar(e);
})

const destinationSearchBar = document.getElementById('destination-search')

destinationSearchBar.addEventListener('keyup', function(e) {
  createFilteredList(e);
});

function populateSearchBar(e) {
  console.log(e.target)
  const destinationChosen = destinations.find(destination => parseInt(destination.id) === parseInt(e.target.closest('li').id)) 
   console.log("destinationSearchBar", destinationSearchBar)
   console.log(destinationSearchBar.value);
   console.log(destinationChosen, 'destinationChosen')
   destinationSearchBar.value = destinationChosen.location
}

////////// FETCH REQUEST AND PAGE DISPLAY PAGE FUNCTION ///////////////

const validateUser = (e) => {
  //logic to check user data and fetch at single user will go here.
  console.log(e)
  e.preventDefault()
  console.log("here")
  fetchUserDashboardDataByUserId(1)
}
//call this function after validate user function and then pass int the userID..
// user ID WILL BE PASSED IN AS ARGUMENT EVENTUALLY HERE.
// fetchUserDashboardDataByUserId(userID);
//if users info is correct call this function.
function fetchUserDashboardDataByUserId(userID) {
  Promise.resolve(fetchAgencyData()).then((data) => generateAgency(data))
    .then((data) => getUserTrips(data, userID));
}

function fetchAgencyData() {
  return Promise.all([fetchData('trips'), fetchData('destinations')]).then(values => values);
}

//add traveler data.
function generateAgency(dataSets) {
  return new Agency(dataSets[0].trips, dataSets[1].destinations);
}

function fetchData(type) {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(`ERROR with ${type}: ${err}`))
}


//today date needs to be set ... 
function getUserTrips(data, userID) {
  //passing in the data which is the instance of agency 

  // const agency = data; 
  console.log("this should be an instance of agency-->", data)
  console.log('this should be 1', userID)

  const agency = data;
 
  console.log(agency.getTripsByUser(userID, "2021/08/05", 'past'))

  // will use userID to fetch the correct trips.


  // need to call the next function in TYpora document which is to pass these in to a display function which will call the render functions!
  // the render functions will include display destinations data .. see below
  
  //make this global so you can see it with your filter.

  destinations = agency.destinations;
  displayDestinationsData(agency.destinations)
}


////////// GRAB THE FORM INPUT /////////////////////////



///////FILTER DESTINATIONS//////////////
//filter function may not be as helpful with courosel.
const createFilteredList = (e) => {
  const searchedDestination = e.target.value.toLowerCase();

  let filteredDestinations = destinations.filter((destination) => {
    return (
      //use substring instead//unless they can search by country as well.
      destination.location.toLowerCase().includes(searchedDestination)  
    )
  });
 
  console.log("filteredDestinations",filteredDestinations)
  displayDestinationsData(filteredDestinations)
}


///////BOOK A TRIP SUBMIT BUTTON /////////////////////

document.getElementById('book-a-trip-form').addEventListener('submit', (e) => {
  requestTrip(e)
});

  ///YOU ARE HERE
  function getDestinationIdByName(name) {
    //change both to lowercase.

    return destinations.find(destination => {
      
      return destination.location.toLowerCase().includes(name.toLowerCase());
    }).id;
  }

function requestTrip(e) {
    e.preventDefault();
  // const formData = new FormData(e.target);


  //change the form min to todays date... on page reload.
  // grab element attribute and set to todayDate.
  // const dateControl = document.querySelector('input[type="date"]');
  const startDate = document.getElementById('start');
  const durationInput = document.getElementById('duration');
  const destinationID = getDestinationIdByName(destinationSearchBar.value.toString())

  console.log('destinationID ====>', destinationID)

  //to get the destination... we need to do a find through the destinations and get the id.
 
  const tripRequest = {
    // date: formData.get('tripStart'),
    // id: ,
    // userID,
    // destinationID,
    // travelers: ,
    date: formatDate(startDate.value),
    duration: parseInt(durationInput.value),
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