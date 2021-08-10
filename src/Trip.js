class Trip {
  constructor(trip) {
    this.id = trip.id;
    this.userID = trip.userID;
    this.destinationID = trip.destinationID;
    this.travelers = trip.travelers;
    this.date = trip.date;
    this.duration = trip.duration;
    this.status = trip.status;
    this.suggestedActivities = trip.suggestedActivities || [];
  }

  calculateTotalTripCost(destinationData) {
    const agentFee = (destinationData.find(destination => destination.id === this.destinationID).calculateDestinationCost() * this.travelers * this.duration) * .10
    if (this.status === "pending") {
      return 0;
    } else {
      return (destinationData.find(destination => destination.id === this.destinationID).calculateDestinationCost() * this.travelers * this.duration) + agentFee;
    }
  }


  // WRITE TEST FOR THIS
  //have to write a test for this... this is pending. so have to put logic of pending elsewhere for previous function in order to combing.
       //TO DO: ADD A DECIMAL HERE (TO FIXED TO MAKE MORE USER FRIENDLY)
  calculateNewTripCost(destinationData) {
    const agentFee = (destinationData.find(destination => destination.id === this.destinationID).calculateDestinationCost() * this.travelers * this.duration) * .10;

    return (destinationData.find(destination => destination.id === this.destinationID).calculateDestinationCost() * this.travelers * this.duration) + agentFee;
  }
}

export default Trip;



