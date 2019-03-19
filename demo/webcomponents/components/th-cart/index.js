window.customElements.define('th-sidebar',
  class ThSidebar extends HTMLElement{
    constructor(){
      super();
    }

    connectedCallback(){
      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(this.style);
      shadowRoot.appendChild(this.content);
      window.addFilter(shadowRoot.querySelector('input[name="item-filter"]:checked').value);
      this.enableItemFilter();
    }

    get style(){
      let style = document.createElement('style');
      style.innerHTML = `
        .switch-field label {
          display: block;
          width: 5em;
          background-color: #ccc;
          text-align: center;
          padding: 1em;
          font-family: sans-serif;
          user-select: none;
          -webkit-user-select: none;
          cursor: pointer;
        }

        .switch-field input:checked + label {
          background-color: #A5DC86;
        }

        .switch-field input[type='radio']{
          display: none;
        }
      `;
      return style;
    }

    get content(){
      let div = document.createElement('div');
      div.classList.add('sidebar');
      div.innerHTML = `
        <div class="switch-field">
          <input type="radio" id="beans" name="item-filter" value="beans" checked/>
          <label for="beans">Beans</label>
          <input type="radio" id="nuts" name="item-filter" value="nuts" />
          <label for="nuts">Nuts</label>
          <input type="radio" id="pasta" name="item-filter" value="pasta" />
          <label for="pasta">Pasta</label>
          <input type="radio" id="produce" name="item-filter" value="produce" />
          <label for="produce">Produce</label>
        </div>

      `;
      return div;
    }

    enableItemFilter(){
      const itemFilters = this.shadowRoot.querySelectorAll('input[name="item-filter"]');
      for(let i=0; i<itemFilters.length; i++){
        itemFilters[i].addEventListener('click', this.handleFilterEvent);
      }
    }

    handleFilterEvent(event){
      window.addFilter(event.srcElement.value);        
    }
  }
);
