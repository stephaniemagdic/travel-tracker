import Trip from '../src/Trip.js'
import Destination from '../src/Destination.js'
import Agency from '../src/Agency.js';

export const todayDate = "2021/08/05";

export const tripData = [
  //currentTrip
  {
    "id": 203,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2021/08/05",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 201,
    "userID": 51,
    "destinationID": 51,
    "travelers": 2,
    "date": "2022/10/16",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": ['skiing', 'hiking']
  },
  {
    "id": 202,
    "userID": 51,
    "destinationID": 51,
    "travelers": 3,
    "date": "2022/9/16",
    "duration": 6,
    "status": "approved",
  },
  {
    "id": 203,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2021/10/16",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 203,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2022/10/16",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 203,
    "userID": 52,
    "destinationID": 51,
    "travelers": 1,
    "date": "2021/10/16",
    "duration": 6,
    "status": "pending",
    "suggestedActivities": []
  },
  {
    "id": 203,
    "userID": 53,
    "destinationID": 51,
    "travelers": 1,
    "date": "2021/10/16",
    "duration": 6,
    "status": "pending",
    "suggestedActivities": []
  },
  //pending
  {
    "id": 203,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2021/10/16",
    "duration": 6,
    "status": "pending",
    "suggestedActivities": []
  },
  {
    "id": 203,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2021/10/16",
    "duration": 6,
    "status": "pending",
    "suggestedActivities": []
  },
  //past
  {
    "id": 203,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2020/10/16",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 203,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2020/10/16",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 203,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2020/10/16",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 203,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2020/10/16",
    "duration": 6,
    "status": "pending",
    "suggestedActivities": []
  },
  //different user
  {
    "id": 203,
    "userID": 52,
    "destinationID": 51,
    "travelers": 1,
    "date": "2020/10/16",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
  //future
  {
    "id": 203,
    "userID": 52,
    "destinationID": 51,
    "travelers": 1,
    "date": "2023/10/16",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 203,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2023/10/16",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 203,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2023/10/16",
    "duration": 6,
    "status": "pending",
    "suggestedActivities": []
  },
  {
    "id": 203,
    "userID": 52,
    "destinationID": 51,
    "travelers": 1,
    "date": "2023/10/16",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
];


export const destinationData = [
  {
    "id": 51,
    "destination": "Chicago, Illinois",
    "estimatedLodgingCostPerDay": 60,
    "estimatedFlightCostPerPerson": 150,
    "image": "https://i.ibb.co/LPVszn3/dylan-lapierre-Rfeqh-K9-Bd-VI-unsplash.jpg",
    "alt": "overview of city buildings and a lakeshore"
  },
  {
    "id": 52,
    "destination": "Pickerel Lake, Wisconsin",
    "estimatedLodgingCostPerDay": 150,
    "estimatedFlightCostPerPerson": 200,
    "image": "https://i.ibb.co/LPVszn3/dylan-lapierre-Rfeqh-K9-Bd-VI-unsplash.jpg",
    "alt": "paddleboat on lake with a sunset"
  },
  {
    "id": 53,
    "destination": "Nederland, Colorado",
    "estimatedLodgingCostPerDay": 100,
    "estimatedFlightCostPerPerson": 60,
    "image": "https://i.ibb.co/LPVszn3/dylan-lapierre-Rfeqh-K9-Bd-VI-unsplash.jpg",
    "alt": "frozen man in a block of ice"
  }
];

export const agency = new Agency(tripData, destinationData);


