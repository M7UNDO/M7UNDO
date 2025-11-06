// product.js
async function getProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));
  const productContainer = document.getElementById("product-details");

  if (!productId) {
    productContainer.textContent = "No product selected.";
    return;
  }

  let product = null;

  try {
    // Try fetching from FakeStore API
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    product = await response.json();
  } catch (error) {
    console.warn("Falling back to local product data:", error);
    // Fallback to local customProducts if API fails
    product = customProducts.find((p) => p.id === productId);
  }

  if (!product) {
    productContainer.textContent = "Product not found.";
    return;
  }

  displayProductDetails(product);
}

function displayProductDetails(product) {
  const container = document.getElementById("product-details");
  container.classList.remove("loading");

  container.innerHTML = `
    <div class="product-detail">
      <div class="image-holder"><img src="${product.image}" alt="${product.title}" /></div>
      <div class="details">
        <div>
          <h1>${product.title}</h1>
          <p class="price">R ${product.price.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}</p>
        </div>
        <p class="description">${product.description}</p>

        <div class="quantity-controls">
          <label for="quantity">Quantity:</label>
          <div class="quantity-wrapper">
            <button type="button" id="decrease-btn">-</button>
            <input type="number" id="quantity" name="quantity" min="1" value="1">
            <button type="button" id="increase-btn">+</button>
          </div>
        </div>

        <div>
          <button class="add-to-cart-btn">Add to Cart - R ${product.price.toLocaleString("en-ZA", { minimumFractionDigits: 2 })} 
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
              <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 
              0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 
              0 56.5 23.5T360-160q0 33-23.5 
              56.5T280-80Zm400 0q-33 
              0-56.5-23.5T600-160q0-33 
              23.5-56.5T680-240q33 
              0 56.5 23.5T760-160q0 
              33-23.5 56.5T680-80ZM40-800v-80h131l170 
              360h280l156-280h91L692-482q-11 20-29.5 
              31T622-440H324l-44 80h480v80H280q-45 
              0-68.5-39t-1.5-79l54-98-144-304H40Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  setupProductCartLogic(product);
}

function setupProductCartLogic(product) {
  const addToCartBtn = document.querySelector(".add-to-cart-btn");
  const quantityInput = document.getElementById("quantity");
  const increaseBtn = document.getElementById("increase-btn");
  const decreaseBtn = document.getElementById("decrease-btn");

  const updateButtonPrice = () => {
    const quantity = parseInt(quantityInput.value);
    const totalPrice = (product.price * quantity).toLocaleString("en-ZA", { minimumFractionDigits: 2 });
    addToCartBtn.innerHTML = `
      Add to Cart - R ${totalPrice} 
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
        <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80Z"/>
      </svg>
    `;
  };

  updateButtonPrice();

  increaseBtn.addEventListener("click", () => {
    quantityInput.stepUp();
    updateButtonPrice();
  });

  decreaseBtn.addEventListener("click", () => {
    quantityInput.stepDown();
    updateButtonPrice();
  });

  quantityInput.addEventListener("input", updateButtonPrice);

  addToCartBtn.addEventListener("click", () => {
    const quantity = parseInt(quantityInput.value);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();

    // GSAP feedback animation
    gsap.fromTo(addToCartBtn, { scale: 1 }, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut" });
  });
}

getProductDetails();
