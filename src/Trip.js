class Trip {
  constructor(trip) {
    //note you must get the trips arrays length (from fetch call) to assign a trip id.
    this.id = trip.id;
    this.userID = trip.userID;
    this.destinationID = trip.destinationID;
    this.travelers = trip.travelers;
    this.date = trip.date;
    this.duration = trip.duration;
    this.status = trip.status;
    this.suggestedActivities = trip.suggestedActivities || [];
  }

  //user clicks post .. then trip is created
  // destination repo is passed in to this trip instance and this method is called.

    calculateTotalTripCost(destinationData) {
      return destinationData.find(destination => destination.id === this.destinationID).calculateDestinationCost() * this.travelers * this.duration;
    }


  // THIS IS FORM VALIDATION, not class prop validation.
  // SAD PATH: validate date test? Does this make sense to put on this class or outside
  // Check against 0 travelers

  //check date length... did you mean to put that you want to travel for a year?

}

export default Trip;

//note you must get the trips arrays length (from fetch call) to assign a trip id.


