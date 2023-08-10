let cart = [];
const sideBarContainer = document.querySelector("#sideBarContainer");

// clearStorageAndCart()
function clearStorageAndCart() {
    cart = [];
    let currentStorage = JSON.parse(localStorage.getItem('CART'));
    if (currentStorage) {
        cart = currentStorage;
    }
}

// removeFromCart()
function removeFromCart() {
    let removeLink = document.getElementsByClassName("removeLink");
    for (let i = 0; i < removeLink.length; i++) {
        removeLink[i].addEventListener("click", (event) => {
            clearStorageAndCart();
            let selectedProduct = cart.find( (cartItem) => cartItem.id == event.target.id);
            let itemIndex;
            for (let j = 0; j < cart.length; j++) {
                if (cart[j].id == selectedProduct.id) {
                    itemIndex = cart.indexOf(cart[j]);
                };
            };
            cart.splice(itemIndex, 1);
            localStorage.setItem('CART', JSON.stringify(cart) );
            if (typeof displayCart === "function") {
                displayCart();
            }
            if (typeof displayCartProducts === "function") {
                displayCartProducts();
            }
            if (cart.length == 0) {
                localStorage.clear();
            };
        });
    };
}

// clearCart()
function clearCart() {
    const clearCartButton = document.getElementById("clearCartButton");
    clearCartButton.addEventListener("click", () => {
        cart = [];
        localStorage.clear();
        if (typeof displayCart === "function") {
            displayCart();
        }
        if (typeof displayCartProducts === "function") {
            displayCartProducts( );
            }
    });
}
// Function call for clearCart()
clearCart();