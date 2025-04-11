document.addEventListener("DOMContentLoaded", function () {
  const cartKey = "shoppingCart";
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  // Update Cart Icon Count
  function updateCartCount() {
      const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
      document.getElementById("cart-count").innerText = cartCount;
  }

  //  Add to Cart Function
  document.querySelectorAll(".btn-add-to-cart").forEach(button => {
      button.addEventListener("click", function () {
          const productCard = this.closest(".card");
          const productName = productCard.querySelector(".card-title").innerText;
          const productPrice = parseFloat(productCard.querySelector(".card-text").innerText.replace("$", ""));
          const productImage = productCard.querySelector("img").src;

          // Create product object
          let product = { name: productName, price: productPrice, image: productImage, quantity: 1 };

          // Check if the product already exists in the cart
          let existingProduct = cart.find(item => item.name === product.name);
          if (existingProduct) {
              existingProduct.quantity += 1;
          } else {
              cart.push(product);
          }

          // Save to localStorage
          localStorage.setItem(cartKey, JSON.stringify(cart));

          console.log("Cart Updated:", cart); // Debugging
          alert("Item added to cart!");
          updateCartCount(); // Update cart count
      });
  });

  // Load Cart Items on Cart Page
  if (window.location.pathname.includes("cart.html")) {
      const cartContainer = document.querySelector(".cart-items");
      const cartSummary = document.querySelector(".cart-summary");

      function displayCart() {
          cartContainer.innerHTML = "";
          let subtotal = 0;

          if (cart.length === 0) {
              cartContainer.innerHTML = "<p>Your cart is empty.</p>";
              cartSummary.style.display = "none";
              return;
          }

          cartSummary.style.display = "block";

          cart.forEach((item, index) => {
              subtotal += item.price * item.quantity;
              cartContainer.innerHTML += `
                  <div class="cart-item d-flex align-items-center mb-3">
                      <img src="${item.image}" alt="${item.name}" style="width:100px;" class="me-3">
                      <div class="flex-grow-1">
                          <h5>${item.name}</h5>
                          <p>Price: $${item.price.toFixed(2)}</p>
                          <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div>
                          <label class="me-1">Qty:</label>
                          <input type="number" data-index="${index}" value="${item.quantity}" min="1" class="cart-qty form-control" style="width:70px;">
                      </div>
                      <div class="ms-3">
                          <button class="btn btn-danger btn-remove" data-index="${index}">Remove</button>
                      </div>
                  </div>
              `;
          });

          const tax = subtotal * 0.0675;
          const deliveryFee = 5.00;
          const total = subtotal + tax + deliveryFee;

          cartSummary.innerHTML = `
              <h3>Cart Summary</h3>
              <p>Subtotal: $${subtotal.toFixed(2)}</p>
              <p>Tax (6.75%): $${tax.toFixed(2)}</p>
              <p>Delivery Fee: $${deliveryFee.toFixed(2)}</p>
              <h4>Total: $${total.toFixed(2)}</h4>
              <button class="btn btn-success mt-3" id="checkout-btn">Checkout</button>
          `;

          updateCartCount();
      }

      //  Update Quantity
      cartContainer.addEventListener("change", function (event) {
          if (event.target.classList.contains("cart-qty")) {
              let index = event.target.dataset.index;
              cart[index].quantity = parseInt(event.target.value);
              localStorage.setItem(cartKey, JSON.stringify(cart));
              displayCart();
          }
      });

      // Remove Item
      cartContainer.addEventListener("click", function (event) {
          if (event.target.classList.contains("btn-remove")) {
              let index = event.target.dataset.index;
              cart.splice(index, 1);
              localStorage.setItem(cartKey, JSON.stringify(cart));
              displayCart();
          }
      });

      //  Checkout
      document.addEventListener("click", function (event) {
          if (event.target.id === "checkout-btn") {
              alert("Thank you for your purchase!");
              localStorage.removeItem(cartKey);
              cart = [];
              displayCart();
          }
      });

      displayCart();
  }

  updateCartCount();
});
