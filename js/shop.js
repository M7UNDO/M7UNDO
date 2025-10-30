async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (response.ok) {
      const products = await response.json();
      console.log(products);

      displayProducts(products);
    } else {
      throw new Error(`Error ${response.status}, ${response.statusText}`);
    }
  } catch (error) {
    console.log(error);
  }
}

getProducts();

/*
function displayProducts(products){
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  productList.classList.remove("loading");

  products.forEach(product =>{
    const productItem = document.createElement("img");
    productItem.className = "product-item";
    productItem.src = product.image;
    productList.appendChild(productItem);
  })
}*/

function displayProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  productList.classList.remove("loading");

  const productHTML = products
    .map(
      (product) => `
    <div class="product" data-id="${product.id}">
         <div class="image-holder"><img src="${product.image}" alt="${product.title}"></div>
         <p class= "product-title">${product.title}</p>
         <span class="product-price">
            R ${product.price.toLocaleString("en-ZA", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
         </span>
         <button class="add-to-cart-btn">Add To Cart</button>
    </div>
  `
    )
    .join("");

  productList.innerHTML = productHTML;

  gsap.from(".product", {
    y: 40,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: "power2.out",
  });

  setupAddToCartButtons();
}

const userId = 1; // fake user ID for now
let currentCart = JSON.parse(localStorage.getItem("cart")) || [];

function setupAddToCartButtons() {
  const buttons = document.querySelectorAll(".add-to-cart-btn");
  const cartCounter = document.querySelector(".header-actions span");

  // Ensure counter is synced with localStorage
  cartCounter.textContent = currentCart.length;

  buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const productElement = event.target.closest(".product");
      const productId = parseInt(productElement.dataset.id);

      // Check if item already in cart
      const existingItem = currentCart.find((item) => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        currentCart.push({productId, quantity: 1});
      }

      // Update counter + save to localStorage
      cartCounter.textContent = currentCart.length;
      localStorage.setItem("cart", JSON.stringify(currentCart));

      // Optional animation
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
  document.querySelector(".header-actions span").textContent = 0;
}
