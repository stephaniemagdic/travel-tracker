import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/Traveler.js'

describe('Traveler', function() {

  let traveler;

  before(() => {
    traveler = new Traveler({
      "id": 51,
      "name": "Stephanie Magdic", 
      "travelerType": "relaxer"
    })
  });

  it('should return true', function() {
    expect(true).to.equal(true);
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(traveler).to.be.an.instanceof(Traveler);
  }); 

  it('should store an id', () => {
    expect(traveler.id).to.equal(51);
  });

  it('should store a name', () => {
    expect(traveler.name).to.equal("Stephanie Magdic");
  });

  it('should store a traveler type', () => {
    expect(traveler.travelerType).to.equal("relaxer");
  });

  it('should return a travelers first name', () => {
    expect(traveler.returnFirstName()).to.equal("Stephanie");
  });


});