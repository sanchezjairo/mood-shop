import data from './data.js'
const itemsContainer = document.getElementById('items')
const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')
 

for (let i=0; i<data.length; ++i) {
    
    let newDiv = document.createElement('div');
    newDiv.className = 'item'

    let img = document.createElement('img');

    img.src = data[i].image
    img.width = 300
    img.height = 300

    newDiv.appendChild(img)
    console.log(img)

    newDiv.appendChild(img)
    itemsContainer.appendChild(newDiv)

    let desc = document.createElement('P')
    desc.innerText =data[i].desc
    newDiv.appendChild(desc)
    let prices = document.createElement('P')
    prices.innerText =data[i].price
    newDiv.appendChild(prices)
    let button = document.createElement('button')
    button.id = data[i].name

    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)
}
 const cart = []

 //-----------------------------------------------
 // handle change events on update input
  itemList.onchange = function(e) {
    if (e.target && e.target.classList.contains('update')) {
      const name = e.target.dataset.name
      const qty = parseInt(e.target.value)
      updateCart(name, qty)
    }
  }

 //----------------------------------------------
 //Handle clicks on list
 itemList.onclick = function(e) {
  //  console.log("clicked list")
  //  console.log(e.target)
  if (e.target && e.target.classList.contains('remove')){
    const name = e.target.dataset.name // data-name=""
     removeItem(name)
  }
     else if (e.target && e.target.classList.contains('add')){
    const name = e.target.dataset.name 
     addItem(name)
  }
     else if (e.target && e.target.classList.contains('remove-one')){
      const name = e.target.dataset.name
      removeItem(name, 1)
  }
 
}
//-----------------------------------------------
// handle add form submit
// ----------------------------------------------
// Add Item
 function addItem(name, price) {
    for (let i = 0; i < cart.length; i += 1 ){
        if (cart[i].name === name) {
          cart[i].qty += 1
          showItems()
          return
        }
    }
   const item = { name: name, price: price , qty: 1}
   cart.push(item)
}

//---------------------------------------------------------------------------------
    // Shows items
    function showItems(){
      const qty = getQty()
     // console.log(`You have ${qty}  items in your cart`)
      cartQty.innerHTML = (`You have ${qty}  items in your cart`)
      let itemStr = ''
      for (let i = 0; i < cart.length; i += 1 ){
          //console.log(`You checkout ${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
        //   const name =  cart[i].name
        //   const price = cart[i].price
        //   const qty = cart[i].qty
         //{name: 'Apple', price; 0.99, qty; 3}
          const { name, price, qty } = cart[i]

          itemStr += 
          `<li> 
          ${name} 
           $${price} x ${qty} = 
           $${(qty * price).toFixed(2)}
          <button class="remove" data-name="${name}">Remove</button>           
          <button class="add" data-name="${name}"> + </button>
          <button class="remove-one" data-name="${name}">-</button>
          <input class="update" type="number" data-name="${name}">
           </li>`
     }
        
     
      itemList.innerHTML = itemStr

      //console.log(`Total in cart $${getTotal()}`)
      cartTotal.innerHTML = (`Total in cart $${getTotal()}`)
    }
    const all_items_button = Array.from(document.querySelectorAll('button'))
    all_items_button.forEach(elt => elt.addEventListener('click', () => {
  addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
  showItems()
}))
console.log(all_items_button)

    
    // ---------------------------------------------
     // Get Qty
     function getQty(){
        let qty = 0
        for (let i = 0; i < cart.length; i += 1)
          qty += cart[i].qty
          return qty
     }

     //------------------------------------------
     // Get total
     function getTotal(){
        let total = 0
        for (let i = 0; i < cart.length; i += 1) 
           total += cart[i].price * cart[i].qty
           return total.toFixed(2)
    }

    function removeItem(name, qty = 0){
      for (let i = 0; i < cart.length; i += 1) {
         if (cart[i].name === name){
             if (qty > 0){
                 cart[i].qty -= qty
             }
             if(cart[i].qty < 1 || qty === 0){
                 cart.splice(i, 1,)
             }
             showItems()
             return
         }
      }
    }
    //-------------------------------------------
    function updateCart(name, qty){
       for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name){
          cart[i].qty = qty
          if(cart[i].qty < 1 || qty === 0){
            cart.splice(i, 1,)
          }
          showItems()
          return
          
       }
      } 
     }
    //--------------------------------------------
//  addItem('Apple', 0.99)
//  addItem('orange', 1.29)
//  addItem('cucumber', 2.00)
//  addItem('Apple', 0.99)
//  addItem('Banana', 0.50)
//  addItem('Apple', 0.99)
//  addItem('orange', 1.29)
 

 //showItems()

//  removeItem('Apple', 1)
//  removeItem('Banana')
//  showItems()