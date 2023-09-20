import setWorkModal from "./js/setWorkModal.js";
import works from "./js/works.js";

/************** ContactForm **************/
((d) => {
  const $form = d.forms['formulario'],
    $loader = d.querySelector('.contact-form-loader'),
    $response = d.querySelector('.contact-form-response');
  $form.addEventListener( 'submit', (e) => {
    e.preventDefault();
    $loader.classList.remove('none');
    fetch('https://formsubmit.co/ajax/matiscava@hotmail.com', {
      method: 'POST',
      body: new FormData(e.target)
    })
      .then( res => res.ok ? res.json() : Promise.reject(res))
      .then( json => {
        location.hash = '#gracias';
        $form.reset();
      })
      .catch(err => {
        console.error(err);
        const message = err.statusText || "Ocurrió un error al enviar, intenta nuevamento.";
        $response.querySelector('h3').innerHTML = `Error ${err.status}: ${message}`;
      })
      .finally( () => {
        $loader.classList.add('none');
        setTimeout( () => {
          location.hash = '#close';
        }, 3000);
      } );

  } )
})(document);

/************** Menu **************/

( (d) => {
  const $btnMenu = d.querySelector('.menu-btn'),
    $menu = d.querySelector('.menu');
  $btnMenu.addEventListener('click' , (e) => {
    $btnMenu.firstElementChild.classList.toggle('open');
    $menu.classList.toggle('is-active');
  })
  d.addEventListener('click', (e) => {
    if(!e.target.matches('.menu a')) return false;
    $btnMenu.firstElementChild.classList.remove('open');
    $menu.classList.remove('is-active');
  })
} )(document);

/************** Work's Cards **************/

( (d) => {
  const $btnCards = d.querySelectorAll('.portfolio-card'),
    $btnClose = d.querySelectorAll('.modal-close'),
    $modal = d.getElementById('section-work');
    
  $btnCards.forEach($btn => {
    $btn.addEventListener('click', ( e ) => {
      let work = works.find( element => element.id == $btn.getAttribute('data-href'));

      // cargamos el DOM
      setTimeout(() => {
        setWorkModal($modal,work)
      }, 0);
      d.querySelector('body').classList.add('scroll-y-none');
    })
  })
  $btnClose.forEach( $btn => {
    $btn.addEventListener('click', (e) => {
      $modal.classList.remove('visible');
      d.querySelector('body').classList.remove('scroll-y-none');
    })
  })
}

)(document);

/************** Slider **************/

( (d) => {
  const $slider = d.querySelector("#slider"),
    $sliderItem = d.querySelectorAll(".slider-item"),
    $btnRight = d.getElementById("btn-right"),
    $betnLeft = d.getElementById("btn-left");
  let $sliderItemLast = $sliderItem[$sliderItem.length-1];
  let interval = setInterval(() => {
    NextSlide();
  }, 4000);;

  $slider.insertAdjacentElement('afterbegin',$sliderItemLast);

  $btnRight.addEventListener('click',e => {
    e.preventDefault();
    clearInterval(interval);
    interval = setInterval(() => {
      NextSlide();
    }, 4000);
    NextSlide();
  })

  $betnLeft.addEventListener('click',e => {
    e.preventDefault();
    clearInterval(interval);
    interval = setInterval(() => {
      NextSlide();
    }, 4000);
    PrevSlide();
  })

  function NextSlide() {
      let sliderSectionFirst = d.querySelectorAll(".slider-item")[0];
      $slider.style.marginLeft = "-200%";
      $slider.style.transition = "all 1s";
      setTimeout(() => {
        $slider.style.transition = "none";
        $slider.insertAdjacentElement("beforeend", sliderSectionFirst);
        $slider.style.marginLeft = "-100%";
      }, 1000);
  }
  function PrevSlide() {
    let sliderSection = d.querySelectorAll(".slider-item");
    let sliderSectionLast = sliderSection[sliderSection.length-1];
    $slider.style.marginLeft = "0";
    $slider.style.transition = "all 1s";
    
    setTimeout(() => {
      $slider.style.transition = "none";
      $slider.insertAdjacentElement("afterbegin", sliderSectionLast);
      $slider.style.marginLeft = "-100%";
    }, 1000);
    
}

}
)(document);

/************** Work's Cards **************/

((d) => {
  const $sections = d.querySelectorAll('section[data-spy-scroll]');
  let $activeLink = d.querySelector('a[data-spy-scroll][href="#acerca"]');
  const windowWidth = window.innerWidth;

  const cb = (entries) => {
    entries.forEach( (enrty) => {
      const id = enrty.target.getAttribute('id');
      const $link = d.querySelector(`a[data-spy-scroll][href='#${id}']`);
      if(enrty.isIntersecting){
        if($activeLink){
          $activeLink.classList.remove('active');
        }
        $link.classList.add('active');
        $activeLink = $link;
      } else {
        $link.classList.remove('active');
      }
    });
  }

  let thresholdSize;

  if(windowWidth < 992 && windowWidth > 767){

    thresholdSize = [0.2, 0.75]

  } else if( windowWidth < 767) {

    thresholdSize = [0.10, 0.85]

  } else {
    thresholdSize = [0.25, 0.9]
  }

  const observer = new IntersectionObserver(cb, {threshold: thresholdSize})

  $sections.forEach( $section => observer.observe($section));
})(document);