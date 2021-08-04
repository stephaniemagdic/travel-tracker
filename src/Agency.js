import Trip from './Trip.js';
import Destination from './Destination.js';

class Agency {
  constructor(tripData, destinationData) {
    this.trips = tripData.map(data => new Trip(data));
    this.destinations = destinationData.map(data => new Destination(data))
  }

  returnTotalNumTrips() {
    return this.trips.length;
  }

  //  test all below still. -------
  getTripById(id) {
    return this.trips.find(trip => {
      trip.id === id
    })
  }

  // returnTripsByUser(id, status, searchYear) {
  //   this.trips.filter(trip => trip.id === id && trip.status === status && trip.date.split('/').[2] === searchYear)
  // }
  
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