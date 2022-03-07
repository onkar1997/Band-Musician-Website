var removeCartItemButtons = document.getElementsByClassName('btn-danger')
for(let i=0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
}

var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for(let i=0; i < quantityInputs.length; i++)
{
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}

var addToCartButtons = document.getElementsByClassName('shop-item-button')
for(let i=0; i<addToCartButtons.length; i++) {
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
}

var purchaseButton = document.getElementsByClassName('btn-purchase')[0]
purchaseButton.addEventListener('click', purchaseClicked)

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if(isNaN(input.value) || input.value<=0)
    {
        input.value=1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var shopItemTitle = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var shopItemImageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    var shopItemPrice = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    addItemToCart(shopItemTitle, shopItemImageSrc, shopItemPrice)
    updateCartTotal()
}

function addItemToCart(title, imageSrc, price) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    cartItemNames = document.getElementsByClassName('cart-item-title')
    for(let i=0; i<cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) {
            alert("This item is already added to the cart")
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" alt="tshirt image" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('click', quantityChanged)
}

function purchaseClicked(event) {
    var cartItems = document.getElementsByClassName('cart-items')[0]
    if(cartItems.hasChildNodes()) {
        alert("Thank You for your Purchase. \n Your order will be delivered Soon :)")
        while(cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }
        updateCartTotal()
    } else {
        alert("No items in the cart :( \n Please do atleast 1 purchase !!!")
    }

}

function updateCartTotal() {
    // var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = document.getElementsByClassName('cart-row')
    var total = 0

    for(let i=0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        if (typeof quantityElement != 'undefined') {
            var price = parseFloat(priceElement.innerText.replace('₹', ''))
            var quantity = quantityElement.value
            total += price*quantity
        }
    }
    total = Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText = '₹' + total
}
