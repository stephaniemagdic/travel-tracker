// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');




// global variables:  current User, date


//////////////EVENT LISTENERS/////////////
window.addEventListener('load', loadPage);

////////// FETCH REQUEST AND PAGE DISPLAY PAGE FUNCTION ///////////////

// function loadPage() {
//   Promise.resolve(fetchPageData()).then((data) => generateRepoClasses(data))
//     .then(() => displayPageInfo());
//     console.log("test")
// }

// function fetchPageData() {
//   const userRepoPromise = fetchData('users') 
//   const hydrationRepoPromise = fetchData('hydration')  
//   const sleepRepoPromise = fetchData('sleep')  
//   return Promise.all([userRepoPromise, hydrationRepoPromise, sleepRepoPromise]).then(values => values);
// }

// function generateRepoClasses(dataSets) {
//   allUserData = new UserRepository(dataSets[0].userData);
//   allHydrationData = new HydrationRepository(dataSets[1].hydrationData);
//   allSleepData = new SleepRepository(dataSets[2].sleepData);
// }

// function fetchData(type) {
//   return fetch(`http://localhost:3001/api/v1/${type}`)
//     .then(response => response.json())
//     .then(data => data)
//     .catch(err => console.log(`ERROR with ${type}: ${err}`))
// }

//---------------------ALL DISPLAY FUNCTIONS----------------------------------//
// function displayPageInfo() {
//   const randomUser = allUserData.userData[Math.floor(Math.random()* allUserData.userData.length)]
//   const user = new User(allUserData.returnUserData(randomUser.id));
//   displayUserCard(user);
//   displayAllHydrationData(user);
//   displayAllSleepData(user);
// }



////////// GRAB THE FORM INPUT /////////////////////////

// import dayjs from 'dayjs';
// let defaultDate = new Date();
// let currentDate = dayjs(defaultDate).format('YYYY/MM/DD');


/////////////// FORM SEARCH FUNCTIONALITY //////////////////
//If no search criteria then show all**
// searchBar.addEventListener('keyup', function(e) {
//   createFilteredList(e);
// });

// const createFilteredList = (e) => {
//   const searchedDestinations = e.target.value.toLowerCase();
  
//     let filteredDestinations = (AGENCYREPO.destinations).filter((destination) => {
//       return (
          // destination.name.toLowerCase().includes()  
//       )
//     });
//     displayDestinations(filteredDestinations);
 
// }




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