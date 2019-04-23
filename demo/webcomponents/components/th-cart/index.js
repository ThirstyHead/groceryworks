window.customElements.define('th-cart',
  class ThCart extends HTMLElement{
    constructor(){
      super();
    }

    connectedCallback(){
      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(this.style);
      shadowRoot.appendChild(this.content);
      this.enablePurchaseButtons();
      window.addEventListener('additem', (e) => this.handleAdditemEvent(e));
      window.addEventListener('removeitem', (e) => this.handleRemoveitemEvent(e));
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

        .cart{
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

        </div>

        `;

      return div;
    }

    handleAdditemEvent(event){
      this.addToCart(event.detail.itemId);
    }

    handleRemoveitemEvent(event){
      this.removeFromCart(event.detail.itemId);
    }

    addToCart(itemId){
      // make cart visible
      let cart = this.shadowRoot.querySelector('.cart');
      cart.classList.add('visible');

      // get template, create new writable node
      const item = JSON.parse(window.sessionStorage.getItem(itemId));
      let template = this.shadowRoot.querySelector('#cart-item');
      let itemNode = document.importNode(template.content, true);

      // populate new node
      this.populateNodeAttributes(itemNode, 'tr[data-id]', 'data-id', item.id);
      this.populateNodeElements(itemNode, '.item-name', item.name);
      this.populateNodeElements(itemNode, '.item-amount', 1);

      if(item.unit !== 'each'){
        this.populateNodeElements(itemNode, '.item-unit', item.unit);
      }

      let currency = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
      this.populateNodeElements(itemNode, '.item-total', currency.format(item.price));

      // add new node to table in DOM
      let tbody = this.shadowRoot.querySelector('.cart tbody');
      tbody.appendChild(itemNode);
      this.updateTotal();
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
      const itemTotals = this.shadowRoot.querySelectorAll('.cart .item-total');
      for(let i=0; i<itemTotals.length; i++){
        let parts = itemTotals[i].innerText.split('$');
        let itemTotal = Number(parts[1]);
        total += itemTotal;
      }

      let cartTotal = this.shadowRoot.querySelector('.cart-total');
      let currency = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
      cartTotal.innerHTML = currency.format(total);
    }

    removeFromCart(itemId){
      let nodes = undefined;
      if(itemId){
        nodes = this.shadowRoot.querySelectorAll(`tr[data-id="${itemId}"]`);
      }else{
        nodes = this.shadowRoot.querySelectorAll(`tr[data-id]`);
      }

      for(let i=0; i<nodes.length; i++){
        nodes[i].remove();
      }
      this.updateTotal();
    }

    // ===================
    // Purchase button(s)
    // ===================
    enablePurchaseButtons(){
      let purchaseButtons = this.shadowRoot.querySelectorAll('.purchase-button');
      for(let i=0; i<purchaseButtons.length; i++){
        purchaseButtons[i].addEventListener('click', (e) => this.handlePurchaseEvent(e));
      }

    }

    handlePurchaseEvent(event){
      // clone cart from sidebar
      let cart = this.shadowRoot.querySelector('.cart-table');
      let dialogBody = document.querySelector('.dialog-body');
      dialogBody.appendChild(cart.cloneNode(true));

      let checkoutDialog = document.querySelector('#checkout-dialog');
      checkoutDialog.showModal();
    }

  }
);
