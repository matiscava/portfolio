function setWorkModal ($modal,work){
  $modal.querySelector(".portfolio-modal img").setAttribute("src",work.img);
  $modal.querySelector(".portfolio-modal img").setAttribute("alt",work.id);
  $modal.querySelector(".portfolio-modal .portfolio-info").children[0].innerHTML = work.title;
  $modal.querySelector(".portfolio-modal .portfolio-info").children[1].innerHTML = work.description;
  const detailsContainer = $modal.querySelector(".portfolio-modal .portfolio-info").children[2];
  detailsContainer.innerHTML= "";
  for (const key in work.details) {
    if (work.details.hasOwnProperty(key)) {
      const value = work.details[key];
      const $key = document.createElement("b");
      const $smallKey = document.createElement("small");
      $smallKey.appendChild($key);
      const $br = document.createElement("br")
      $key.innerHTML = key.toString().replace(/_/g," ").toUpperCase()+": ";
      const $value = document.createElement("small")
      if(key.match("repositorio") ){
        const $link = document.createElement("a");
        $link.href = value;
        $link.target = "_blank";
        $link.rel = "noopener noreferrer";
        $link.innerHTML = "Link al repositorio";
        $value.appendChild($link);
      } else if(key.match("enlace")){
        const $link = document.createElement("a");
        $link.href = value;
        $link.target = "_blank";
        $link.rel = "noopener noreferrer";
        $link.innerHTML = "Link a la web";
        $value.appendChild($link);
      } else if(key.match("referencia")){
        const $link = document.createElement("a");
        $link.href = value;
        $link.target = "_blank";
        $link.rel = "noopener noreferrer";
        $link.innerHTML = "Link a Linkedin";
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

}

export default setWorkModal;

