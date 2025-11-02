async function loadCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="empty-cart">Your cart is empty</p>`;
    totalDisplay.textContent = "R 0.00";
    return;
  }


  const products = await Promise.all(
    cart.map((item) => fetch(`https://fakestoreapi.com/products/${item.productId}`).then((res) => res.json()))
  );

  const cartDetails = products.map((product, index) => ({
    ...product,
    quantity: cart[index].quantity,
  }));


  cartContainer.innerHTML = cartDetails
    .map(
      (item) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-info">
          <p class="cart-item-title">${item.title}</p>
          <p class="cart-item-price">R ${item.price.toFixed(2)}</p>
          <div class="cart-item-quantity">
            Qty: 
            <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="cart-quantity-input">
          </div>
          <button class="remove-btn" data-id="${
            item.id
          }"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
        </div>
      </div>
    `
    )
    .join("");

  // Update total
  function updateTotal() {
    const total = cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalDisplay.textContent = `R ${total.toFixed(2)}`;
  }
  updateTotal();

  // Quantity change logic
  document.querySelectorAll(".cart-quantity-input").forEach((input) => {
    input.addEventListener("input", (e) => {
      const productId = parseInt(e.target.dataset.id);
      let newQty = parseInt(e.target.value);
      if (isNaN(newQty) || newQty < 1) newQty = 1;
      e.target.value = newQty;


      cart = cart.map((item) => (item.productId === productId ? {...item, quantity: newQty} : item));
      cartDetails.forEach((item) => {
        if (item.id === productId) item.quantity = newQty;
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      updateTotal();
      updateCartCounter(); 
    });
  });


  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const button = e.target.closest(".remove-btn");
      const productId = parseInt(button.dataset.id);

      cart = cart.filter((item) => item.productId !== productId);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
      updateCartCounter();
    });
  });
}


document.getElementById("clear-cart-btn").addEventListener("click", () => {
  localStorage.removeItem("cart");
  loadCart();
  updateCartCounter();
});


document.getElementById("checkout-btn").addEventListener("click", () => {
  alert("Checkout simulated! Your order would now be processed.");
  localStorage.removeItem("cart");
  loadCart();
});

window.addEventListener("DOMContentLoaded", loadCart);
