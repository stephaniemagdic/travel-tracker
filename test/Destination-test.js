import chai from 'chai';
const expect = chai.expect;
import Destination from '../src/Destination.js'

describe('Destination', function() {

  let destination;

  before(() => {
    destination = new Destination({
      "id": 51,
      "destination": "Chicago, Illinois",
      "estimatedLodgingCostPerDay": 60,
      "estimatedFlightCostPerPerson": 150,
      "image": "https://i.ibb.co/LPVszn3/dylan-lapierre-Rfeqh-K9-Bd-VI-unsplash.jpg",
      "alt": "overview of city buildings and a lakeshore"
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


});