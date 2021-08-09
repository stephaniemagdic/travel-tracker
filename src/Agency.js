import Trip from './Trip.js';
import Destination from './Destination.js';
// import Traveler from './Traveler.js';

class Agency {
  constructor(tripData, destinationData) {
    this.trips = tripData.map(data => new Trip(data));
    this.destinations = destinationData.map(data => new Destination(data));
    // this.travelers = travelersData.map(data => new Traveler(data));
  }

  returnTotalNumTrips() {
    return this.trips.length;
  }

  //why is this method needed? // in order to grab after we create an instance for fetch after we store in a global variable we want to use the trip id to get trip by id to display the data the cost of the trip*
  getTripById(id) {
    return this.trips.find(trip => trip.id === parseInt(id));
  }

  // findDestination()
  //MAKE THIS A METHOD? //yu would have to make agency global...
  // getDestinationIdByName(name) {
  //   return this.destinations.find(destination => {
  //     destination.location.includes(name);
  //   }).id;
  // }


  // getTripsByUser(usersId, searchType = null, todayDate, searchYear = null) {
  getTripsByUser(usersId, todayDate, searchType, searchYear = null) {
    let usersApprovedTrips = this.trips.filter(trip => trip.userID === usersId && trip.status === 'approved');

    if (searchYear) {
      return usersApprovedTrips
        .filter(trip => parseInt(trip.date.split('/')[0]) === parseInt(searchYear)) 
    }
    if (searchType === 'past') {
      usersApprovedTrips = usersApprovedTrips
        .filter(trip => trip.date < todayDate)
    } else if (searchType === 'current') {
      if (usersApprovedTrips.find(trip => trip.date === todayDate)) {
        return  usersApprovedTrips.find(trip => trip.date === todayDate)
      } else {
        return '';
      }
    } else if (searchType === 'future') {
      usersApprovedTrips = usersApprovedTrips
        .filter(trip => trip.date > todayDate)
    } else if (searchType === 'pending') {
      return this.trips
        .filter(trip => trip.userID === usersId && trip.status === 'pending' && trip.date > todayDate)
        .sort((tripA, tripB) => tripA.date - tripB.date);
    }
   
    return usersApprovedTrips.sort((tripA, tripB) => tripA.date - tripB.date)
  }


 
  getUserYearlyExpenses(userID, searchYear, todayDate) {
  //we dont need a date here so make optional in previous function.

  // this will only bring past trips... 
    return this.getTripsByUser(userID, todayDate, 'past', searchYear)
      .reduce((totalCost, trip) => {
        totalCost += trip.calculateTotalTripCost(this.destinations);
        return totalCost;
      }, 0)

    //if we want to include future also. 
    // we want future also.
    // .getTripsByUser(userID, todayDate, 'future')
  }

  ///new test needed for this one
  //get destination by name by ID
  getDestinationLocationByID(id) {
    return this.destinations.find(destination => destination.id === id).location;
  }
  
}



  

  





  //this could also go on the user ... culd have a property that is set to trips = filter(trip => trip.id === trip.id) // but do they modify their own trips/ or do they? .. look at spec... 
  // returnTravelExpensesPerYearByTraveler(id) {
  // //   //sort by id
  // //   //sort all trips
  // //   // trip.returnTripCost (reduce)

  // //JUST THE YEAR with the last date of 2021 ... so current year!!
  // // also pending trips may or may not be considered paid for.
  // }



export default Agency;


//ANOTHER WAY TO COMPARE DATES:
     // return (
        //   (trip.date.split('/')[0] < todayDate.split('/')[0]) ||
        //   (trip.date.split('/')[0] === todayDate.split('/')[0] &&
        //   trip.date.split('/')[1] < todayDate.split('/')[1]) || 
        //   (trip.date.split('/')[0] === todayDate.split('/')[0] &&
        //   trip.date.split('/')[1] === todayDate.split('/')[1] &&
        //   trip.date.split('/')[2] < todayDate.split('/')[2])
        // ) 