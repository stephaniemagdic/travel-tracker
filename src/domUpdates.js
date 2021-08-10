import Glide from '@glidejs/glide'
export const glideSlides = document.getElementById('glide-slides');

import dayjs from 'dayjs';
let defaultDate = new Date();
let todayDate = dayjs(defaultDate).format('YYYY/MM/DD');

console.log(todayDate, "from domUpdates FILE")


export const renderDestinations = (destinations) => {
 
  glideSlides.innerHTML = '';

    const config = {
    type: 'carousel',
    startAt: 0,
    perView: 4,
    focusAt: "center",
 
    breakpoints: {
      1024: {
        perView: 3
      },
      600: {
        perView: 1
      }
    }
}

  let glide = new Glide('.glide', config)
  
  destinations.forEach(destination => {

    glideSlides.innerHTML += `
      <li class="glide__slide" id="${destination.id}">
        ${createCard(destination.location, destination.image, destination.alt)}
      </li>
    `

   
  })

  glide.mount();


  
};

// const createDestinationCardsWithoutGlide = (destinations) => {
//  const singleItemsContainter = document.getElementById("single-items");
//   singleItemsContainter.innerHTML = '';
//   destinations.forEach(destination => {

//     singleItemsContainter.innerHTML += `
//       <li class="glide__slide" id="${destination.id}">
//         ${createCard(destination.location, destination.image, destination.alt)}
//       </li>
//     `
//   })
// }


function createCard(destination, img, alt) {
  return `
        <div class="card-top card-img-1 mobile-card-img-size">
          <div class="destination-name-container">
            <img src="${img}" alt="${alt}" >
            <p class="destination-name-label">${destination}</p>
          </div>
        </div>
  `
}

export function setBookingCalendar(todayDate) {
  let calendar = document.getElementById('start');
  let min = todayDate.split("/").join("-");
  let splitDate = todayDate.split('/');
  splitDate.splice(0, 1, (parseInt(todayDate.split('/')[0]) + 1));
  let max = splitDate.join("-");

  calendar.setAttribute('min', (min.toString()));
  calendar.setAttribute('max', (max.toString()));
}

export function clearTripRequestMessageFields() {
  document.getElementById('trip-request-error-field').innerHTML = ''
  document.getElementById("invalid-destination-error-field").innerHTML = '';
  document.getElementById("invalid-duration-error-field").innerHTML = '';
  document.getElementById("estimated-trip-price").innerHTML = '';
}


//TO DO: SHORTEN FUNCTION.
export function renderUserTrips(pastTrips, currentTrips, futureTrips, pendingTrips, agency) {
  const pastTripsContainer = document.getElementById('past-trips');
  const presentTripsContainer = document.getElementById('present-trips');
  const futureTripsContainer = document.getElementById('future-trips');
  const pendingTripsContainer = document.getElementById('pending-trips');

  pastTripsContainer.innerHTML = '';
  presentTripsContainer.innerHTML = '';
  futureTripsContainer.innerHTML = '';
  pendingTripsContainer.innerHTML = '';
 
  if (pastTrips.length) {
    pastTrips.forEach(trip => {
      pastTripsContainer.innerHTML += `
        <div class="trip">
        <p>${agency.getDestinationLocationByID(trip.destinationID)}</p>
        <p>${trip.date}</p>
        </div>
      `
    })
  } else {
    pastTripsContainer.innerHTML += `<p> No current trips.</p>`
  }

  if (currentTrips.length) {
    console.log(currentTrips, "currentTrips")
       currentTrips.forEach(trip => {
    presentTripsContainer.innerHTML += `
      <div class="trip">
      <p>${agency.getDestinationLocationByID(trip.destinationID)}</p>
      <p>${trip.date}</p>
      </div>
    `
     })

  } else {
    presentTripsContainer.innerHTML += `<p> No present trips.</p>`
  }
 //future trips
   if (futureTrips.length) {
     console.log("herre instead", futureTrips)
    futureTrips.forEach(trip => {
    futureTripsContainer.innerHTML += `
      <div class="trip">
      <p>${agency.getDestinationLocationByID(trip.destinationID)}</p>
      <p>${trip.date}</p>
      </div>
    `
     })

  } else {
    console.log("inside")
    futureTripsContainer.innerHTML += `<p> No future trips.</p>`
  }

  //pending trips

   if (pendingTrips.length) {
    pendingTrips.forEach(trip => {
    pendingTripsContainer.innerHTML += `
      <div class="trip">
      <p>${agency.getDestinationLocationByID(trip.destinationID)}</p>
      <p>${trip.date}</p>
      </div>
    `
     })

  } else {
    pendingTripsContainer.innerHTML += `<p> No pending trips.</p>`
  }
  
}

