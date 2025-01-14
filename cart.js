const cartItemsContainer = document.getElementById("cart-items")
const cartSummary = document.getElementById("cart-summary")

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Ваша корзина пуста</p>"
        cartSummary.innerHTML = ""
        return
    }

    cartItemsContainer.innerHTML = ""
    let totalPrice = 0

    cart.forEach((item) => {
        const cartItem = document.createElement("div")
        cartItem.className = "cart-item"

        cartItem.innerHTML = `
            <h3>${item.title}</h3>
            <img src="${item.image}" alt="">
            <p>Цена за единицу: ${item.price}$</p>
            <div class="quantity-controls">
                <button class="decrease" data-id="${item.id}">-</button>
                <span class="quantity">${item.count}</span>
                <button class="increase" data-id="${item.id}">+</button>
            </div>
            <p>Общая цена: <span class="item-total">${(item.price * item.count).toFixed(2)}</span>$</p>
            <button class="remove-item" data-id="${item.id}">Удалить</button>
        `

        cartItemsContainer.appendChild(cartItem)
        totalPrice += item.price * item.count
    })

    cartSummary.innerHTML = `
        Общая сумма: ${totalPrice.toFixed(2)}$
        <button id="buy-button">Купить</button>
    `

    addEventListeners()
    addBuyButtonListener(totalPrice)
}

function addBuyButtonListener(totalPrice) {
    const buyButton = document.getElementById("buy-button")
    
    if (buyButton) {
        buyButton.addEventListener("click", () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || []
            if (cart.length === 0) return

            const user = JSON.parse(localStorage.getItem("user")) || {
                purchasedGames: [],
            }

            user.purchasedGames = [...user.purchasedGames, ...cart]
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.removeItem("cart")

            alert(`Вы совершили покупку на сумму ${totalPrice.toFixed(2)}$. Спасибо за покупку!`)
            window.location.href = "./profile.html"
        })
    }
}

function updateItemCount(productId, change) {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const itemIndex = cart.findIndex((item) => String(item.id) === String(productId))

    if (itemIndex !== -1) {
        cart[itemIndex].count += change

        if (cart[itemIndex].count < 1) {
            cart[itemIndex].count = 1
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    loadCartItems()
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    cart = cart.filter((item) => String(item.id) !== String(productId))
    localStorage.setItem("cart", JSON.stringify(cart))
    loadCartItems()
}

function addEventListeners() {
    const increaseButtons = document.querySelectorAll(".increase")
    const decreaseButtons = document.querySelectorAll(".decrease")
    const removeButtons = document.querySelectorAll(".remove-item")

    increaseButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const productId = event.target.dataset.id
            updateItemCount(productId, +1)
        })
    })

    decreaseButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const productId = event.target.dataset.id
            updateItemCount(productId, -1)
        })
    })

    removeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const productId = event.target.dataset.id
            removeFromCart(productId)
        })
    })
}

loadCartItems()
