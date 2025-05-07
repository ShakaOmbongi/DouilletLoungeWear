document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");
  
    fetch('/admin/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        return response.json();
      })
      .then(products => {
        productList.innerHTML = "";
  
        products.forEach(product => {
          const imageSrc = product.image?.trim() ? product.image : '/assets/images/placeholder.jpg';
  
          productList.innerHTML += `
            <tr>
              <td>${product.id}</td>
              <td>${product.name}</td>
              <td>${product.description}</td>
              <td>${product.category || 'N/A'}</td>
              <td><img src="${imageSrc}" alt="${product.name}" width="50"></td>
              <td>$${parseFloat(product.price).toFixed(2)}</td>
              <td>
                <a href="/admin/edit?id=${product.id}" class="btn btn-sm btn-primary">Edit</a>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${product.id}">Delete</button>
              </td>
            </tr>
          `;
        });
  
        // Attach delete handlers
        document.querySelectorAll('.delete-btn').forEach(button => {
          button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this product?')) {
              fetch(`/admin/delete/${productId}`, { method: 'DELETE' })
                .then(res => {
                  if (res.ok) {
                    location.reload();
                  } else {
                    alert("Failed to delete product.");
                  }
                })
                .catch(() => alert("Server error while deleting."));
            }
          });
        });
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        productList.innerHTML = `<tr><td colspan="7" class="text-danger">Failed to load products. Please try again later.</td></tr>`;
      });
  });
  