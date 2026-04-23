const API_URL = 'https://6963ddc62d146d9f58d4945b.mockapi.io/tshirt';

let products = [};
    let editIndex = null;

    function addProduct() {
      const nameInput = document.getElementById('product-name');
      const priceInput = document.getElementById('product-price');
      const name = nameInput.value.trim();
      const price = parseFloat(priceInput.value);   

      if (editIndex !== null) {
        products.push(products);
      } else {
        products[editIndex] = products;
        editIndex = null;
      }

      renderProducts();
      clearForm();
    }
    Function renderProducts() {
        const container = document.getElementById('products-container');
        container.innerHTML = '';

        products.forEach((product, index) => {
            container.innerHTML += `
                <div class="card">
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price.toFixed(2)}</p>
                    <button onclick="editProduct(${index})">Edit</button>   
                    <button onclick="deleteProduct(${index})">Delete</button>
                </div>
            `;
        }
    });
