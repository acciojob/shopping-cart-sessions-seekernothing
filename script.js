const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Load existing cart from sessionStorage or initialize an empty array
function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

// Save cart to sessionStorage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render the cart items in the UI
function renderCart() {
  cartList.innerHTML = ""; // Clear previous items
  const cart = getCart();

  cart.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price}`;
    cartList.appendChild(li);
  });
}

// Function to add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    let cart = getCart();
    cart.push({ id: product.id, name: product.name, price: product.price }); // Append product
    saveCart(cart); // Save updated cart to sessionStorage
    renderCart(); // Update UI
  }
}

// Function to clear cart
function clearCart() {
  sessionStorage.removeItem("cart"); // Remove cart from sessionStorage
  renderCart(); // Clear UI
}

// Initialize Product List UI
products.forEach((product) => {
  const li = document.createElement("li");
  li.textContent = `${product.name} - $${product.price}`;

  const button = document.createElement("button");
  button.textContent = "Add to Cart";
  button.onclick = () => addToCart(product.id); // Add product to cart on click

  li.appendChild(button);
  productList.appendChild(li);
});

// Attach clear cart button event
clearCartBtn.addEventListener("click", clearCart);

// Render cart on page load (restore from sessionStorage)
renderCart();
