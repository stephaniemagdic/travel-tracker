
export const renderDestinations = (destinations) => {
  const destinationsContainer = document.getElementById('destinations-container') 
  destinations.forEach(destination => {
    destinationsContainer.innerHTML += 


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