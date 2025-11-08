let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
const EXCHANGE_RATE = 17;

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("activeUser"));
  const showGreeting = localStorage.getItem("showGreeting");
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".dot");
  let current = 0;

  if (user && showGreeting) {
    const userGreeting = document.getElementById("user-greeting");
    if (userGreeting) {
      userGreeting.style.display = "block";
      userGreeting.textContent = `Hi, ${user.firstname}!`;
      const tl = gsap.timeline({
        onComplete: () => (userGreeting.style.display = "none"),
      });
      tl.from(userGreeting, {opacity: 0, y: 20, duration: 1, ease: "power2.out"}).to(
        userGreeting,
        {opacity: 0, y: 20, duration: 0.5, ease: "power2.in"},
        "2"
      );
      localStorage.removeItem("showGreeting");
    }
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
    });
    const content = slides[index].querySelector(".hero-content");
    gsap.fromTo(content, {autoAlpha: 0, y: 50}, {duration: 1.2, autoAlpha: 1, y: 0, ease: "power3.out"});
  }
  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }
  dots.forEach((dot, i) =>
    dot.addEventListener("click", () => {
      current = i;
      showSlide(current);
    })
  );
  setInterval(nextSlide, 6000);
  showSlide(current);

  const featuredContainer = document.getElementById("featured-product-list");
  if (featuredContainer) loadFeaturedProducts();

  async function loadFeaturedProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      const featured = data.slice(0, 4).map((p) => ({
        ...p,
        category: mapCategory(p),
        price: parseFloat((p.price * EXCHANGE_RATE).toFixed(2)),
      }));
      displayProducts(featured, featuredContainer);
    } catch (error) {
      console.error("Error loading featured products:", error);
    }
  }

  const latestArrivalsContainer = document.getElementById("latest-arrivals");
  if (latestArrivalsContainer) loadLatestProducts();

  async function loadLatestProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const apiProducts = await response.json();

      const allProducts = apiProducts.map((p) => ({
        ...p,
        category: mapCategory(p),
        price: parseFloat((p.price * EXCHANGE_RATE).toFixed(2)),
      }));

      const latest = allProducts.slice(-8);
      displayProducts(latest, latestArrivalsContainer);
      setupScrollButtons();
    } catch (error) {
      console.error("Error loading latest products:", error);
    }
  }

  function mapCategory(product) {
    if (product.title.toLowerCase().includes("backpack")) return "accessories";
    if (product.category === "jewelery") return "jewellery";
    if (product.category.includes("clothing")) return "clothing";
    if (product.category === "electronics") return "electronics";
    return product.category;
  }

  function displayProducts(products, container) {
    const isGithub = window.location.hostname.includes("github.io");
    const repoName = isGithub ? "/M7UNDO" : "";

    container.innerHTML = products
      .map(
        (product) => `
      <div class="product" data-id="${product.id}">
        <a class="image-holder" href="${repoName}/product/product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.title}">
          <button class="add-to-cart-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px"
                 viewBox="0 -960 960 960" width="24px" fill="#000000">
              <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5
                T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5
                T360-160q0 33-23.5 56.5T280-80Zm400 
                0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5
                T680-240q33 0 56.5 23.5T760-160q0 33-23.5
                56.5T680-80ZM40-800v-80h131l170 
                360h280l156-280h91L692-482q-11 20-29.5 
                31T622-440H324l-44 80h480v80H280q-45 
                0-68.5-39t-1.5-79l54-98-144-304H40Z"/>
            </svg>
          </button>
        </a>
        <p class="product-title">${product.title}</p>
        <span class="product-price">
          R ${product.price.toLocaleString("en-ZA", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </span>
      </div>
    `
      )
      .join("");

    setupAddToCartButtons();
  }

  function setupScrollButtons() {
    const container = document.querySelector(".scroll-container");
    const leftBtn = document.querySelector(".scroll-btn.left");
    const rightBtn = document.querySelector(".scroll-btn.right");
    if (!container || !leftBtn || !rightBtn) return;

    leftBtn.addEventListener("click", () => container.scrollBy({left: -400, behavior: "smooth"}));
    rightBtn.addEventListener("click", () => container.scrollBy({left: 400, behavior: "smooth"}));
  }


  document.body.addEventListener("click", (event) => {
    const btn = event.target.closest(".add-to-cart-btn");
    if (!btn) return; 

    event.preventDefault();
    event.stopPropagation();

    const productElement = btn.closest(".product");
    const productId = parseInt(productElement.dataset.id);


    const sizeSelect = productElement.querySelector(".product-size-select");
    const selectedSize = sizeSelect ? sizeSelect.value : undefined;

    const existingItem = currentCart.find((i) => i.productId === productId && i.size === selectedSize);
    if (existingItem) existingItem.quantity += 1;
    else currentCart.push({productId, quantity: 1, size: selectedSize});

  
    const cartCounter = document.querySelector(".header-actions span");
    if (cartCounter) {
      cartCounter.textContent = currentCart.reduce((sum, i) => sum + i.quantity, 0);
    }
    localStorage.setItem("cart", JSON.stringify(currentCart));

    gsap.fromTo(productElement, {scale: 1}, {scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut"});
    const cartIconSVG = document.querySelector(".header-actions .cart-holder svg");
    if (cartIconSVG)
      gsap.fromTo(cartIconSVG, {scale: 1}, {scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut"});
  });
});
