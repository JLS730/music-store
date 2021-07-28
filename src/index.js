import {albums} from '../data/albums.js'

const shoppingCartModal = document.querySelector('.shopping-cart-modal-background')
const shoppingCartModalButton = document.querySelector('.shopping-cart-modal-button')
const shoppingCartCloseButton = document.querySelector('.shopping-cart-close-button')
const shoppingCartItemsInfoContainer = document.querySelector('.shopping-cart-items-info-container')
const addToCartButtons = document.querySelectorAll('.product-add-to-cart')
const total = document.querySelector('.total')
const shoppingCartPurchaseButton = document.querySelector('.shopping-cart-purchase-button')

shoppingCartModalButton.addEventListener('click', () => {
    shoppingCartModal.classList.remove('hidden')
})

shoppingCartCloseButton.addEventListener('click', () => {
    shoppingCartModal.classList.add('hidden')
})

shoppingCartPurchaseButton.addEventListener('click', () => {
    if(document.querySelectorAll('.shopping-cart-items-info').length == 0) {
        alert('No Items in Cart')
    } else {
        let confirmedPurchase = confirm(`Confirm Purchase For ${total.textContent}?`)

        if(confirmedPurchase) {
            alert('Purchase Confirmed! Thank You Very Much')
            location.reload()
        } else {
            return
        }
    }
})

for(let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', () => {
        addToCart(i)
    })
}

const addToCart = (num) => {
    if(!document.querySelector(`.shopping-cart-item-${albums[num].tag}`)) {
        shoppingCartItemsInfoContainer.innerHTML += `
            <div class="shopping-cart-items-info shopping-cart-item-${albums[num].tag}">
                <div class="shopping-cart-items-image-container">
                    <img class="shopping-cart-items-image" src="./images/album-art/album${num}.jpg" alt="">
                </div>
                <h2 class="shopping-cart-items-title cart-title">${albums[num].title}</h2>
                <div class="shopping-cart-items-price-container">
                    <h2 class="shopping-cart-items-prices price-${albums[num].tag}">${albums[num].price}</h2>
                    <div class="shopping-cart-items-quantity-container">
                        <i class="fas fa-caret-left quantity-down ${albums[num].tag}"></i>
                        <h2 class="shopping-cart-items-quantity quantity-${albums[num].tag}">1</h2>
                        <i class="fas fa-caret-right quantity-up ${albums[num].tag}"></i>
                    </div>
                </div>
                <div class="shopping-cart-items-remove-container">
                    <i class="far fa-times-circle fa-2x shopping-cart-items-remove-buttons ${albums[num].tag}"></i>
                </div>
            </div>
        `
    } else {
        return
    }

    quantityDown()
    quantityUp()
    removeItem()
    totalUpdate()
    cartNumberUpdate()
    
}

const quantityDown = () => {
    const quantityDownButtons = document.querySelectorAll('.quantity-down')

    for(let i = 0; i < quantityDownButtons.length; i++) {
        quantityDownButtons[i].addEventListener('click', () => {
            for(let j = 0; j < albums.length; j++) {
                if(quantityDownButtons[i].classList.contains(`${albums[j].tag}`)) {
                    if(document.querySelector(`.quantity-${albums[j].tag}`).textContent == 1) {
                        return
                    }

                    document.querySelector(`.quantity-${albums[j].tag}`).textContent = +document.querySelector(`.quantity-${albums[j].tag}`).textContent - 1
                    document.querySelector(`.price-${albums[j].tag}`).textContent = (+(+document.querySelector(`.price-${albums[j].tag}`).textContent) - albums[j].price).toFixed(2)
                }
            }

            totalUpdate()
            
        })
    }
}

const quantityUp = () => {
    const quantityUpButtons = document.querySelectorAll('.quantity-up')

    for(let i = 0; i < quantityUpButtons.length; i++) {
        quantityUpButtons[i].addEventListener('click', () => {
            for(let j = 0; j < albums.length; j++) {
                if(quantityUpButtons[i].classList.contains(`${albums[j].tag}`)) {
                    document.querySelector(`.quantity-${albums[j].tag}`).textContent = +document.querySelector(`.quantity-${albums[j].tag}`).textContent + 1
                    document.querySelector(`.price-${albums[j].tag}`).textContent = (+(+document.querySelector(`.price-${albums[j].tag}`).textContent) + albums[j].price).toFixed(2)
                }
            }
            totalUpdate()
        })
    }
}

const removeItem = () => {
    const removeItemButtons = document.querySelectorAll('.shopping-cart-items-remove-buttons')

    for(let i = 0; i < removeItemButtons.length; i++) {
        removeItemButtons[i].addEventListener('click', () => {
            for(let j = 0; j < albums.length; j++) {
                let elementToRemove = document.querySelector(`.shopping-cart-item-${albums[j].tag}`)

                if(removeItemButtons[i].classList.contains(`${albums[j].tag}`)) {
                    shoppingCartItemsInfoContainer.removeChild(elementToRemove)
                }
            }



            totalUpdate()
            cartNumberUpdate()
        })
    }
}

const totalUpdate = () =>{
    const shoppingCartItemsPrice = document.querySelectorAll('.shopping-cart-items-prices')

    let priceArray = []

    for(let i = 0; i < shoppingCartItemsPrice.length; i++) {
        priceArray.push(+shoppingCartItemsPrice[i].textContent)
    }

    if(priceArray.length == 0) {
        total.textContent = 'Total: $0.00'
    } else {
        total.textContent = `Total: $${(priceArray.reduce((total, num) => total + num)).toFixed(2)}`
    }
}

const cartNumberUpdate = () => {
    const shoppingCartItemsPrice = document.querySelectorAll('.shopping-cart-items-prices')

    document.querySelector('.shopping-cart-amount').style.color = 'var(--main-yellow)'
    document.querySelector('.shopping-cart-amount').textContent = shoppingCartItemsPrice.length
    document.querySelector('.shopping-cart-title-number').textContent = shoppingCartItemsPrice.length
}