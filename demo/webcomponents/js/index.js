window.addEventListener('load', init);

function init(){
  fetchItems();
  window.addEventListener('additem', handleAdditemEvent);
}

function handleAdditemEvent(event){
  console.log('global handler');
  console.log(event);
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
