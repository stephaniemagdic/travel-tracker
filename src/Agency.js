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

  getTripsByUser(usersId, searchType, todayDate, searchYear = null) {
    let userApprovedTrips = this.trips.filter(trip => trip.userID === usersId &&trip.status === 'approved');

    if (searchType === 'past') {
      if (searchYear) {
        return userApprovedTrips = userApprovedTrips.filter(trip => trip.date.split('/')[2] === searchYear)
      }
      
      userApprovedTrips = userApprovedTrips.filter(trip => {
      ///You can do a string comparison to make this simpler.. who knew? '2021/09/05' < '2021/10/05' true.
      //put in seperate fucntion that is called format date// ******
        return (
          (trip.date.split('/')[0] < todayDate.split('/')[0]) ||
          (trip.date.split('/')[0] === todayDate.split('/')[0] &&
          trip.date.split('/')[1] < todayDate.split('/')[1]) || 
          (trip.date.split('/')[0] === todayDate.split('/')[0] &&
          trip.date.split('/')[1] === todayDate.split('/')[1] &&
          trip.date.split('/')[2] < todayDate.split('/')[2])
        ) 
      }).sort((tripA, tripB) => tripA.date - tripB.date);
      console.log(userApprovedTrips);
    } else if (searchType === 'current') {
      if (userApprovedTrips.find(trip => trip.date === todayDate)) {
        return  userApprovedTrips.find(trip => trip.date === todayDate)
      } else {
        return '';
      }
    } else if (searchType === 'future') {
      userApprovedTrips = userApprovedTrips
        .filter(trip => trip.date > todayDate)
    } else if (searchType === 'pending') {
      return this.trips
        .filter(trip => trip.userID === usersId &&trip.status === 'pending' && trip.date > todayDate)
        .sort((tripA, tripB) => tripA.date - tripB.date);
    }
    // sort once here.... and return once. * 
    return userApprovedTrips.sort((tripA, tripB) => tripA.date - tripB.date)
    
  }


  //#2: this also will be used to return trips by user just for a year that can then be calculated.

  getUserYearlyExpenses(userID, searchYear, todayDate) {
    //we dont need a date here so make optional in previous function.
    return this.getTripsByUser(userID, 'past', todayDate, searchYear)
      .reduce((totalCost, trip) => {
        totalCost += trip.calculateTotalTripCost(this.destinations);
        return totalCost;
      }, 0)

    // forEach trip .... 
    // call the caclulateTotalTripCost(this.destinations) on each item ...and accumulate.
    //return that total*

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