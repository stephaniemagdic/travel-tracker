import Trip from './Trip.js';
import Destination from './Destination.js';

class Agency {
  constructor(tripData, destinationData) {
    this.trips = tripData.map(data => new Trip(data));
    this.destinations = destinationData.map(data => new Destination(data))
    //travelers// needed for iteration 4
  }

  returnTotalNumTrips() {
    return this.trips.length;
  }

  //why is this method needed? // in order to grab after we create an instance for fetch after we store in a global variable we want to use the trip id to get trip by id to display the data the cost of the trip*
  getTripById(id) {
    return this.trips.find(trip => trip.id === id);
  }

    //#1: we need this for each type of trip (past, current, pending, future to itterate over and display on the dom.)
    //#2: this also will be used to return trips by user just for a year that can then be calculated.
     // return yearly costs
       // return trips by that year... by user id, by status of approved only.
  returnTripsByUser(id, status, searchYear = null) {
    //search year is an optional param.
  
    //is null falsy?
    if (searchYear) {
    return this.trips.filter(trip => trip.id === id && trip.status === status && trip.date.split('/')[2] === searchYear)
    } else {
      return this.trips.filter(trip => trip.id === id && trip.status === status)
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

}

export default Agency;