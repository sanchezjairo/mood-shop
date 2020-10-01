import data from './data.js'
const itemsContainer = document.getElementById('items')
const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')
 itemList.innerHTML = '<li> Hello World</li>'

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

 const obj = []
// ----------------------------------------------
// Add Item
 function addItem(name, price) {
    for (let i = 0; i < cart.length; i += 1 ){
        if (cart[i].name === name) {
          cart[i].qty += 1
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
          $${qty * price}
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
             return
         }
      }
    }
    //--------------------------------------------
 addItem('Apple', 0.99)
 addItem('orange', 1.29)
 addItem('cucumber', 2.00)
 addItem('Apple', 0.99)
 addItem('Banana', 0.50)
 addItem('Apple', 0.99)
 addItem('orange', 1.29)
 

 showItems()

 removeItem('Apple', 1)
 removeItem('Banana')
 showItems()