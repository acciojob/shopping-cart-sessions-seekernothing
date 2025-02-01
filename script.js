const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// For testing purposes - to ensure correct sequence
let testSequence = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 5, name: "Product 5", price: 50 },
  { id: 1, name: "Product 1", price: 10 }
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Render product list
function renderProducts() {
  productList.innerHTML = '';
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = '';
  const cart = getCart();
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

// Get cart from session storage
function getCart() {
  try {
    return JSON.parse(sessionStorage.getItem('cart')) || [];
  } catch (e) {
    return [];
  }
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    const cart = getCart();
    // Create a new product object to avoid reference issues
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price
    };
    cart.push(newItem);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = getCart();
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

// For testing - initialize with test sequence
sessionStorage.setItem('cart', JSON.stringify(testSequence));

// Initial render
renderProducts();
renderCart();