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
        console.log(json);
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
      console.log($modal.querySelector(".portfolio-modal"));
      $modal.querySelector(".portfolio-modal img").setAttribute("src",work.img);
      $modal.querySelector(".portfolio-modal img").setAttribute("alt",work.id);
      $modal.querySelector(".portfolio-modal .portfolio-info").children[0].innerHTML = work.title;
      $modal.querySelector(".portfolio-modal .portfolio-info").children[1].innerHTML = work.description;
      const detailsContainer = $modal.querySelector(".portfolio-modal .portfolio-info").children[2];
      detailsContainer.innerHTML= "";
      for (const key in work.details) {
        if (work.details.hasOwnProperty(key)) {
          const value = work.details[key];
          const $key = d.createElement("b");
          const $smallKey = d.createElement("small");
          $smallKey.appendChild($key);
          const $br = d.createElement("br")
          $key.innerHTML = key.toString().replace(/_/g," ").toUpperCase()+": ";
          const $value = d.createElement("small")
          if(key.match("repositorio") ){
            const $link = d.createElement("a");
            $link.href = value;
            $link.target = "_blank";
            $link.rel = "noopener noreferrer";
            $link.innerHTML = "Link al repositorio";
            $value.appendChild($link);
          } else if(key.match("enlace")){
            const $link = d.createElement("a");
            $link.href = value;
            $link.target = "_blank";
            $link.rel = "noopener noreferrer";
            $link.innerHTML = "Link a la web";
            $value.appendChild($link);
          }else{
            $value.innerHTML = value;
          }
          detailsContainer.appendChild($smallKey);
          detailsContainer.appendChild($value);
          detailsContainer.appendChild($br);
        }
      }

      $modal.classList.add('visible');
      console.log(work);
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