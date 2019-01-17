window.addEventListener('load', init);

function init(){
  addFilter(document.querySelector('input[name="item-filter"]:checked').value);
  enableItemFilter();  
}

function enableItemFilter(){
  const itemFilters = document.querySelectorAll('input[name="item-filter"]');
  for(let i=0; i<itemFilters.length; i++){
    itemFilters[i].addEventListener('click', handleFilterEvent);
  }
}

function handleFilterEvent(event){
  addFilter(event.srcElement.value);        
}

function addFilter(filter){
  const allItems = document.querySelectorAll('.item');
  for(let i=0; i<allItems.length; i++){
    let item = allItems[i];
    if(item.dataset.category === filter){
      item.classList.add('show');
    }else{
      item.classList.remove('show');
    }
  }
}
