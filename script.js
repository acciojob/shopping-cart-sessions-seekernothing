const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Render product list
function renderProducts() {
  productList.innerHTML = ''; // Clear existing products
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  cartList.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => removeFromCart(item.id));
    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    // Create a new object to avoid reference issues
    const newItem = { ...product };
    cart.push(newItem);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  // Only remove one instance of the item
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem('cart');
  renderCart();
}

// Event delegation for Add to Cart buttons
productList.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart-btn')) {
    const productId = parseInt(event.target.dataset.id);
    addToCart(productId);
  }
});

// Event listener for Clear Cart button
clearCartBtn.addEventListener('click', clearCart);

// Initial render
renderProducts();
renderCart();