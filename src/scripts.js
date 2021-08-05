// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');




// global variables:  current User, date



////////// GRAB THE FORM INPUT /////////////////////////

// import dayjs from 'dayjs';
// let defaultDate = new Date();
// let currentDate = dayjs(defaultDate).format('YYYY/MM/DD');


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