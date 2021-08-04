import chai from 'chai';
const expect = chai.expect;
import Trip from '../src/Trip.js'

describe('Trip', function() {

  it('should return true', function() {
    expect(true).to.equal(true);
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });


});