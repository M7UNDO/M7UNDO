// cart.js
async function loadCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="empty-cart">Your cart is empty</p>`;
    totalDisplay.textContent = "R 0.00";
    return;
  }

  // Try fetching from API, fallback to local data if offline
  const products = await Promise.all(
    cart.map(async (item) => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${item.productId}`);
        if (!response.ok) throw new Error();
        return await response.json();
      } catch {
        return customProducts.find((p) => p.id === item.productId);
      }
    })
  );

  const cartDetails = products.map((product, index) => ({
    ...product,
    quantity: cart[index].quantity,
  }));

  cartContainer.innerHTML = cartDetails
    .map(
      (item) => `
      <div class="cart-item">
        <div class="image-holder"><img src="${item.image}" alt="${item.title}" class="cart-item-img"></div>
        <div class="cart-item-info">
          <p class="cart-item-title">${item.title}</p>
          <p class="cart-item-price">R ${item.price.toFixed(2)}</p>
          <div class="cart-item-quantity">
            <button class="qty-btn minus-btn" data-id="${item.id}">-</button>
            <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="cart-quantity-input">
            <button class="qty-btn plus-btn" data-id="${item.id}">+</button>
          </div>
        </div>
        <button class="remove-btn" data-id="${item.id}">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M292.31-140q-29.92 0-51.12-21.19Q220-182.39 220-212.31V-720h-40v-60h180v-35.38h240V-780h180v60h-40v507.69Q740-182 719-161q-21 21-51.31 21H292.31ZM680-720H280v507.69q0 5.39 3.46 8.85t8.85 3.46h375.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-720Z"/></svg>
        </button>
      </div>
    `
    )
    .join("");

  function updateTotal() {
    const total = cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalDisplay.textContent = `R ${total.toFixed(2)}`;
  }
  updateTotal();

  // Quantity input
  document.querySelectorAll(".cart-quantity-input").forEach((input) => {
    input.addEventListener("input", (e) => {
      const productId = parseInt(e.target.dataset.id);
      let newQty = parseInt(e.target.value);
      if (isNaN(newQty) || newQty < 1) newQty = 1;
      e.target.value = newQty;

      cart = cart.map((item) => (item.productId === productId ? { ...item, quantity: newQty } : item));
      cartDetails.forEach((item) => {
        if (item.id === productId) item.quantity = newQty;
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      updateTotal();
      updateCartCounter();
    });
  });

  // Plus/minus
  document.querySelectorAll(".plus-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = parseInt(e.target.dataset.id);
      const input = document.querySelector(`.cart-quantity-input[data-id="${productId}"]`);
      let newQty = parseInt(input.value) + 1;
      input.value = newQty;

      cart = cart.map((item) => (item.productId === productId ? { ...item, quantity: newQty } : item));
      localStorage.setItem("cart", JSON.stringify(cart));
      updateTotal();
      updateCartCounter();
    });
  });

  document.querySelectorAll(".minus-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = parseInt(e.target.dataset.id);
      const input = document.querySelector(`.cart-quantity-input[data-id="${productId}"]`);
      let newQty = parseInt(input.value) - 1;
      if (newQty < 1) newQty = 1;
      input.value = newQty;

      cart = cart.map((item) => (item.productId === productId ? { ...item, quantity: newQty } : item));
      localStorage.setItem("cart", JSON.stringify(cart));
      updateTotal();
      updateCartCounter();
    });
  });

  // Remove button
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = parseInt(e.target.closest(".remove-btn").dataset.id);
      cart = cart.filter((item) => item.productId !== productId);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
      updateCartCounter();
    });
  });
}

// Clear + checkout
document.getElementById("clear-cart-btn").addEventListener("click", () => {
  localStorage.removeItem("cart");
  loadCart();
  updateCartCounter();
});

document.getElementById("checkout-btn").addEventListener("click", () => {
  alert("Checkout simulated! Your order would now be processed.");
  localStorage.removeItem("cart");
  loadCart();
  updateCartCounter();
});

window.addEventListener("DOMContentLoaded", loadCart);
