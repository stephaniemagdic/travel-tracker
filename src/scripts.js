// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import Agency from './Agency';
// import Trip from './Trip';
import { postData } from './apiCalls.js'
import { renderDestinations, glideSlides, setBookingCalendar, clearTripRequestErrorField } from './domUpdates'
import dayjs from 'dayjs';


// global variables:  current User(which is the object data that is fetched from the single user endpoint after the login. (ps you could call a method on the agency class to retrieve users data and use that when you instantiate your user class do give them their bookings)), date

//temporarily a global variable (get userTrips and destination search bar needs it.)
let destinations;
let agency;

let defaultDate = new Date();
let todayDate = dayjs(defaultDate).format('YYYY/MM/DD');




///////////////////////////FETCH USER --- USER LOGIN///////////////////////////
///TEMPORARY USER OBJECT TO TEST POST:
fetchUserData()

//put in fetch file**
function fetchUserData() {
 fetchData('travelers/10').then(data => {
   console.log("here is user data");
   currentUser = data;
   console.log(currentUser)
 }) 
 
}

let currentUser;

//////////////EVENT LISTENERS////////////////////////////////////
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

const destinationSearchBar = document.getElementById('destination-search');

// destinationSearchBar.addEventListener('keyup', function(e) {
//   createFilteredList(e);
// });

// should this be a click event instead?
// destinationSearchBar.addEventListener('click', function(e) {
//   checkForReset(e)
// })



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

  //this needs to be returned to be used in the promise chain wthin fetch call.. DO NOT DELETE.
  return Promise.resolve(fetchAgencyData()).then((data) => generateAgency(data))
    .then((newAgency) => {
      console.log("I am in fetch request", newAgency)
      getUserTrips(newAgency, userID);
      

    })



}

function fetchAgencyData() {
  return Promise.all([fetchData('trips'), fetchData('destinations')]).then(values => values);
}

//add traveler data.
function generateAgency(dataSets) {
  agency =  new Agency(dataSets[0].trips, dataSets[1].destinations);
  return agency;

}

function fetchData(type) {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(`ERROR with ${type}: ${err}`))
}


//today date needs to be set ... 
function getUserTrips(newAgency, userID) {
  //passing in the data which is the instance of agency 
  // const agency = data; 
  console.log("this should be an instance of agency-->", newAgency)
  console.log('this should be 1', userID)

  agency = newAgency;
 
  

  console.log(agency.getTripsByUser(userID, "2021/08/05", 'past'))

  // will use userID to fetch the correct trips.

  // need to call the next function in TYpora document which is to pass these in to a display function which will call the render functions!
  // the render functions will include display destinations data .. see below
  
  //make this global so you can see it with your filter.

  destinations = agency.destinations;
  displayDestinationsData(agency.destinations)

  displayUserDashboard(userID)

   return newAgency;

}

//////////////// DISPLAY USER DASHBOARD FUNCTION/////////////
function displayUserDashboard(userId) {
  //display user
  //CALL FUNCTIONS TO POPULATE TRIPP DATA AND EXPENSES 
}


//////////////LOAD PAGE FUNCTION//////////////////////
setBookingCalendar(todayDate)

////////// GRAB THE FORM INPUT /////////////////////////


///////FILTER DESTINATIONS//////////////
// BUG in filter destination.
// filter function may not be as helpful with courosel.
const createFilteredList = (e) => {

  
  
  // const searchedDestination = e.target.value.toLowerCase();
  //TRIM FIXED the checking just a bunch of empty spaces and freezing things.
  const searchedDestination = e.target.value.trim().toLowerCase();

   console.log("my input value typed here", searchedDestination)

  let filteredDestinations = destinations.filter((destination) => {
    return (
      // //use substring instead//unless they can search by country as well.
      // destination.location.toLowerCase().startsWith(searchedDestination)  
      destination.location.toLowerCase().includes(searchedDestination)  
    )
  });
 
  console.log("filteredDestinations",filteredDestinations)
  if (filteredDestinations){
   displayDestinationsData(filteredDestinations)
  }

  
}


///////BOOK A TRIP SUBMIT BUTTON /////////////////////
///// SERACH BAR/////
function checkForReset(e) {
    if (!e.target.value) {
    // e.target.reset();
    displayDestinationsData(destinations);
  }
}

function populateSearchBar(e) {
  console.log(e.target)
  const destinationChosen = destinations.find(destination => parseInt(destination.id) === parseInt(e.target.closest('li').id)) 
   destinationSearchBar.value = destinationChosen.location
}

//////////BOOK A BRIP FORM

document.getElementById('book-a-trip-form').addEventListener('submit', (e) => {
  requestTrip(e)
});

  ///YOU ARE HERE -------------------------------------------------------------
