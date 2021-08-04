class Traveler {
  constructor(traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
  }

  returnFirstName() {
    return this.name.split(" ")[0]
  }

}

export default Traveler;