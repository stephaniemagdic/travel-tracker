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
    if (this.status === "pending") {
      return 0;
    } else {
      const destinationNeeded = destinationData.find(destination => destination.id === this.destinationID)
      const tripCostBeforeAgentFee = (destinationNeeded.getDestinationLodgingCost(this.duration, this.travelers)) + destinationNeeded.getDestinationFlightCostPerPerson(this.travelers);
      const agentFee = parseInt(tripCostBeforeAgentFee * .10);
      const totalTripCost = parseInt(tripCostBeforeAgentFee  + agentFee);
      return totalTripCost;
    }
  }

  calculateNewTripCost(destinationData) {
    const destinationNeeded = destinationData.find(destination => destination.id === this.destinationID)
    const tripCostBeforeAgentFee = (destinationNeeded.getDestinationLodgingCost(this.duration, this.travelers)) + destinationNeeded.getDestinationFlightCostPerPerson(this.travelers);
    const agentFee = parseInt(tripCostBeforeAgentFee * .10);
    const totalTripCost = parseInt(tripCostBeforeAgentFee  + agentFee);
    return totalTripCost;
  }
}

export default Trip;



