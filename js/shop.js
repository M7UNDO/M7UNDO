const body = document.querySelector("body");
const currentCategory = body.dataset.category || "all";
const EXCHANGE_RATE = 17;

function mapCategory(product) {
  if (product.title.toLowerCase().includes("backpack")) return "accessories";
  if (product.category === "jewelery") return "jewellery";
  if (product.category.includes("clothing")) return "clothing";
  if (product.category === "electronics") return "electronics";
  return product.category;
}

let allProducts = [];
const userId = 1;
let currentCart = JSON.parse(localStorage.getItem("cart")) || [];

async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error(`Error ${response.status}`);

    const products = await response.json();

    const apiProducts = products.map((p) => ({
      ...p,
      category: mapCategory(p),
      price: parseFloat((p.price * EXCHANGE_RATE).toFixed(2)),
    }));

    allProducts = [...apiProducts, ...customProducts];

    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");

    let productsToDisplay = allProducts;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      productsToDisplay = allProducts.filter(
        (product) => product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
      );
    } else if (currentCategory.toLowerCase() !== "all") {
      productsToDisplay = allProducts.filter((p) => p.category.toLowerCase() === currentCategory.toLowerCase());
    }

    displayProducts(productsToDisplay);
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

function displayProducts(products) {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = "";
  productList.classList.remove("loading");

  const isGithub = window.location.hostname.includes("github.io");
  const repoName = isGithub ? "/M7UNDO" : "";

  const productHTML = products
    .map(
      (product) => `
    <div class="product" data-id="${product.id}">
      <a class="image-holder" href="${repoName}/product/product.html?id=${product.id}">
        <img src="${product.image}" alt="${product.title}">
        <button class="add-to-cart-btn">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" 
               viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160
            q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 
            0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 
            56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 
            360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 
            80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/>
          </svg>
        </button>
      </a>
      <p class="product-title">${product.title}</p>
      <span class="product-price">
        R ${product.price.toLocaleString("en-ZA", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
    </div>
  `
    )
    .join("");

  productList.innerHTML = productHTML;

  const imageHolder = document.querySelector(".image-holder");
  gsap.fromTo(imageHolder, {scale: 1}, {scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut"});

  setupAddToCartButtons();
  setupFavouriteButtons();
}

/*const searchInput_ = document.querySelector("[data-search]");

if (searchInput_) {
  searchInput_.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase().trim();
    const filteredProducts = allProducts.filter(
      (product) => product.title.toLowerCase().includes(value) || product.description.toLowerCase().includes(value)
    );
    displayProducts(filteredProducts);
  });
}*/

function setupAddToCartButtons() {
  const buttons = document.querySelectorAll(".add-to-cart-btn");
  const cartCounter = document.querySelector(".header-actions span");
  if (!cartCounter) return;

  cartCounter.textContent = currentCart.reduce((sum, item) => sum + item.quantity, 0);

  buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();

      const productElement = event.target.closest(".product");
      const productId = parseInt(productElement.dataset.id);

      const existingItem = currentCart.find((item) => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        currentCart.push({productId, quantity: 1});
      }

      cartCounter.textContent = currentCart.reduce((sum, item) => sum + item.quantity, 0);
      localStorage.setItem("cart", JSON.stringify(currentCart));

      gsap.fromTo(
        productElement,
        {scale: 1},
        {scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut"}
      );
    });
  });
}

function clearCart() {
  currentCart = [];
  localStorage.removeItem("cart");
  const counter = document.querySelector(".header-actions span");
  if (counter) counter.textContent = 0;
}

function setupFavouriteButtons() {
  const products = document.querySelectorAll(".product");

  products.forEach((product) => {
    const productId = parseInt(product.dataset.id);

    let favBtn = product.querySelector(".fav-btn");
    if (!favBtn) {
      favBtn = document.createElement("button");
      favBtn.classList.add("fav-btn");
      favBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="none" stroke="#000">
          <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/>
        </svg>
      `;
      product.querySelector(".image-holder").appendChild(favBtn);
    }

    const svg = favBtn.querySelector("svg");

    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (favourites.includes(productId)) {
      svg.classList.add("filled");
    } else {
      svg.classList.remove("filled");
    }

    favBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

      if (favourites.includes(productId)) {
        favourites = favourites.filter((id) => id !== productId); // remove
        svg.classList.remove("filled");
      } else {
        favourites.push(productId); // add
        svg.classList.add("filled");

        gsap.fromTo(svg, {scale: 1}, {scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut"});
      }

      localStorage.setItem("favourites", JSON.stringify(favourites));
    });
  });
}

getProducts();
