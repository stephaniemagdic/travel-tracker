import chai from 'chai';
const expect = chai.expect;
import Agency from '../src/Agency.js'
import Trip from '../src/Trip.js';
import Destination from '../src/Destination.js'
import { agency } from './test-data.js'

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

  it('should store a list of Trips', () => {
    expect(agency.trips[0]).to.deep.equal(
      new Trip( {
        "id": 201,
        "userID": 51,
        "destinationID": 51,
        "travelers": 2,
        "date": "2022/10/16",
        "duration": 6,
        "status": "approved",
        "suggestedActivities": ['skiing', 'hiking']
      })
    );

    expect(agency.trips[0]).to.be.an.instanceof(Trip);
  });

  it('should store a list of Destinations', () => {
    expect(agency.destinations[0]).to.deep.equal(
      new Destination( {
        "id": 51,
        "destination": "Chicago, Illinois",
        "estimatedLodgingCostPerDay": 60,
        "estimatedFlightCostPerPerson": 150,
        "image": "https://i.ibb.co/LPVszn3/dylan-lapierre-Rfeqh-K9-Bd-VI-unsplash.jpg",
        "alt": "overview of city buildings and a lakeshore"
      })
    );

    expect(agency.destinations[0]).to.be.an.instanceof(Destination);
  });

  it('should return the total number of trips', () => {
    expect(agency.returnTotalNumTrips()).to.equal(agency.trips.length);
  });

});


