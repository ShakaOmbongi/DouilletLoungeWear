document.addEventListener("DOMContentLoaded", function () {
    const cartKey = "shoppingCart";
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const cartItemsContainer = document.getElementById("cart-items");

    function renderCart() {
        cartItemsContainer.innerHTML = ""; // Clear current items

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            updateSummary();
            return;
        }

        let subtotal = 0;

        cart.forEach((item, index) => {
            subtotal += item.price * item.quantity;
            cartItemsContainer.innerHTML += `
                <div class="cart-item d-flex align-items-center mb-3">
                    <img src="${item.image}" alt="${item.name}" style="width:100px;" class="me-3">
                    <div class="flex-grow-1">
                        <h5>${item.name}</h5>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div>
                        <label class="me-1">Qty:</label>
                        <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="cart-qty form-control" style="width:70px;">
                    </div>
                    <div class="ms-3">
                        <button class="btn btn-danger remove-item" data-index="${index}">Remove</button>
                    </div>
                </div>
            `;
        });

        updateSummary(subtotal);
        attachEventListeners();
    }

    function updateSummary(subtotal = 0) {
        let tax = subtotal * 0.0675;
        let total = subtotal + tax + 5.00; // $5 delivery fee

        document.getElementById("subtotal").innerText = subtotal.toFixed(2);
        document.getElementById("tax").innerText = tax.toFixed(2);
        document.getElementById("total").innerText = total.toFixed(2);
    }

    function attachEventListeners() {
        document.querySelectorAll(".cart-qty").forEach(input => {
            input.addEventListener("change", function () {
                let index = this.dataset.index;
                cart[index].quantity = parseInt(this.value);
                localStorage.setItem(cartKey, JSON.stringify(cart));
                renderCart();
            });
        });

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem(cartKey, JSON.stringify(cart));
                renderCart();
            });
        });
    }

    renderCart();
});
