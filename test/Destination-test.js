import chai from 'chai';
const expect = chai.expect;
import Destination from '../src/Destination.js'
import Trip from '../src/Trip.js'


describe('Destination', function() {

  let destination;
  let trip;
  let trip2;

  before(() => {
    destination = new Destination({
      "id": 51,
      "destination": "Chicago, Illinois",
      "estimatedLodgingCostPerDay": 60,
      "estimatedFlightCostPerPerson": 150,
      "image": "https://i.ibb.co/LPVszn3/dylan-lapierre-Rfeqh-K9-Bd-VI-unsplash.jpg",
      "alt": "overview of city buildings and a lakeshore"
    })

    trip = new Trip( {
      "id": 203,
      "userID": 51,
      "destinationID": 51,
      "travelers": 1,
      "date": "2021/08/05",
      "duration": 6,
      "status": "approved",
      "suggestedActivities": []
    })

     trip2 = new Trip( {
      "id": 203,
      "userID": 51,
      "destinationID": 51,
      "travelers": 7,
      "date": "2021/08/05",
      "duration": 6,
      "status": "approved",
      "suggestedActivities": []
    })
  });

  it('should return true', function() {
    expect(true).to.equal(true);
  });

  it('should be a function', () => {
    expect(Destination).to.be.a('function');
  });

  it('should be an instance of Destination', () => {
    expect(destination).to.be.an.instanceof(Destination);
  }); 

  it('should store an id', () => {
    expect(destination.id).to.equal(51);
  });

  it('should store an location', () => {
    expect(destination.location).to.equal("Chicago, Illinois");
  });

  it('should store estimated lodging cost per day', () => {
    expect(destination.estLodgingCostPerDay).to.equal(60);
  });

  it('should store estimated flight cost per person', () => {
    expect(destination.estFlightCostPerPerson).to.equal(150);
  });

  it('should store an img url', () => {
    expect(destination.image).to.equal("https://i.ibb.co/LPVszn3/dylan-lapierre-Rfeqh-K9-Bd-VI-unsplash.jpg");
  });

  it('should store an img alt text', () => {
    expect(destination.alt).to.equal("overview of city buildings and a lakeshore");
  });

  it('should return the lodging cost', () => {
    expect(destination.getDestinationLodgingCost(2, 6)).to.equal(120);
    expect(destination.getDestinationLodgingCost(trip.duration, trip.travelers)).to.equal(360);
    expect(destination.getDestinationLodgingCost(2, 7)).to.equal(240);
    expect(destination.getDestinationLodgingCost(trip2.duration, trip2.travelers)).to.equal(720);
  });


  it('should return the flight cost', () => {
    expect(destination.getDestinationFlightCostPerPerson(trip.travelers)).to.equal(150);
    expect(destination.getDestinationFlightCostPerPerson(trip2.travelers)).to.equal(1050);
  });
  


});