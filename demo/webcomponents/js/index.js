window.addEventListener('load', init);

function init(){
  fetchItems();
  polyfillDialog();
  enableDialogButtons();
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

function clearAllCheckedItems(){
  const items = document.querySelectorAll('.item input[type="checkbox"]:checked');
  for(let i=0; i<items.length; i++){
    items[i].checked = false;
  }
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
    let dialogs = this.shadowRoot.querySelectorAll('dialog');
    for(let i=0; i<dialogs.length; i++){
      dialogPolyfill.registerDialog(dialogs[i]);
    }
  }
}

// =================================================
// Dialog event handlers
// =================================================
function enableDialogButtons(){
  let placeOrderButton = document.querySelector('#place-order-button');
  placeOrderButton.addEventListener('click', handlePlaceOrderEvent);
  let cancelOrderButton = document.querySelector('#cancel-order-button');
  cancelOrderButton.addEventListener('click', handleCancelOrderEvent);
  let checkoutDialog = document.querySelector('#checkout-dialog');
  checkoutDialog.addEventListener('cancel', handleDialogCloseEvent);
  checkoutDialog.addEventListener('close', handleDialogCloseEvent);
}

function handlePlaceOrderEvent(event){
  clearAllCheckedItems();
  //this.removeFromCart();

  let checkoutDialog = document.querySelector('#checkout-dialog');
  checkoutDialog.close('ordered');
}

function handleCancelOrderEvent(event){
  let checkoutDialog = document.querySelector('#checkout-dialog');
  checkoutDialog.close('cancelled');
}

function handleDialogCloseEvent(event){
  let dialogBody = document.querySelector('.dialog-body');
  dialogBody.innerHTML = '';
}
