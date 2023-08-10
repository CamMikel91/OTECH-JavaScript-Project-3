const cardContainer = document.querySelector("#cardContainer");

// Function to add the products to the shop page.
function addProducts() {
    products.forEach(individualCard => {
        cardContainer.innerHTML += `
        <div class="card" id="cardNumber${individualCard.id}">
            <img src="${individualCard.image}" alt= "${individualCard.description}">
            <div class="cardText">
                <h4>${individualCard.name}</h4>
                <p>${individualCard.description}</p>
                <p>&dollar;${individualCard.price}</p>
                <button class="cartButton" id="${individualCard.id}">Add to Cart</button>
            </div>
        </div>
        `;
    });
}

// Function call to populate shop page.
addProducts();

// Function to save cart info to local storage
function saveToLocalStorage() {
    let cartButton = document.getElementsByClassName("cartButton");
    for (let i = 0; i < cartButton.length; i++) {
        cartButton[i].addEventListener("click", () => {
            let selectedProduct = products.find( (product) => product.id == cartButton[i].id);
            cart.push(selectedProduct);
            localStorage.setItem("CART", JSON.stringify(cart) );
            // Cart display refresh on each add to cart click event
            displayCart();
        });
    }
}

// Function call for saveToLocalStorage().
saveToLocalStorage();

// Function to populate sideBarContainer with cart items
function displayCart() {
    clearStorageAndCart();
    sideBarContainer.innerHTML = "";
    cart.forEach(cartItem => {
        sideBarContainer.innerHTML += `
        <div class="tableRow">
            <div class="tableCell">
                ${cartItem.name}
            </div>
            <div class="tableCell">
                &dollar;${cartItem.price}
            </div>
        </div>

        <div class="tableRow">
            <div class="tableCell borderBottom"></div>
            <a href="#" id="${cartItem.id}" class="tableCell borderBottom removeLink">Remove</a>
        </div>
        `;
    });
    removeFromCart();
}

// Cart display for when the page first loads
displayCart();

let checkoutButton = document.getElementById("checkoutButton");
checkoutButton.addEventListener("click", () => {
    window.location.href = "cart.html";
});