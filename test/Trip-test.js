import chai from 'chai';
const expect = chai.expect;
import Trip from '../src/Trip.js'
import Destination from '../src/Destination.js'


//PUT TEST DATA IN A SEPERATE FILE*** 
describe('Trip', function() {
  let trip;
  let destinationData;

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

    destinationData = [new Destination({
      "id": 51,
      "destination": "Chicago, Illinois",
      "estimatedLodgingCostPerDay": 60,
      "estimatedFlightCostPerPerson": 150,
      "image": "https://i.ibb.co/LPVszn3/dylan-lapierre-Rfeqh-K9-Bd-VI-unsplash.jpg",
      "alt": "overview of city buildings and a lakeshore"
    }),

    new Destination({
      "id": 52,
      "destination": "Cedar Lake, Indiana",
      "estimatedLodgingCostPerDay": 50,
      "estimatedFlightCostPerPerson": 100,
      "image": "https://i.ibb.co/LPVszn3/dylan-lapierre-Rfeqh-K9-Bd-VI-unsplash.jpg",
      "alt": "two boats on the lake making waves"
    })
   ]

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

  it('should return the total trip cost', () => {
    expect(trip.calculateTotalTripCost(destinationData)).to.equal(2520)
  });

  //ADD TEST FOR PENDING TRIP... cost is 0...**


});