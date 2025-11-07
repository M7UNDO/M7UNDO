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
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    product = await response.json();

    const EXCHANGE_RATE = 17;
    product.price = parseFloat((product.price * EXCHANGE_RATE).toFixed(2));
  } catch (error) {
    console.warn("Falling back to local product data:", error);
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
          <p class="price">R ${product.price.toLocaleString("en-ZA", {minimumFractionDigits: 2})}</p>
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
          <button class="add-to-cart-btn">Add to Cart - R ${product.price.toLocaleString("en-ZA", {
            minimumFractionDigits: 2,
          })} 
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
          <button class="fav-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
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
  const favBtn = document.querySelector(".fav-btn"); // ✅ moved outside

  // --- PRICE UPDATE ---
  const updateButtonPrice = () => {
    const quantity = parseInt(quantityInput.value);
    const totalPrice = (product.price * quantity).toLocaleString("en-ZA", { minimumFractionDigits: 2 });
    addToCartBtn.innerHTML = `
      Add to Cart - R ${totalPrice} 
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
        <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 
        0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 
        0 56.5 23.5T360-160q0 33-23.5 
        56.5T280-80Zm400 0q-33 
        0-56.5-23.5T600-160q0-33 
        23.5-56.5T680-240q33 0 56.5 
        23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 
        360h280l156-280h91L692-482q-11 20-29.5 
        31T622-440H324l-44 80h480v80H280q-45 
        0-68.5-39t-1.5-79l54-98-144-304H40Z"/>
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

    gsap.fromTo(addToCartBtn, { scale: 1 }, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut" });
  });

  favBtn.addEventListener("click", () => {
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (favourites.includes(product.id)) {
      favourites = favourites.filter((id) => id !== product.id);
    } else {
      favourites.push(product.id);
    }
    localStorage.setItem("favourites", JSON.stringify(favourites));
    favBtn.querySelector("svg").setAttribute("fill", favourites.includes(product.id) ? "red" : "none");
  });
}


getProductDetails();
