
// Creates MyElements extending HTML Element
class OnlineIndicator extends HTMLElement {

    static get observedAttributes() { return ['name', 'count','icon', 'color'] ; }

    // Fires when an instance of the element is created or updated
    constructor() {
        super();
        
        // Create a shadow root
        this.attachShadow({mode: 'open'});
        this.counterTimer; 

        this.render();
    }

    // Fires when an instance was inserted into the document
    connectedCallback() {
        console.warn("Online Indicator loaded");
    }

    // Fires when an instance was removed from the document
    disconnectedCallback() {
    }

    // Fires when an attribute was added, removed, or updated
    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log("Inidicator " + attrName + " updated to " + newVal);
        
        if (attrName=="count" && !isNaN(newVal) && newVal>0) {
            this.animateCounter();
        } else {
            this.renderUpdate();
        }
    }

    
    render(){

        console.log("Initial Render");

        const style = document.createElement('style');

        const wrapper = document.createElement("div");
        const icon_div = wrapper.appendChild( document.createElement("div") );
        const counter = wrapper.appendChild( document.createElement("div") );
        const label = wrapper.appendChild( document.createElement("div") );
       
        const icon = document.createElement("img");
        
        icon_div.appendChild(icon);

        wrapper.className   = "wrapper";
        icon_div.className  = "icon";
        label.className     = "label";
        counter.className   = "counter";

        icon.src =  "";
        label.innerText = "cargando...";
        
        this.shadowRoot.append(style,wrapper);

        this.updateStyle();
       
    }

    renderUpdate(){

        console.warn("updated component");

        this.shadowRoot.querySelector('.icon > img').src = "../../src/img/icons/" + this.getAttribute("icon") + ".svg";
        this.shadowRoot.querySelector('.label').innerText =  this.getAttribute("name");

        if (isNaN(this.getAttribute("count"))) {
            this.shadowRoot.querySelector('.counter').innerText =  this.getAttribute("count");
        }
       
    }


    animateCounter() {

        clearInterval(this.counterTimer);

        var counter = 0;

        this.counterTimer = setInterval(()=>{
            this.shadowRoot.querySelector('.counter').innerText = counter;
            counter +=1;
            if (counter > parseInt(this.getAttribute("count") )) {
                clearInterval(this.counterTimer);
            }

        }, 200);


    }


    updateStyle() {
        
        this.shadowRoot.querySelector('style').textContent = `
          .wrapper {
            width: 98%;
            max-width:400px;
            height: 60px;
            margin:0 1% 15px;
            display:flex;
            align-items:center;
            justify-content:flex-start;
            
            border-radius:5px;
            background-color: #FFF;
            box-shadow: 3px 3px 10px 5px rgba(0,0,0,0.1);
            
            border-top: 2px solid ${this.getAttribute('color')};

          }
          .icon {
              width:50px;
          }
          .icon img {
                  width:30px;
                  margin:10px;
          }
          .counter {
              width:50px;
              font-size:24px;
              font-weight:600;
          }
          .label {
            flex-grow:1;
            font-weight:600;
            opacity:0.9;
          }
    
        `;
       
    
      }

}

// Registers custom element
window.customElements.define('online-indicator', OnlineIndicator);

