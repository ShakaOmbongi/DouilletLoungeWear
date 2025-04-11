document.addEventListener("DOMContentLoaded", function () {
    const productId = new URLSearchParams(window.location.search).get("id");
    
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {
          document.getElementById("productId").value = product.id;
          document.getElementById("productName").value = product.name;
          document.getElementById("productDescription").value = product.description;
          document.getElementById("productCategory").value = product.category;
          document.getElementById("productPrice").value = product.price;
          document.getElementById("productImage").value = product.image;
        })
        .catch(error => console.error("Error fetching product details:", error));
    }
  
    document.getElementById("editProductForm").addEventListener("submit", function (event) {
      event.preventDefault();
      
      const updatedProduct = {
        id: document.getElementById("productId").value,
        name: document.getElementById("productName").value,
        description: document.getElementById("productDescription").value,
        category: document.getElementById("productCategory").value,
        price: document.getElementById("productPrice").value,
        image: document.getElementById("productImage").value
      };
  
      fetch(`/api/products/${updatedProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct)
      })
      .then(response => {
        if (response.ok) {
          alert("Product updated successfully!");
          window.location.href = "/admin/products";
        } else {
          alert("Error updating product.");
        }
      })
      .catch(error => console.error("Error updating product:", error));
    });
  });
  