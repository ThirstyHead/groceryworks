window.addEventListener('load', init);

let cart = undefined;

function init(){
  addFilter(document.querySelector('input[name="item-filter"]:checked').value);
  enableItemFilter();  
  enableAddToCart();
  cart = [];
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
  let item = event.srcElement.value;
  if(event.srcElement.checked){
    addToCart(item);
  }else{
    removeFromCart(item);
  }
}

function addToCart(item){
  cart.push(item);
  console.dir(cart);
}

function removeFromCart(item){
  cart = cart.filter( (value) => {
    return value !== item;
  });
  console.dir(cart);
}
