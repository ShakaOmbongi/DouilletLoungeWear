
// Fetch and display products dynamically
fetch('/admin/products')
  .then(response => response.json())
  .then(products => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = "";
    products.forEach(product => {
      productList.innerHTML += `
        <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.description}</td>
          <td>${product.category}</td>
          <td><img src="${product.imageUrl}" alt="${product.name}" width="50"></td>
          <td>$${product.price.toFixed(2)}</td>
          <td>
            <a href="/admin/edit?id=${product.id}">Edit</a>
            <button class="btn delete-btn" data-id="${product.id}">Delete</button>
          </td>
        </tr>
      `;
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = e.target.getAttribute('data-id');
        fetch(`/admin/delete/${productId}`, { method: 'DELETE' })
          .then(() => location.reload());
      });
    });
  })
  .catch(error => console.error("Error fetching products:", error));