document.addEventListener("DOMContentLoaded", function () {
    const cartKey = "cart";
  
    // View button functionality
    document.querySelectorAll(".view-product").forEach(button => {
      button.addEventListener("click", function () {
        const product = {
          name: this.dataset.name,
          price: parseFloat(this.dataset.price),
          image: this.dataset.image,
          description: this.dataset.description,
          material: this.dataset.material
        };
  
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "/products/details";
      });
    });
  
    // Add to cart functionality
    document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", function () {
        const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        const id = this.dataset.id;
        const name = this.dataset.name;
        const price = parseFloat(this.dataset.price);
        const image = this.dataset.image;
  
        const existing = cart.find(item => item.id == id);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ id, name, price, image, quantity: 1 });
        }
  
        localStorage.setItem(cartKey, JSON.stringify(cart));
        alert(`${name} added to cart!`);
      });
    });
  });
  