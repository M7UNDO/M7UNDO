async function loadCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="empty-cart">Your cart is empty</p>`;
    totalDisplay.textContent = "R 0.00";
    return;
  }

  // Fetch product details for each productId in the cart
  const productRequests = cart.map(item =>
    fetch(`https://fakestoreapi.com/products/${item.productId}`).then(res => res.json())
  );

  const products = await Promise.all(productRequests);

  // Combine API data with quantity info
  const cartDetails = products.map((product, index) => ({
    ...product,
    quantity: cart[index].quantity
  }));

  // Display products
  cartContainer.innerHTML = cartDetails
    .map(
      (item) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-info">
          <p class="cart-item-title">${item.title}</p>
          <p class="cart-item-price">R ${item.price.toFixed(2)}</p>
          <p class="cart-item-quantity">Qty: ${item.quantity}</p>
          <button class="remove-btn" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `
    )
    .join("");

  // Calculate total
  const total = cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalDisplay.textContent = `R ${total.toFixed(2)}`;

  // Remove button logic
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = parseInt(e.target.dataset.id);
      cart = cart.filter(item => item.productId !== productId);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart(); // refresh display
    });
  });
}

// Clear Cart
document.getElementById("clear-cart-btn").addEventListener("click", () => {
  localStorage.removeItem("cart");
  loadCart();
});

// Simulate Checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
  alert("Checkout simulated! Your order would now be processed.");
  localStorage.removeItem("cart");
  loadCart();
});

// Run when page loads
window.addEventListener("DOMContentLoaded", loadCart);