export const renderYearlyExpenses = (yearlyExpensesTotal, year) => {
  const yearlyExpenses = document.getElementById('yearly-spending');

  yearlyExpenses.innerHTML = '';
  
  yearlyExpenses.innerHTML += 
  `
  <p>You spent $${yearlyExpensesTotal} in ${year}</p>
  `
}

export const displayPage = (page) => {
  if (page === 'bookATrip') {
    hide('userDashboard')
    show('bookATrip')
  }
  if (page === 'userDashboard') {
    hide('loginPage');
    show('userDashboard');
    show('nav');    
  }
  //from the booking page.
  if (page === 'trips') {
    //hide booking form
    //show user dashboard
    show('userDashboard')
    hide('bookATrip')
  }
}

const hide = (what) => {
  if (what === 'userDashboard') {
    document.getElementById("user-dashboard-page").classList.add('hidden')
  } 
  if (what === 'loginPage') {
    document.getElementById("login-page").classList.add('hidden')
  }
  if (what === 'bookATrip') {
    document.getElementById("book-a-trip").classList.add('hidden')
  }
}

const show = (what) => {
  if (what === 'bookATrip') {
    document.getElementById("book-a-trip").classList.remove('hidden')
  }
  if (what === 'userDashboard') {
    document.getElementById("user-dashboard-page").classList.remove('hidden')
  }
  if (what === 'nav') {
    document.getElementById('nav').classList.remove('hidden')
  }
}

 ///// DISPLAY ERROR MESSAGE    
//TO DO: USE SWITCH STATEMENT HERE.
//TO DO: put this in dom updates file.
export const displayErrorMessage = (err, scenario) => {
  const tripRequestError = document.getElementById("trip-request-error-field");
  const userLoginError = document.getElementById("user-login-error-field");
  
  let message;

  switch (scenario) {
    case "postNewTrip":
      message = "Please fill out all input fields";
      tripRequestError.innerHTML = `${message}`;
      break;
    case "userLoginAuthenticationFailure":
      message = "Invalid user credentials";
      userLoginError.innerHTML = `${message}`;
      break;
    case "fetchUser":
      message = "Invalid login- Please make sure both input fields are filled out";
      userLoginError.innerHTML = `${message}`;
      document.getElementById("password").value = null;
      break;
  }
}


  // let message;

  // if (scenario === "postNewTrip") {
 
  //     message = "Please fill out all input fields";
  //     tripRequestError.innerHTML = `${message}`;
   
  // }
  // if (scenario === "userLoginAuthenticationFailure") {
    
  //     message = "Invalid user credentials";
  //     userLoginError.innerHTML = `${message}`;
    
  // }

  // if (scenario === "fetchUser") {

  //   message = "Invalid login- Please make sure both input fields are filled out";
  //     userLoginError.innerHTML = `${message}`;
  //     document.getElementById("password").value = null;
  // }

export const formatDate = (dateToFormat) => {
  const dividedDate = dateToFormat.split("-");
  const month = dividedDate[1];
  const day = dividedDate[2];
  const year = dividedDate[0];
  const rearrangedDate = [year, month, day];
  return rearrangedDate.join("/");
}
