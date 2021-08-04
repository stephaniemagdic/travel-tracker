class Destination {
  constructor(destination) {
    this.id = destination.id;
    this.location = destination.destination;
    this.estLodgingCostPerDay = destination.estimatedLodgingCostPerDay;
    this.estFlightCostPerPerson = destination.estimatedFlightCostPerPerson;
    this.image = destination.image;
    this.alt = destination.alt;
  }

}

export default Destination;

//how will I forEach through this data to show destinations.. will I go through the agency class once instantiated in that property of agency.destinations.