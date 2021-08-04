import chai from 'chai';
const expect = chai.expect;
import Destination from '../src/Destination.js'

describe('Destination', function() {

  it('should return true', function() {
    expect(true).to.equal(true);
  });

  it('should be a function', () => {
    expect(Destination).to.be.a('function');
  });


});