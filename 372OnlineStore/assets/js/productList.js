document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".view-product").forEach(button => {
        button.addEventListener("click", function () {
            const product = {
                name: this.getAttribute("data-name"),
                price: parseFloat(this.getAttribute("data-price")),
                image: this.getAttribute("data-image"),
                description: this.getAttribute("data-description"),
                material: this.getAttribute("data-material")
            };

            // Save product data to localStorage
            localStorage.setItem("selectedProduct", JSON.stringify(product));

            // Redirect to Product Details page
            window.location.href = "/products/details";
        });
    });
});
