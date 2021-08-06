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
//passing in data to this class...
  calculateTotalTripCost(destinationData) {
    const agentFee = (destinationData.find(destination => destination.id === this.destinationID).calculateDestinationCost() * this.travelers * this.duration) * .10

    console.log("agentFee", agentFee)
    console.log("trip cost", (destinationData.find(destination => destination.id === this.destinationID).calculateDestinationCost() * this.travelers * this.duration))
    console.log("totalTripCost", (destinationData.find(destination => destination.id === this.destinationID).calculateDestinationCost() * this.travelers * this.duration) + agentFee)

    if (this.status === "pending") {
      return 0;
    } else {
      return (destinationData.find(destination => destination.id === this.destinationID).calculateDestinationCost() * this.travelers * this.duration) + agentFee;
      //need to add 10 % on here!*
       // multiply this by .10% and add that on to the total.

      

    }
  }


  // THIS IS FORM VALIDATION, not class prop validation.
  // SAD PATH: validate date test? Does this make sense to put on this class or outside
  // Check against 0 travelers

  //check date length... did you mean to put that you want to travel for a year?

}

export default Trip;

//note you must get the trips arrays length (from fetch call) to assign a trip id.


