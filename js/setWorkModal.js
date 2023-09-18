function setWorkModal (DomContent,work){
  console.log(DomContent);
  DomContent.children[0].innerHtml = work.title;
  console.log(work.title);
}

export default setWorkModal;

