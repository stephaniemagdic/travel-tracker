import chai from 'chai';
const expect = chai.expect;
import Agency from '../src/Agency.js'
// import Trip from '../src/Trip.js'
// import Destination from '../src/Destination.js'
// import tripData from './test-data.js'
import { agency } from './test-data.js'
// import destinationData from './test-data.js'

describe('Agency', function() {

  it('should return true', function() {
    expect(true).to.equal(true);
  });

  it('should be a function', () => {
    expect(Agency).to.be.a('function');
  });

  it('should be an instance of Agency', () => {
    expect(agency).to.be.an.instanceof(Agency);
  }); 

  // it('should store an id', () => {
  //   expect(trip.id).to.equal(201);
  // });


});


