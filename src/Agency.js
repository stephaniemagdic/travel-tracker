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
  
  //  getTripsByUser(usersId, status = "approved", todayDate, searchYear = null) {
  getTripsByUser(usersId, searchType, todayDate, searchYear = null) {
  //search year is an optional param.
    let userApprovedTrips = this.trips.filter(trip => trip.userID === usersId &&trip.status === 'approved');

    


    // if (searchYear) {
    //   userApprovedTrips = userApprovedTrips.filter(trip => trip.date.split('/')[2] === searchYear)
    // }


    if (searchType === 'past') {
      return userApprovedTrips.filter(trip => {
       
    
      ///You can do a string comparison to make this simpler.. who knew? '2021/09/05' < '2021/10/05' true.
    
      //put in seperate fucntion that is called format date//
        return (
          (trip.date.split('/')[0] < todayDate.split('/')[0]) ||
          (trip.date.split('/')[0] === todayDate.split('/')[0] &&
          trip.date.split('/')[1] < todayDate.split('/')[1]) || 
          (trip.date.split('/')[0] === todayDate.split('/')[0] &&
          trip.date.split('/')[1] === todayDate.split('/')[1] &&
          trip.date.split('/')[2] < todayDate.split('/')[2])
        ) 
      }).sort((tripA, tripB) => tripA.date - tripB.date);
    } else if (searchType === 'current') {
      userApprovedTrips = userApprovedTrips.filter( trip => trip.status === 'approved');

      if (userApprovedTrips.find(trip => trip.date === todayDate)) {
       
        return  userApprovedTrips.find(trip => trip.date === todayDate)
      } else {
  
        return '';
      }
    } else if (searchType === 'future') {
      return userApprovedTrips.filter(trip => trip.date > todayDate)
    } else if (searchType === 'pending') {
      //pending status and only in the future.
      console.log("pending--->", this.trips.filter(trip => trip.userID === usersId &&trip.status === 'pending'))
      return this.trips.filter(trip => trip.userID === usersId &&trip.status === 'pending' && trip.date > todayDate);
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