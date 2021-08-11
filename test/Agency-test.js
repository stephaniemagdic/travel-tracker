import chai from 'chai';
const expect = chai.expect;
import Agency from '../src/Agency.js'
import Trip from '../src/Trip.js';
import Destination from '../src/Destination.js'
import { agency, todayDate, tripData, pastTrips, currentTrip, futureTrips, pendingTrips, tripsByYear } from './test-data.js'

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
    expect(agency.trips).to.deep.equal(tripData);

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

  it('should return a trip by id', () => {
    expect(agency.getTripById(203)).to.equal(agency.trips[0]);
  });

  // id, date, search type.. optional.
  it('should return a users past trips', () => {
    expect(agency.getTripsByUser(51, todayDate, 'past')).to.deep.equal(pastTrips);
  });

  it('should return a users current trips', () => {
    expect(agency.getTripsByUser(51, todayDate, 'current')).to.deep.equal(currentTrip);
  });

  it('should return an empty string if there are no current trips', () => {
    expect(agency.getTripsByUser(52, todayDate, 'current')).to.deep.equal('');
  });


  it('should return future trips', () => {
    expect(agency.getTripsByUser(51, todayDate, 'future')).to.deep.equal(futureTrips);
  });

  it('should return pending trips', () => {
    expect(agency.getTripsByUser(51, todayDate,'pending')).to.deep.equal(pendingTrips);
  });

  it('should return all trips regardless of year by default', () => {
    expect(agency.getTripsByUser(51, todayDate, 'past')).to.deep.equal(pastTrips);
    expect(agency.getTripsByUser(51, todayDate, 'past')[0].date).to.equal('2021/08/04');
    expect(agency.getTripsByUser(51, todayDate, 'past')[1].date).to.equal('2020/01/26');
  });

 it('should return trips by year REFACTORED', () => {
    expect(agency.getUserTripsByYear(51, todayDate, 2021)).to.deep.equal(tripsByYear);
    expect(agency.getUserTripsByYear(51, todayDate, 2021)[0].date).to.equal(
      '2021/08/05');
    expect(agency.getUserTripsByYear(51, todayDate, 2021)[2].date).to.equal('2021/10/16');
  });

  it('should return yearly expenses for a single user', () => {
    expect(agency.getUserYearlyExpenses(51, 2021, todayDate)).to.equal(1683);
  });

  it('should return a destination location based on id', () => {
      expect(agency.getDestinationLocationByID(51)).to.equal("Chicago, Illinois");
  });
});

