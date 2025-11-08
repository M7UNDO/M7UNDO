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

  const wishlistBtn = document.querySelector(".fav-btn");
  const favSvg = wishlistBtn.querySelector("svg path");
  const pathLength = favSvg.getTotalLength();

  favSvg.style.stroke = "#000";
  favSvg.style.strokeLinecap = "round";
  favSvg.style.strokeLinejoin = "round";
  favSvg.style.strokeDasharray = pathLength;
  favSvg.style.transition = "fill 0.3s ease";

  wishlistBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const id = product.id;
    const isFav = favourites.includes(id);

    gsap.fromTo(wishlistBtn, {scale: 1}, {scale: 1.3, duration: 0.2, yoyo: true, repeat: 1});

    if (isFav) {
      // remove from favourites
      favourites = favourites.filter((f) => f !== id);
      localStorage.setItem("favourites", JSON.stringify(favourites));

      gsap.fromTo(
        favSvg,
        {strokeDashoffset: 0},
        {
          strokeDashoffset: pathLength,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            favSvg.style.fill = "none";
            favSvg.style.stroke = "#000";
            favSvg.style.strokeDashoffset = 0;
          },
        }
      );
    } else {
      // add to favourites
      favourites.push(id);
      localStorage.setItem("favourites", JSON.stringify(favourites));

      favSvg.style.fill = "none";
      favSvg.style.stroke = "#000";
      favSvg.style.strokeDashoffset = pathLength;

      gsap.to(favSvg, {
        strokeDashoffset: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => gsap.to(favSvg, {fill: "red", duration: 0.3}),
      });
    }
  });
}

function displayProductDetails(product) {
  const container = document.getElementById("product-details");
  container.classList.remove("loading");

  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  const isFav = favourites.includes(product.id);

  const isClothing = product.category?.toLowerCase().includes("clothing");
  const sizeOptions = isClothing
    ? `<div class="size-selector">
         <label for="size">Size:</label>
         <select id="size" class="size-select">
           <option value="Small">Small</option>
           <option value="Medium" selected>Medium</option>
           <option value="Large">Large</option>
         </select>
       </div>`
    : "";

  container.innerHTML = `
    <div class="product-detail">
      <div class="image-holder"><img src="${product.image}" alt="${product.title}" /></div>
      <div class="details">
        <div>
          <h1>${product.title}</h1>
          <p class="price">R ${product.price.toLocaleString("en-ZA", {minimumFractionDigits: 2})}</p>
        </div>
        <p class="description">${product.description}</p>

        ${sizeOptions}

        <div class="quantity-controls">
          <label for="quantity">Quantity:</label>
          <div class="quantity-wrapper">
            <button type="button" id="decrease-btn">-</button>
            <input type="number" id="quantity" name="quantity" min="1" value="1">
            <button type="button" id="increase-btn">+</button>
          </div>
        </div>

        <div id="product-actions">
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

          <button class="fav-btn" data-id="${product.id}">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px"
                 viewBox="0 -960 960 960" width="24px"
                 class="${isFav ? "filled" : ""}"
                 fill="${isFav ? "red" : "none"}" stroke="${isFav ? "none" : "#000"}">
              <path d="m480-120-58-52q-101-91-167-157T150-447.5
                       Q111-500 95.5-544T80-634q0-94 63-157t157-63
                       q52 0 99 22t81 62q34-40 81-62t99-22
                       q94 0 157 63t63 157q0 46-15.5 90T810-447.5
                       Q771-395 705-329T538-172l-58 52Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  setupProductCartLogic(product, isClothing);
}

function setupProductCartLogic(product, isClothing) {
  const addToCartBtn = document.querySelector(".add-to-cart-btn");
  const quantityInput = document.getElementById("quantity");
  const increaseBtn = document.getElementById("increase-btn");
  const decreaseBtn = document.getElementById("decrease-btn");
  const favBtn = document.querySelector(".fav-btn");

  const sizeSelect = isClothing ? document.getElementById("size") : null;

  const updateButtonPrice = () => {
    const quantity = parseInt(quantityInput.value);
    const totalPrice = (product.price * quantity).toLocaleString("en-ZA", {minimumFractionDigits: 2});
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
    const selectedSize = isClothing && sizeSelect ? sizeSelect.value : "Medium";

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.productId === product.id && item.size === selectedSize);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
        size: selectedSize, // store size
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();

    gsap.fromTo(addToCartBtn, {scale: 1}, {scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut"});
  });
}

getProductDetails();
