window.customElements.define('th-cart',
  class ThCart extends HTMLElement{
    constructor(){
      super();
    }

    connectedCallback(){
      this.appendChild(this.style);
      this.appendChild(this.content);
      this.enableAddToCart();
      this.enablePurchaseButtons();
      this.polyfillDialog();
    }

    get style(){
      let style = document.createElement('style');
      style.innerHTML = `

        button{
          font-size: 1.2em;
          border-radius: 6px;
          margin-bottom: 1em;
          box-shadow: 1px 1px 5px black;
        }

        caption{
          font-size: 1.2em;
          font-weight: bold;
          padding-bottom: 1em;
        }

        /* dialog polyfill */
        dialog + .backdrop{
          background-color: rgba(0, 0, 0, 0.8);
        }

        .cart{
            flex: 0 0 15%;
            visibility: hidden;
            background-color: #ccc;
            padding: 1em;
            font-family: sans-serif;
            text-align: center;
        }

        .cart table{
            width: 100%;
            border-collapse: collapse;
        }

        .cart thead td{
            padding-bottom: 1em;
            font-weight: bold;
            text-align: left;
        }

        .cart tbody{
            font-style: italic;
            text-align: left;
        }

        .cart .cart-total, .item-total{
            text-align: right;
        }

        #checkout-dialog{
            height: 75%;
            width: 50%;
        }

        #checkout-dialog::backdrop{
            background-color: rgba(0, 0, 0, 0.8);
        }

        #checkout-dialog button{
            font-size: 0.5em;
            border-radius: 6px;
            margin-bottom: 1em;
            box-shadow: 1px 1px 5px black;
        }

        #checkout-dialog header{
            padding: 0.25em;
            margin-bottom: 1em;
        }

        .dialog-body{
            max-height: 75%;
            overflow-y: auto;
        }

        .show{
            display: inline-block;
        }

        .visible {
          visibility: visible;
        }

      `;
      return style;
    }

    get content(){
      let div = document.createElement('div');
      div.innerHTML = `
        <!-- Template for adding items to the cart -->
        <template id="cart-item">
          <tr data-id="">
            <td colspan="2" class="item-name"></td>
          </tr>
          <tr data-id="">
            <td><span class="item-amount"></span> <span class="item-unit"></span></td>
            <td class="item-total"></td>
          </tr>
        </template>

        <!-- Shopping Cart -->
        <div class="cart">
          <button class="purchase-button">Purchase</button>
          <table class="cart-table">
            <caption>Your Order</caption>
            <thead>
              <tr>
                <td>Total</td>
                <td class="cart-total">$0.00</td>
              </tr>
            </thead>

            <tbody>
            </tbody>
          </table>

          <dialog id="checkout-dialog">
            <header>
              <span class="dialog-buttons">
                <button id="place-order-button">Place Order</button>
                <button id="cancel-order-button">Cancel</button>
              </span>
            </header>

            <div class="dialog-body"></div>
          </dialog>
        </div>

        `;

      return div;
    }



    // =================================================
    // Polyfill for dialog element
    // https://github.com/GoogleChrome/dialog-polyfill
    // =================================================
    polyfillDialog(){
      if(typeof HTMLDialogElement === 'undefined'){
        console.warn(`Native HTML <dialog> === ${typeof HTMLDialogElement}`);
        console.warn(window.navigator.userAgent);
        console.warn('Using polyfill: https://github.com/GoogleChrome/dialog-polyfill');
        let dialogs = this.querySelectorAll('dialog');
        for(let i=0; i<dialogs.length; i++){
          dialogPolyfill.registerDialog(dialogs[i]);
        }
      }
    }


    // ======================
    // Add items to cart
    // ======================
    enableAddToCart(){
      const items = document.querySelectorAll('.item input[type="checkbox"]');
      for(let i=0; i<items.length; i++){
        items[i].addEventListener('click', this.handleAddToCartEvent);
      }

      const imgs = document.querySelectorAll('.item img');
      for(let i=0; i<imgs.length; i++){
        imgs[i].addEventListener('mousedown', this.handleImageDragEvent);
      }
    }

    handleAddToCartEvent(event){
      const itemId = event.srcElement.value;
      console.dir(this);
      if(event.srcElement.checked){
        this.addToCart(itemId);
        //TODO raise an event instead of making local method call 
        // in the context of the input element, this.addToCart is not a function
      }else{
        this.removeFromCart(itemId);
      }
    }

    addToCart(itemId){
      // make cart visible
      let cart = this.querySelector('.cart');
      cart.classList.add('visible');

      // get template, create new writable node
      const item = JSON.parse(window.sessionStorage.getItem(itemId));
      let template = this.querySelector('#cart-item');
      let itemNode = this.importNode(template.content, true);

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
      let tbody = this.querySelector('.cart tbody');
      tbody.appendChild(itemNode);
      updateTotal();
    }

    populateNodeElements(template, selector, value){
      let results = template.querySelectorAll(selector);
      for(let i=0; i<results.length; i++){
        results[i].textContent = value;
      }
    }

    populateNodeAttributes(template, selector, attribute, value){
      let results = template.querySelectorAll(selector);
      for(let i=0; i<results.length; i++){
        results[i].setAttribute(attribute, value);
      }
    }

    updateTotal(){
      let total = 0;
      const itemTotals = this.querySelectorAll('.cart .item-total');
      for(let i=0; i<itemTotals.length; i++){
        let parts = itemTotals[i].innerText.split('$');
        let itemTotal = Number(parts[1]);
        total += itemTotal;
      }

      let cartTotal = this.querySelector('.cart-total');
      let currency = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
      cartTotal.innerHTML = currency.format(total);
    }

    removeFromCart(itemId){
      let nodes = undefined;
      if(itemId){
        nodes = this.querySelectorAll(`tr[data-id="${itemId}"]`);
      }else{
        nodes = this.querySelectorAll(`tr[data-id]`);
      }

      for(let i=0; i<nodes.length; i++){
        nodes[i].remove();
      }
      updateTotal();
    }

    // ===================
    // Purchase button(s)
    // ===================
    enablePurchaseButtons(){
      let purchaseButtons = this.querySelectorAll('.purchase-button');
      for(let i=0; i<purchaseButtons.length; i++){
        purchaseButtons[i].addEventListener('click', this.handlePurchaseEvent);
      }

      let placeOrderButton = this.querySelector('#place-order-button');
      placeOrderButton.addEventListener('click', this.handlePlaceOrderEvent);
      let cancelOrderButton = this.querySelector('#cancel-order-button');
      cancelOrderButton.addEventListener('click', this.handleCancelOrderEvent);
      let checkoutDialog = this.querySelector('#checkout-dialog');
      checkoutDialog.addEventListener('cancel', this.dialogCloseEvent);
      checkoutDialog.addEventListener('close', this.dialogCloseEvent);
    }

    handlePurchaseEvent(event){
      // clone cart from sidebar
      let cart = this.querySelector('.cart-table');
      let dialogBody = this.querySelector('.dialog-body');
      dialogBody.appendChild(cart.cloneNode(true));

      let checkoutDialog = this.querySelector('#checkout-dialog');
      checkoutDialog.showModal();
    }

    handlePlaceOrderEvent(event){
      clearAllCheckedItems();
      removeFromCart();

      let checkoutDialog = this.querySelector('#checkout-dialog');
      checkoutDialog.close('ordered');
    }

    handleCancelOrderEvent(event){
      let checkoutDialog = this.querySelector('#checkout-dialog');
      checkoutDialog.close('cancelled');
    }

    dialogCloseEvent(event){
      let dialogBody = this.querySelector('.dialog-body');
      dialogBody.innerHTML = '';
    }

  }
);