function checkValidSearch(substring) {
  
  let newSubstring = substring.trim().toLowerCase().toString()
  //if nothing in the field.
  if(!newSubstring){
    document.getElementById("invalid-destination-error-field").innerHTML = 'Please select a valid destination';
    return;
  }

    if(newSubstring.length < 3){
    document.getElementById("invalid-destination-error-field").innerHTML = 'Please select a valid destination';
    return;
  }
  

  let isValid = agency.destinations.some(destination => {
    console.log("newSubString",newSubstring)
    return destination.location.toLowerCase().includes(newSubstring)
  })

  if(!isValid) {
    document.getElementById("invalid-destination-error-field").innerHTML = 'Please select a valid destination'
  }
  return isValid;
}


const getSubstringTripId = (substring) => {
  let newSubstring = substring.trim().toLowerCase();

  console.log(newSubstring, "newsubstring")
  console.log(agency.destinations, "agency.destinations")

  console.log(agency.destinations.find(destination => destination.location.toLowerCase().includes(newSubstring)), "ID HEREEEEE");

  return agency.destinations.find(destination => destination.location.toLowerCase().includes(newSubstring)).id;
}

////////////////////////
//create a dynamic select bar that will populate all the destinations and then show only the options that match your search.***
 
function requestTrip(e) {
    e.preventDefault();
    clearTripRequestErrorField();


  const startDate = document.getElementById('start');
  const durationInput = document.getElementById('duration');
  let destinationID; 

 /// STEPS TO CHECK ID----------
  /// if  is this a valid destination search.
  if(!checkValidSearch(destinationSearchBar.value)) {
    console.log("Invalid");
    return;
  } else {
    //getSubstringID()
    //set ID
    destinationID = getSubstringTripId(destinationSearchBar.value);
    console.log("valid")
  }

  const numTravelers = document.getElementById('number-of-travelers')

  console.log('destinationID ====>', destinationID)

  //to get the destination... we need to do a find through the destinations and get the id.
 
  const tripRequest = {
    // date: formData.get('tripStart'),
    id: parseInt((agency.returnTotalNumTrips() + 1)),
    userID: currentUser.id,
    destinationID: parseInt(destinationID),
    travelers: parseInt(numTravelers.value),
    date: formatDate(startDate.value),
    duration: parseInt(durationInput.value),
    status: 'pending',
    suggestedActivities: [],
  }
  console.log("tripRequest--->", tripRequest);
  postNewTrip(tripRequest);

  e.target.reset()
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
 
  renderDestinations(destinations);

}


//This Function will instantiate trip, will, create a message for user// will be async
  const createTripRequestResponseForUser = (parsedData) => {
  const tripRequestError = document.getElementById("trip-request-error-field");

    tripRequestError.innerHTML = 'Your trip was successfully booked! Retrieving your estimated cost...'


  let estimatedTripCost = 0;

  Promise.resolve(fetchUserDashboardDataByUserId(parsedData.userID)).then(() => {
    console.log("agency", agency);

    return agency.getTripById(parsedData.id).calculateNewTripCost(agency.destinations)
  }).then(totalCost => {
    estimatedTripCost = totalCost;
    console.log(estimatedTripCost, 'estimatedTripCost')
  }).then(()=> {
    tripRequestError.innerHTML = `Your estimated trip cost is $${estimatedTripCost}`
  })

}


function postNewTrip(tripRequest) {
  Promise.resolve(postData('trips', tripRequest)).then(res => {
    return checkForErrors(res);
  }).then(parsedData => {
    createTripRequestResponseForUser(parsedData.newTrip)
  } )
  .catch(err => displayErrorMessage(err, "postNewTrip"))
};


function checkForErrors(res) {
  console.log(res);
  // if (status === 404) {

  // }


  if (!res.ok) {
    //what does this do? will it return this exact message ... return it and bring you into catch.
    throw new Error();
  } else {
    // console.log("here is just the new trip", res);
    
  return res.json();
  //"Trip with id 203 successfully posted"
  }
  
}


//user ternary operator.
//put this in dom updates file.
function displayErrorMessage(err, scenario) {
  const tripRequestError = document.getElementById("trip-request-error-field");
  const userLoginError = document.getElementById("user-login-error-field");
  
  let message;

  if (scenario === "postNewTrip") {
    if (err.status === 422) {
      message = "Please fill out all input fields";
      tripRequestError.innerHTML = `${message}`;
    }
   
  }
  if (scenario === "userLoginAuthenticationFailure") {
    if (err.status === 404) {
      message = "Invalid user credentials";
      userLoginError.innerHTML = `${message}`;
    }
    
  }

}


