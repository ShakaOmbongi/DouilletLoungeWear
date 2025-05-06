document.addEventListener("DOMContentLoaded", function () {
    const cartKey = "cart";
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const countElement = document.getElementById("cart-count");
    if (countElement) {
      countElement.textContent = cartCount;
    }
  });
  