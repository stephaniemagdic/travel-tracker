import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/Traveler.js'

describe('Traveler', function() {

  it('should return true', function() {
    expect(true).to.equal(true);
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });


});