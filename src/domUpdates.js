import Glide from '@glidejs/glide'

export const renderDestinations = (destinations) => {

  const config = {
      
    type: 'carousel',
    startAt: 0,
    perView: 3
  
}

new Glide('.glide', config).mount()


  
  const glideTrack = document.getElementById('glide__track');

    destinations.forEach(destination => {
    glideTrack.innerHTML += 

    // create a card to display
    // put in a carousel. 
    // make sure they all have event listeners to be able to be selected by id 
    // and populate the form with that city.
    // then .find from all destinations based on that search.


      <li class="glide__slide" >
           //html for a card below goes in here.

      </li>
            

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