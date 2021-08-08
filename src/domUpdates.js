import Glide from '@glidejs/glide'
export const glideSlides = document.getElementById('glide-slides');


export const renderDestinations = (destinations) => {
  // console.log(destinations, "destinations inside of render destinations")
  glideSlides.innerHTML = '';

    const config = {
    type: 'carousel',
    startAt: 0,
    perView: 4,
    //check breakpoint pixels.
    breakpoints: {
      1024: {
        perView: 1
      },
      600: {
        perView: 1
      }
    }
}

  let glide = new Glide('.glide', config)
  
  // glideSlides.innerHTML = ''; //moved this up.

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


export function setBookingCalendar(todayDate) {
  let calendar = document.getElementById('start');
  let min = todayDate.split("/").join("-");
  let splitDate = todayDate.split('/');
  splitDate.splice(0, 1, (parseInt(todayDate.split('/')[0]) + 1));
  let max = splitDate.join("-");

  calendar.setAttribute('min', (min.toString()));
  calendar.setAttribute('max', (max.toString()));
}

