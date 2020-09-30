import data from './data.js'
const itemsContainer = document.getElementById('items')


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
    // Shows items
    function showItems(){
      const qty = getQty()
  
      console.log(`You have ${qty}  items in your cart`)

      for (let i = 0; i < cart.length; i += 1 ){
          console.log(`You checkout ${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
     }
      console.log(`Total in cart $${getTotal()}`)
    }

     // Get Qty
     function getQty(){
        let qty = 0
        for (let i = 0; i < cart.length; i += 1)
          qty += cart[i].qty
          return qty
     }
     // Get total
     function getTotal(){
        let total = 0
        for (let i = 0; i < cart.length; i += 1) 
           total += cart[i].price * cart[i].qty
           return total.toFixed(2)
    }

 addItem('Apple', 0.99)
 addItem('orange', 1.29)
 addItem('cucumber', 2.00)
 addItem('Apple', 0.99)
 addItem('Banana', 0.50)
 addItem('Apple', 0.99)
 addItem('orange', 1.29)

 showItems()