window.customElements.define('th-itemlist',
  class ThItemlist extends HTMLElement{
    constructor(){
      super();
    }

    connectedCallback(){
      this.appendChild(this.style);
      this.appendChild(this.content);
    }

    get style(){
      let style = document.createElement('style');
      style.innerHTML = `
        .item{
          display: none;
          background-color: white;
          border-radius: 6px;
          width: 12em;
          height: 11em;
          padding: 1em;
          margin: 1em;
          text-align: center;
          cursor: pointer;
          user-select: none;
          -webkit-user-select: none;
        }

        .item img{
          height: 75%;
          object-fit: contain;
          border-radius: 6px;
          border: 1px solid #ccc;
          user-select: none;
          -webkit-user-select: none;
        }

        .item input[type='checkbox']{
          display: none;
        }

        .item input[type='checkbox']:checked ~ p{
          font-weight: bold;
          font-style: italic;
          color: green;
        }

        .item input[type='checkbox']:checked ~ p::after{
          content: ' \\02713 ';
          /* HTML entity for &check; in hex */
          /* https://dev.w3.org/html5/html-author/charref */
        }

        .item .price::before{
          content: '';
          display: block;
        }
              
        .show{
          display: inline-block;
        }

      `;
      return style;
    }

    get content(){
      let div = document.createElement('main');
      div.innerHTML = `

         <label class="item" data-category="beans">
          <input type="checkbox" value="flax-seeds">
          <img src="img/beans/flax-seeds_200px.jpg"
               alt="Flax Seeds">
          <p>
            Flax Seeds
            <span class="price">$0.59 / lb</span>
          </p>
        </label>
        <label class="item" data-category="beans">
          <input type="checkbox" value="french-green-lentils">
          <img src="img/beans/french-green-lentils_200px.jpg"
               alt="French Green Lentils">
          <p>
            French Green Lentils
            <span class="price">$0.99 / lb</span>
          </p>
        </label>
        <label class="item" data-category="beans">
          <input type="checkbox" value="green-split-peas">
          <img src="img/beans/green-split-peas_200px.jpg"
               alt="Green Split Peas">
          <p>
            Green Split Peas
            <span class="price">$0.59 / lb</span>
          </p>
        </label>
        <label class="item" data-category="beans">
          <input type="checkbox" value="lentils">
          <img src="img/beans/lentils_200px.jpg"
               alt="Lentils">
          <p>
            Lentils
            <span class="price">$0.79 / lb</span>
          </p>
        </label>
        <label class="item" data-category="beans">
          <input type="checkbox" value="pinto-beans">
          <img src="img/beans/pinto-beans_200px.jpg"
               alt="Pinto Beans">
          <p>
            Pinto Beans
            <span class="price">$0.79 / lb</span>
          </p>
        </label>
        <label class="item" data-category="beans">
          <input type="checkbox" value="white-navy-beans">
          <img src="img/beans/white-navy-beans_200px.jpg"
               alt="White Navy Beans">
          <p>
            White Navy Beans
            <span class="price">$0.79 / lb</span>
          </p>
        </label>
        <label class="item" data-category="beans">
          <input type="checkbox" value="yellow-split-peas">
          <img src="img/beans/yellow-split-peas_200px.jpg"
               alt="Yellow Split Peas">
          <p>
            Yellow Split Peas
            <span class="price">$0.59 / lb</span>
          </p>
        </label>


        <label class="item" data-category="nuts">
          <input type="checkbox" value="peanuts">
          <img src="img/nuts/peanuts_200px.jpg"
               alt="Peanuts">
          <p>
            Peanuts
            <span class="price">$1.89 / lb</span>
          </p>
        </label>
        <label class="item" data-category="nuts">
          <input type="checkbox" value="pistachios">
          <img src="img/nuts/pistachios_200px.jpg"
               alt="Pistachios">
          <p>
            Pistachios
            <span class="price">$9.99 / lb</span>
          </p>
        </label>
        <label class="item" data-category="nuts">
          <input type="checkbox" value="roasted-cashews">
          <img src="img/nuts/roasted-cashews_200px.jpg"
               alt="Roasted Cashews">
          <p>
            Roasted Cashews
            <span class="price">$12.89 / lb</span>
          </p>
        </label>
        <label class="item" data-category="nuts">
          <input type="checkbox" value="sunflower-seeds">
          <img src="img/nuts/sunflower-seeds_200px.jpg"
               alt="Sunflower Seeds">
          <p>
            Sunflower Seeds
            <span class="price">$1.49 / lb</span>
          </p>
        </label>
        <label class="item" data-category="nuts">
          <input type="checkbox" value="toasted-pumpkin-seeds">
          <img src="img/nuts/toasted-pumpkin-seeds_200px.jpg"
               alt="Toasted Pumpkin Seeds">
          <p>
            Toasted Pumpkin Seeds
            <span class="price">$2.99 / lb</span>
          </p>
        </label>


        <label class="item" data-category="pasta">
          <input type="checkbox" value="egg-noodles">
          <img src="img/pasta/egg-noodles_200px.jpg"
               alt="Egg Noodles">
          <p>
            Egg Noodles
            <span class="price">$0.79 / lb</span>
          </p>
        </label>
        <label class="item" data-category="pasta">
          <input type="checkbox" value="jasmine-rice">
          <img src="img/pasta/jasmine-rice_200px.jpg"
               alt="Jasmine Rice">
          <p>
            Jasmine Rice
            <span class="price">$0.79 / lb</span>
          </p>
        </label>
        <label class="item" data-category="pasta">
          <input type="checkbox" value="macaroni">
          <img src="img/pasta/macaroni_200px.jpg"
               alt="Macaroni">
          <p>
            Macaroni
            <span class="price">$0.49 / lb</span>
          </p>
        </label>
        <label class="item" data-category="pasta">
          <input type="checkbox" value="mini-shells">
          <img src="img/pasta/mini-shells_200px.jpg"
               alt="Mini Shells">
          <p>
            Mini Shells
            <span class="price">$0.49 / lb</span>
          </p>
        </label>
        <label class="item" data-category="pasta">
          <input type="checkbox" value="penne">
          <img src="img/pasta/penne_200px.jpg"
               alt="Penne">
          <p>
            Penne
            <span class="price">$0.49 / lb</span>
          </p>
        </label>
        <label class="item" data-category="pasta">
          <input type="checkbox" value="rotini">
          <img src="img/pasta/rotini_200px.jpg"
               alt="Rotini">
          <p>
            Rotini
            <span class="price">$0.49 / lb</span>
          </p>
        </label>
        <label class="item" data-category="pasta">
          <input type="checkbox" value="short-grain-brown-rice">
          <img src="img/pasta/short-grain-brown-rice_200px.jpg"
               alt="Short Grain Brown Rice">
          <p>
            Short Grain Brown Rice
            <span class="price">$0.79 / lb</span>
          </p>
        </label>


        <label class="item" data-category="produce">
          <input type="checkbox" value="avocados">
          <img src="img/produce/avocados_200px.jpg"
               alt="Avocados">
          <p>
            Avocados
            <span class="price">$1.29 / each</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="bell-peppers">
          <img src="img/produce/bell-peppers_200px.jpg"
               alt="Bell Peppers">
          <p>
            Bell Peppers
            <span class="price">$1.49 / each</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="brussels-sprouts">
          <img src="img/produce/brussels-sprouts_200px.jpg"
               alt="Brussels Sprouts">
          <p>
            Brussels Sprouts
            <span class="price">$2.99 / lb</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="concord-grapes">
          <img src="img/produce/concord-grapes_200px.jpg"
               alt="Concord Grapes">
          <p>
            Concord Grapes
            <span class="price">$2.49 / each</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="cranberries">
          <img src="img/produce/cranberries_200px.jpg"
               alt="Cranberries">
          <p>
            Cranberries
            <span class="price">$2.49 / lb</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="eggplant">
          <img src="img/produce/eggplant_200px.jpg"
               alt="Eggplant">
          <p>
            Eggplant
            <span class="price">$1.49 / each</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="gala-apples">
          <img src="img/produce/gala-apples_200px.jpg"
               alt="Gala Apples">
          <p>
            Gala Apples
            <span class="price">$1.49 / lb</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="granny-smith-apples">
          <img src="img/produce/granny-smith-apples_200px.jpg"
               alt="Granny Smith Apples">
          <p>
            Granny Smith Apples
            <span class="price">$1.69 / lb</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="grapefruit">
          <img src="img/produce/grapefruit_200px.jpg"
               alt="Grapefruit">
          <p>
            Grapefruit
            <span class="price">$0.99 / lb</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="green-tomatoes">
          <img src="img/produce/green-tomatoes_200px.jpg"
               alt="Green Tomatoes">
          <p>
            Green Tomatoes
            <span class="price">$2.69 / lb</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="limes">
          <img src="img/produce/limes_200px.jpg"
               alt="Limes">
          <p>
            Limes
            <span class="price">$0.59 / each</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="mushrooms">
          <img src="img/produce/mushrooms_200px.jpg"
               alt="Mushrooms">
          <p>
            Mushrooms
            <span class="price">$3.99 / lb</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="onions">
          <img src="img/produce/onions_200px.jpg"
               alt="Onions">
          <p>
            Onions
            <span class="price">$0.79 / lb</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="oranges">
          <img src="img/produce/oranges_200px.jpg"
               alt="Oranges">
          <p>
            Oranges
            <span class="price">$0.89 / lb</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="peaches">
          <img src="img/produce/peach_200px.jpg"
               alt="Peaches">
          <p>
            Peaches
            <span class="price">$1.29 / each</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="potatoes">
          <img src="img/produce/potatoes_200px.jpg"
               alt="Potatoes">
          <p>
            Potatoes
            <span class="price">$0.79 / lb</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="red-apples">
          <img src="img/produce/red-apples_200px.jpg"
               alt="Red Apples">
          <p>
            Red Apples
            <span class="price">$1.69 / lb</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="red-cherries">
          <img src="img/produce/red-cherries_200px.jpg"
               alt="Red Cherries">
          <p>
            Red Cherries
            <span class="price">$7.99 / lb</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="spinach">
          <img src="img/produce/spinach_200px.jpg"
               alt="Spinach">
          <p>
            Spinach
            <span class="price">$2.49 / lb</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="tangerines">
          <img src="img/produce/tangerines_200px.jpg"
               alt="Tangerines">
          <p>
            Tangerines
            <span class="price">$2.89 / lb</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="tomatoes">
          <img src="img/produce/tomatoes_200px.jpg"
               alt="Tomatoes">
          <p>
            Tomatoes
            <span class="price">$1.89 / lb</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="vine-ripened-tomatoes">
          <img src="img/produce/vine-ripened-tomatoes_200px.jpg"
               alt="Vine-Ripened Tomatoes">
          <p>
            Vine-Ripened Tomatoes
            <span class="price">$2.89 / lb</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="yams">
          <img src="img/produce/yams_200px.jpg"
               alt="Yams">
          <p>
            Yams
            <span class="price">$0.99 / lb</span>
          </p>
        </label>
        <label class="item" data-category="produce">
          <input type="checkbox" value="yukon-gold-potatoes">
          <img src="img/produce/yukon-gold-potatoes_200px.jpg"
               alt="Yukon Gold Potatoes">
          <p>
            Yukon Gold Potatoes
            <span class="price">$1.49 / lb</span>
          </p>
        </label>
        `;

      return div;
    }

  }
);
