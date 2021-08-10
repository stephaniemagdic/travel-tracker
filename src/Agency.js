import Trip from './Trip.js';
import Destination from './Destination.js';

class Agency {
  constructor(tripData, destinationData) {
    this.trips = tripData.map(data => new Trip(data));
    this.destinations = destinationData.map(data => new Destination(data));
  }

  returnTotalNumTrips() {
    return this.trips.length;
  }

  getTripById(id) {
    return this.trips.find(trip => trip.id === parseInt(id));
  }

  getTripsByUser(usersId, todayDate, searchType, searchYear = null) {
    let usersApprovedTrips = this.trips.filter(trip => trip.userID === usersId && trip.status === 'approved');

    // if (searchYear) {
    //   return usersApprovedTrips
    //     .filter(trip => parseInt(trip.date.split('/')[0]) === parseInt(searchYear)) 
    // }
    if (searchType === 'past') {
      console.log(usersApprovedTrips, "userApprovedTrips");
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

  getUserTripsByYear(usersId, todayDate, searchYear = null) {
    let usersApprovedTrips = this.trips.filter(trip => trip.userID === usersId && trip.status === 'approved');

      return usersApprovedTrips
        .filter(trip => parseInt(trip.date.split('/')[0]) === parseInt(searchYear)) 
  
  }

  getUserYearlyExpenses(userID, searchYear, todayDate) {
    // console.log("this should be past trips", this.getTripsByUser(userID, todayDate, 'past'))
    //although this says past... we are actually searching for all...

    
    
    // return this.getTripsByUser(userID, todayDate, 'past', searchYear)
    return this.getUserTripsByYear(userID, todayDate, searchYear)
      .reduce((totalCost, trip) => {
        
        totalCost += trip.calculateTotalTripCost(this.destinations);
        console.log(trip, totalCost)
        return totalCost;
      }, 0)
  }

  ///new test needed for this one
  //get destination by name by ID
  getDestinationLocationByID(id) {
    return this.destinations.find(destination => destination.id === id).location;
  }
}

export default Agency;

