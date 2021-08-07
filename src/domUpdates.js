
export const renderDestinations = (destinations) => {
  const destinationsContainer = document.getElementById('destinations-container') 
  destinationsContainer.innerHTML = '';
  destinations.forEach(destination => {
    destinationsContainer.innerHTML += 

    // create a card to display
    // put in a carousel. 
    // make sure they all have event listeners to be able to be selected by id 
    // and populate the form with that city.
    // then .find from all destinations based on that search.

    `<p>
      ${destination.id}
    </p>
      ${destination.location}
    <p>
      ${destination.estLodgingCostPerDay}
    </p>

    <p>
      ${destination.estFlightCostPerPerson}
    </p>

    <p>
    ${destination.image}
  </p>

  <p>
    ${destination.alt}
  </p>
  

    `
  })
  
};