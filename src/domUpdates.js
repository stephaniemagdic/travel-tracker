import Glide from '@glidejs/glide'
export const glideSlides = document.getElementById('glide-slides');


export const renderDestinations = (destinations) => {
  // console.log(destinations, "destinations inside of render destinations")
  glideSlides.innerHTML = '';

    const config = {
    type: 'carousel',
    startAt: 0,
    perView: 4,
    //check breakpoint pixels.
    breakpoints: {
      1024: {
        perView: 1
      },
      600: {
        perView: 1
      }
    }
}

  let glide = new Glide('.glide', config)
  
  // glideSlides.innerHTML = ''; //moved this up.

  destinations.forEach(destination => {

    glideSlides.innerHTML += `
      <li class="glide__slide" id="${destination.id}">
        ${createCard(destination.location, destination.image, destination.alt)}
      </li>
    `
  })
  glide.mount();
  
};

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

export function clearTripRequestErrorField() {
  document.getElementById('trip-request-error-field').innerHTML = ''
  document.getElementById("invalid-destination-error-field").innerHTML = '';

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
        <div>
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
      <div>
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
      <div>
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
      <div>
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
//TO DO: user ternary operator.
//TO DO: put this in dom updates file.
export const displayErrorMessage = (err, scenario) => {
  const tripRequestError = document.getElementById("trip-request-error-field");
  const userLoginError = document.getElementById("user-login-error-field");
  

  let message;

  if (scenario === "postNewTrip") {
 
      message = "Please fill out all input fields";
      tripRequestError.innerHTML = `${message}`;
   
  }
  if (scenario === "userLoginAuthenticationFailure") {
    
      message = "Invalid user credentials";
      userLoginError.innerHTML = `${message}`;
    
  }

  if (scenario === "fetchUser") {

    message = "Invalid login. Please make sure both input fields are filled out";
      userLoginError.innerHTML = `${message}`;
      document.getElementById("password").value = null;
  }

}

