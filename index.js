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
    $btnClose = d.querySelectorAll('.modal-close');
  $btnCards.forEach($btn => {
    $btn.addEventListener('click', ( e ) => {
      console.log('click');
      d.querySelector('body').classList.add('scroll-y-none');
    })
  })
  $btnClose.forEach( $btn => {
    $btn.addEventListener('click', (e) => {
      d.querySelector('body').classList.remove('scroll-y-none');
    })
  })
}

)(document)