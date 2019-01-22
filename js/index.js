window.addEventListener('load', init);

function init(){
  addFilter(document.querySelector('input[name="item-filter"]:checked').value);
  enableItemFilter();  
  enableAddToCart();
  fetchItems();
}

// ========================
// Fetch items from server
// ========================
function fetchItems(){
  fetch('items.json')
    .then( response => response.json() )
    .then( json => saveItems(json) )
    .catch( error => console.error(error) );
}

function saveItems(json){
  sessionStorage.clear();
  for(let i=0; i<json.items.length; i++){
    const item = json.items[i];
    window.sessionStorage.setItem(item.id, JSON.stringify(item)); }
}

// ======================
// Filter items onscreen
// ======================
function enableItemFilter(){
  const itemFilters = document.querySelectorAll('input[name="item-filter"]');
  for(let i=0; i<itemFilters.length; i++){
    itemFilters[i].addEventListener('click', handleFilterEvent);
  }
}

function handleFilterEvent(event){
  addFilter(event.srcElement.value);        
}

function addFilter(category){
  const allItems = document.querySelectorAll('.item');
  for(let i=0; i<allItems.length; i++){
    let item = allItems[i];
    if(item.dataset.category === category){
      item.classList.add('show');
    }else{
      item.classList.remove('show');
    }
  }
}

// ======================
// Add items to cart
// ======================
function enableAddToCart(){
  const items = document.querySelectorAll('.item input[type="checkbox"]');
  for(let i=0; i<items.length; i++){
    items[i].addEventListener('click', handleAddToCartEvent);
  }
}

function handleAddToCartEvent(event){
  const itemId = event.srcElement.value;
  if(event.srcElement.checked){
    addToCart(itemId);
  }else{
    removeFromCart(itemId);
  }
}

function addToCart(itemId){
  let cart = document.querySelector('.cart');
  cart.classList.add('visible');
  const item = JSON.parse(window.sessionStorage.getItem(itemId));
}

function removeFromCart(itemId){
  let cart = document.querySelector('.cart');
  cart.classList.remove('visible');
}
