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
    "id": 204,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2021/08/04",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 205,
    "userID": 51,
    "destinationID": 51,
    "travelers": 2,
    "date": "2022/10/16",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": ['skiing', 'hiking']
  },
  {
    "id": 206,
    "userID": 51,
    "destinationID": 51,
    "travelers": 3,
    "date": "2022/09/16",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 207,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2021/10/16",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 208,
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
    "date": "2021/5/01",
    "duration": 6,
    "status": "pending",
    "suggestedActivities": []
  },
  {
    "id": 209,
    "userID": 53,
    "destinationID": 51,
    "travelers": 1,
    "date": "2021/3/20",
    "duration": 6,
    "status": "pending",
    "suggestedActivities": []
  },
  //pending
  {
    "id": 210,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2021/9/12",
    "duration": 6,
    "status": "pending",
    "suggestedActivities": []
  },
  {
    "id": 211,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2021/02/02",
    "duration": 6,
    "status": "pending",
    "suggestedActivities": []
  },
  //past
  {
    "id": 212,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2020/01/26",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 213,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2021/04/07",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 214,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2020/10/31",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 215,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2023/07/04",
    "duration": 6,
    "status": "pending",
    "suggestedActivities": []
  },
  //different user
  {
    "id": 205,
    "userID": 52,
    "destinationID": 51,
    "travelers": 1,
    "date": "2020/05/25",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
  //future
  {
    "id": 206,
    "userID": 52,
    "destinationID": 51,
    "travelers": 1,
    "date": "2023/08/24",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 216,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2023/11/18",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 217,
    "userID": 51,
    "destinationID": 51,
    "travelers": 1,
    "date": "2023/04/21",
    "duration": 6,
    "status": "pending",
    "suggestedActivities": []
  },
  {
    "id": 218,
    "userID": 52,
    "destinationID": 51,
    "travelers": 1,
    "date": "2023/10/17",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
];

export const currentTrips = [ new Trip({
  "id": 203,
  "userID": 51,
  "destinationID": 51,
  "travelers": 1,
  "date": "2021/08/05",
  "duration": 6,
  "status": "approved",
  "suggestedActivities": []
})]



//DATA FOR PAST TRIPS (STATUS APPROVED, ID OF 51, date previous to )
export const pastTrips = [
  new Trip({
    id: 204,
    userID: 51,
    destinationID: 51,
    travelers: 1,
    date: '2021/08/04',
    duration: 6,
    status: 'approved',
    suggestedActivities: []
  }),
  new Trip({
    id: 212,
    userID: 51,
    destinationID: 51,
    travelers: 1,
    date: '2020/01/26',
    duration: 6,
    status: 'approved',
    suggestedActivities: []
  }),
  new Trip({
    id: 213,
    userID: 51,
    destinationID: 51,
    travelers: 1,
    date: '2021/04/07',
    duration: 6,
    status: 'approved',
    suggestedActivities: []
  }),
  new Trip({
    id: 214,
    userID: 51,
    destinationID: 51,
    travelers: 1,
    date: '2020/10/31',
    duration: 6,
    status: 'approved',
    suggestedActivities: []
  })
]

//data for current trip
export const currentTrip = new Trip( {
  "id": 203,
  "userID": 51,
  "destinationID": 51,
  "travelers": 1,
  "date": "2021/08/05",
  "duration": 6,
  "status": "approved",
  "suggestedActivities": []
})

//data for future trips....

export const futureTrips = [
  new Trip({
    id: 205,
    userID: 51,
    destinationID: 51,
    travelers: 2,
    date: '2022/10/16',
    duration: 6,
    status: 'approved',
    suggestedActivities: [ 'skiing', 'hiking' ]
  }),
  new Trip({
    id: 206,
    userID: 51,
    destinationID: 51,
    travelers: 3,
    date: '2022/09/16',
    duration: 6,
    status: 'approved',
    suggestedActivities: []
  }),
  new Trip({
    id: 207,
    userID: 51,
    destinationID: 51,
    travelers: 1,
    date: '2021/10/16',
    duration: 6,
    status: 'approved',
    suggestedActivities: []
  }),
  new Trip ({
    id: 208,
    userID: 51,
    destinationID: 51,
    travelers: 1,
    date: '2022/10/16',
    duration: 6,
    status: 'approved',
    suggestedActivities: []
  }),
  new Trip ({
    id: 216,
    userID: 51,
    destinationID: 51,
    travelers: 1,
    date: '2023/11/18',
    duration: 6,
    status: 'approved',
    suggestedActivities: []
  })
]



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


