function getUserData() {
    let userData = JSON.parse(localStorage.getItem("user")) || null
    let login = JSON.stringify(localStorage.getItem("userEmail"))
    let pass = JSON.stringify(localStorage.getItem("userPassword"))
    

    if (!userData) {
        userData = {
            email: "не найдено",
            password: "не найдено",
            purchasedGames: [],
        }
        localStorage.setItem("user", JSON.stringify(userData))
    }
    else{
        if (login && pass) {
            userData.userEmail = login
            userData.userPassword = pass
        }
        else {
            localStorage.removeItem("user")
            userData = null
        }
    }
    return userData
}

function displayUserData() {
    const userData = getUserData()

    const wEmail = document.getElementById("user-email")
    wEmail.textContent = userData.userEmail
    const wPass = document.getElementById("user-password")
    wPass.textContent = userData.userPassword

    const purchasedGamesContainer = document.getElementById("purchased-games")
    purchasedGamesContainer.innerHTML = ""

    if (userData.purchasedGames.length === 0) {
        purchasedGamesContainer.innerHTML = '<p class="empty-message">У вас ещё нет купленных игр.</p>'
        return
    }

    userData.purchasedGames.forEach((game) => {
        const gameItem = document.createElement("div")
        gameItem.className = "purchase-item"
        gameItem.innerHTML = `
            <p><strong>Название:</strong> ${game.title}</p>
            <p><strong>Цена:</strong> ${game.price}$</p>
            <p><strong>Количество:</strong> ${game.count}</p>
        `
        purchasedGamesContainer.appendChild(gameItem)
    })
}

function clearPurchasedGames() {
    const userData = getUserData()
    userData.purchasedGames = []
    localStorage.setItem("user", JSON.stringify(userData))
    displayUserData()

    alert("Список купленных игр успешно очищен!)")
}
document.getElementById("clean").addEventListener("click", clearPurchasedGames)





displayUserData()
