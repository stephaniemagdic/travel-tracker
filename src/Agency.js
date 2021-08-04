import Trip from './Trip.js';
import Destination from './Destination.js';

class Agency {
  constructor(tripData, destinationData) {
    this.trips = tripData.map(data => new Trip(data));
    this.destinations = destinationData.map(data => new Destination(data))
  }

  // returnTotalNumTrips() {
  //   this.tripData.length;
  // }

  // getTripById(id) {

  // }

  // returnTripsByUser(id, status, date) {
  //   //filter through trips where id matches and return trips.
  //   // filter through where id matches and status matches pending
  // }
  
  // returnTravelerCostPerYear(id) {
  //   //sort by id
  //   //sort all trips
  //   // trip.returnTripCost (reduce)
  // }

}

export default Agency;