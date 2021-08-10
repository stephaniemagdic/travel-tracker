class Destination {
  constructor(destination) {
    this.id = destination.id;
    this.location = destination.destination;
    this.estLodgingCostPerDay = destination.estimatedLodgingCostPerDay;
    this.estFlightCostPerPerson = destination.estimatedFlightCostPerPerson;
    this.image = destination.image;
    this.alt = destination.alt;
  }

  getDestinationLodgingCost(numDays, numTravelers) {
    if (numTravelers <= 6) {
      return parseInt(this.estLodgingCostPerDay * numDays);
    } else if (numTravelers > 6 && numTravelers <= 12) {
      return parseInt((this.estLodgingCostPerDay * numDays) * 2) 
    } else if (numTravelers > 12) {
      return parseInt((this.estLodgingCostPerDay * numDays) * 3) 
    }
  }

  getDestinationFlightCostPerPerson(numTravelers) {
    return parseInt(this.estFlightCostPerPerson * numTravelers);
  }
}

export default Destination;

