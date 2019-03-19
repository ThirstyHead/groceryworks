window.addEventListener('load', init);

function init(){
  enableAddToCart();
  enablePurchaseButtons();
  fetchItems();
  polyfillDialog();
}

// =================================================
// Polyfill for dialog element
// https://github.com/GoogleChrome/dialog-polyfill
// =================================================
function polyfillDialog(){
  if(typeof HTMLDialogElement === 'undefined'){
    console.warn(`Native HTML <dialog> === ${typeof HTMLDialogElement}`);
    console.warn(window.navigator.userAgent);
    console.warn('Using polyfill: https://github.com/GoogleChrome/dialog-polyfill');
    let dialogs = document.querySelectorAll('dialog');
    for(let i=0; i<dialogs.length; i++){
      dialogPolyfill.registerDialog(dialogs[i]);
    }
  }

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

  const imgs = document.querySelectorAll('.item img');
  for(let i=0; i<imgs.length; i++){
    imgs[i].addEventListener('mousedown', handleImageDragEvent);
  }
}

function handleImageDragEvent(event){
  //disable images from being dragged out of browser window
  event.preventDefault();
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
  // make cart visible
  let cart = document.querySelector('.cart');
  cart.classList.add('visible');

  // get template, create new writable node
  const item = JSON.parse(window.sessionStorage.getItem(itemId));
  let template = document.querySelector('#cart-item');
  let itemNode = document.importNode(template.content, true);

  // populate new node
  populateNodeAttributes(itemNode, 'tr[data-id]', 'data-id', item.id);
  populateNodeElements(itemNode, '.item-name', item.name);
  populateNodeElements(itemNode, '.item-amount', 1);

  if(item.unit !== 'each'){
    populateNodeElements(itemNode, '.item-unit', item.unit);
  }

  let currency = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
  populateNodeElements(itemNode, '.item-total', currency.format(item.price));

  // add new node to table in DOM
  let tbody = document.querySelector('.cart tbody');
  tbody.appendChild(itemNode);
  updateTotal();
}

function populateNodeElements(template, selector, value){
  let results = template.querySelectorAll(selector);
  for(let i=0; i<results.length; i++){
    results[i].textContent = value;
  }
}

function populateNodeAttributes(template, selector, attribute, value){
  let results = template.querySelectorAll(selector);
  for(let i=0; i<results.length; i++){
    results[i].setAttribute(attribute, value);
  }
}

function updateTotal(){
  let total = 0;
  const itemTotals = document.querySelectorAll('.cart .item-total');
  for(let i=0; i<itemTotals.length; i++){
    let parts = itemTotals[i].innerText.split('$');
    let itemTotal = Number(parts[1]);
    total += itemTotal;
  }

  let cartTotal = document.querySelector('.cart-total');
  let currency = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
  cartTotal.innerHTML = currency.format(total);
}

function removeFromCart(itemId){
  let nodes = undefined;
  if(itemId){
    nodes = document.querySelectorAll(`tr[data-id="${itemId}"]`);
  }else{
    nodes = document.querySelectorAll(`tr[data-id]`);
  }

  for(let i=0; i<nodes.length; i++){
    nodes[i].remove();
  }
  updateTotal();
}

function clearAllCheckedItems(){
  const items = document.querySelectorAll('.item input[type="checkbox"]:checked');
  for(let i=0; i<items.length; i++){
    items[i].checked = false;
  }
}

// ===================
// Purchase button(s)
// ===================
function enablePurchaseButtons(){
  let purchaseButtons = document.querySelectorAll('.purchase-button');
  for(let i=0; i<purchaseButtons.length; i++){
    purchaseButtons[i].addEventListener('click', handlePurchaseEvent);
  }

  let placeOrderButton = document.querySelector('#place-order-button');
  placeOrderButton.addEventListener('click', handlePlaceOrderEvent);
  let cancelOrderButton = document.querySelector('#cancel-order-button');
  cancelOrderButton.addEventListener('click', handleCancelOrderEvent);
  let checkoutDialog = document.querySelector('#checkout-dialog');
  checkoutDialog.addEventListener('cancel', dialogCloseEvent);
  checkoutDialog.addEventListener('close', dialogCloseEvent);
}

function handlePurchaseEvent(event){
  // clone cart from sidebar
  let cart = document.querySelector('.cart-table');
  let dialogBody = document.querySelector('.dialog-body');
  dialogBody.appendChild(cart.cloneNode(true));

  let checkoutDialog = document.querySelector('#checkout-dialog');
  checkoutDialog.showModal();
}

function handlePlaceOrderEvent(event){
  clearAllCheckedItems();
  removeFromCart();

  let checkoutDialog = document.querySelector('#checkout-dialog');
  checkoutDialog.close('ordered');
}

function handleCancelOrderEvent(event){
  let checkoutDialog = document.querySelector('#checkout-dialog');
  checkoutDialog.close('cancelled');
}

function dialogCloseEvent(event){
  let dialogBody = document.querySelector('.dialog-body');
  dialogBody.innerHTML = '';
}
