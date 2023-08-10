// Function to populate cartItem cards on cart.html page.
const cartCardContainer = document.querySelector("#cartCardContainer");

function displayCartProducts() {
    clearStorageAndCart();
    cartCardContainer.innerHTML = "";
    if (cart.length > 0) {
        cart.forEach(cartItem => {
            cartCardContainer.innerHTML += `
                <div class="cartCard">
                    <div class="cartCardFlex">
                        <img src="${cartItem.image}" alt="${cartItem.description}">
                        <p class="cartTitle">${cartItem.name}</p>
                        <p class="cartDescription">${cartItem.description}</p>
                        <div class="cartQuantity">
                            <input type="number" value="${cartItem.quantity}" min="1" max="5">
                        </div>
                        <p class="cartPrice">&dollar; ${cartItem.price}</p>
                    </div>
                    <p class="textAlignRight removeMargins">
                        <a href="#" class="removeLink" id="${cartItem.id}">Remove</a>
                    </p>
                </div>
            `;
            removeFromCart();
        });
    }
    else {
        cartCardContainer.innerHTML = `<p id="emptyCart">The cart is empty</p>`
    }
}
displayCartProducts();

// Cart Order Summary Section
let subtotal,
    shipping,
    tax,
    taxRate = 0.061,
    total;

    // Order Summary Calculations
    function calculateOrderSummary() {
        subtotal = 0,
        shipping = 0,
        tax = 0,
        total = 0;

        clearStorageAndCart();

        // Subtotal and Shipping Calculations
        cart.forEach(cartItem => {
            subtotal += cartItem.price;
            shipping += 1;
        })
        
        // Tax Calculation
        tax = (subtotal + shipping) * taxRate;

        // Total Calculation
        total = subtotal + shipping + tax;
    }

// Function to display Order Summary
function displayOrderSummary() {
    calculateOrderSummary();
    sideBarContainer.innerHTML = `
    <div class="tableRow">
        <div class="tableCell">
            Subtotal
        </div>
        <div class="tableCell">
            &dollar; ${subtotal.toFixed(2)}
        </div>
    </div>

    <div class="tableRow">
        <div class="tableCell">
            Shipping
        </div>
        <div class="tableCell">
            &dollar; ${shipping.toFixed(2)}
        </div>
    </div>

    <div class="tableRow">
        <div class="tableCell borderBottom">
            Sales Tax
        </div>
        <div class="tableCell borderBottom">
            &dollar; ${tax.toFixed(2)}
        </div>
    </div>

    <div class="tableRow">
        <div class="tableCell">
            Total
        </div>
        <div class="tableCell bold">
            &dollar; ${total.toFixed(2)}
        </div>
    </div>
    `;
}
displayOrderSummary();






     

     