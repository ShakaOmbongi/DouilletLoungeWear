document.addEventListener("DOMContentLoaded", function () {
    const cartKey = "cart"; //  Standardized cart key
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const cartItemsContainer = document.getElementById("cart-items");

    function renderCart() {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            updateSummary(0);
            return;
        }

        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const cartItemHTML = `
                <div class="cart-item d-flex align-items-center mb-3">
                    <img src="${item.image}" alt="${item.name}" style="width:100px;" class="me-3">
                    <div class="flex-grow-1">
                        <h5>${item.name}</h5>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <p>Total: $${itemTotal.toFixed(2)}</p>
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
            cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
        });

        updateSummary(subtotal);
        attachEventListeners();
    }

    function updateSummary(subtotal = 0) {
        const taxRate = 0.0675;
        const deliveryFee = 5.00;
        const tax = subtotal * taxRate;
        const total = subtotal + tax + deliveryFee;

        document.getElementById("subtotal").innerText = subtotal.toFixed(2);
        document.getElementById("tax").innerText = tax.toFixed(2);
        document.getElementById("total").innerText = total.toFixed(2);
    }

    function attachEventListeners() {
        document.querySelectorAll(".cart-qty").forEach(input => {
            input.addEventListener("change", function () {
                const index = parseInt(this.dataset.index);
                cart[index].quantity = parseInt(this.value);
                localStorage.setItem(cartKey, JSON.stringify(cart));
                renderCart();
            });
        });

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = parseInt(this.dataset.index);
                cart.splice(index, 1);
                localStorage.setItem(cartKey, JSON.stringify(cart));
                renderCart();
            });
        });
    }

    renderCart();
    document.getElementById("checkoutBtn").addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
    
        const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const userId = 1; // Replace with actual session user ID if available
    
        fetch('/orders/create', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, totalAmount })
        })
        .then(response => {
            if (response.redirected) {
                // Clear local cart
                localStorage.removeItem(cartKey);
                window.location.href = response.url;
            } else {
                alert("Checkout failed. Try again.");
            }
        })
        .catch(error => {
            console.error("Checkout error:", error);
            alert("There was an error processing your order.");
        });
    });
});
