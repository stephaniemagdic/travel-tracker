class Destination {
  constructor(destination) {
    this.id = destination.id;
    this.location = destination.destination;
    this.estLodgingCostPerDay = destination.estimatedLodgingCostPerDay;
    this.estFlightCostPerPerson = destination.estimatedFlightCostPerPerson;
    this.image = destination.image;
    this.alt = destination.alt;
  }

  // calculateDestinationCost() {
  //   return this.estLodgingCostPerDay + this.estFlightCostPerPerson;
  // }

  getDestinationLodgingCost(numDays) {
    return parseInt(this.estLodgingCostPerDay * numDays);
  }

  getDestinationFlightCostPerPerson(numTravelers) {
    return parseInt(this.estFlightCostPerPerson * numTravelers);
  }

}

export default Destination;

//how will I forEach through this data to show destinations.. will I go through the agency class once instantiated in that property of agency.destinations.