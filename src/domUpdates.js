import Glide from '@glidejs/glide'

export const glideSlides = document.getElementById('glide-slides');

    // create a card to display
    // put in a carousel. 
    // make sure they all have event listeners to be able to be selected by id 
    // and populate the form with that city.
    // then .find from all destinations based on that search.

export const renderDestinations = (destinations) => {
  console.log(destinations, "destinations inside of render destinations")
    const config = {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    //check breakpoint pixels.
    breakpoints: {
      1024: {
        perView: 2
      },
      600: {
        perView: 1
      }
    }
}

  let glide = new Glide('.glide', config)
  glideSlides.innerHTML = '';

  destinations.forEach(destination => {
    console.log('destination inside of forEach', destination)
    glideSlides.innerHTML += `
      <li class="glide__slide" id="${destination.id}">
        ${createCard(destination.location, destination.image, destination.alt)}
      </li>
    `
  })

  glide.mount();
  
};


function createCard(destination, img, alt) {

  return `
        <div class="card-top card-img-1 mobile-card-img-size">
          <div class="destination-name-container">
            <img src="${img}" alt="${alt}" >
            <p class="destination-name-label">${destination}</p>
          </div>
        </div>
  `
}


