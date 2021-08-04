import chai from 'chai';
const expect = chai.expect;
import Trip from '../src/Trip.js'

describe('Trip', function() {
  let trip;

  before(() => {
    trip = new Trip({
      "id": 201,
      "userID": 51,
      "destinationID": 51,
      "travelers": 2,
      "date": "2022/10/16",
      "duration": 6,
      "status": "approved",
      "suggestedActivities": ['skiing', 'hiking']
    })
  });

  it('should return true', function() {
    expect(true).to.equal(true);
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of trip', () => {
    expect(trip).to.be.an.instanceof(Trip);
  }); 

  it('should store an id', () => {
    expect(trip.id).to.equal(201);
  });

  it('should store a user ID', () => {
    expect(trip.userID).to.equal(51);
  });

  it('should store a destination ID', () => {
    expect(trip.destinationID).to.equal(51);
  });

  it('should store a date', () => {
    expect(trip.date).to.equal("2022/10/16");
  });

  it('should store a status', () => {
    expect(trip.status).to.equal("approved");
  });

  it('should store no suggested activities as default', () => {

    const trip2 = new Trip({
      "id": 201,
      "userID": 51,
      "destinationID": 51,
      "travelers": 2,
      "date": "2022/10/16",
      "duration": 6,
      "status": "approved"
    })

    expect(trip2.suggestedActivities).to.deep.equal([]);

  });

  it('should store suggested activities', () => {
    expect(trip.suggestedActivities).to.deep.equal(['skiing', 'hiking'])
  });



});