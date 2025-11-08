let currentCart = JSON.parse(localStorage.getItem("cart")) || [];

window.addEventListener("DOMContentLoaded", () => {
  gsap.utils.toArray(".fade-in").forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 40,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  const hero = document.querySelector(".about-hero .container");
  if (hero) {
    gsap.from(hero.children, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      delay: 0.2,
    });
  }

  gsap.utils.toArray("section img").forEach((img) => {
    gsap.from(img, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: img,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  });

  const cta = document.querySelector("#cta .container");
  if (cta) {
    gsap.from(cta, {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: cta,
        start: "top 90%",
      },
    });
  }

  const isGithub = window.location.hostname.includes("github.io");
  const repoName = isGithub ? "/M7UNDO" : "";

  const productGallery = document.getElementById("about-products");
  const EXCHANGE_RATE = 17;
  let allProducts = [];

  async function loadProductsForAbout() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("Failed to load products");

      const products = await response.json();

      const apiProducts = products.map((p) => ({
        ...p,
        category: p.category.toLowerCase(),
        price: parseFloat((p.price * EXCHANGE_RATE).toFixed(2)),
      }));

      allProducts = [...apiProducts, ...customProducts];
      displayAboutProducts();
    } catch (err) {
      console.error("Error loading products for About:", err);
    }
  }

  function displayAboutProducts() {
    const productGallery = document.getElementById("about-products");
    if (!productGallery) return;

    const productsToShow = allProducts.slice(21, 24);
    productGallery.innerHTML = productsToShow
      .map(
        (product) => `
      <div class="product" data-id="${product.id}">
        <a class="image-holder" href="${repoName}/product/product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.title}" loading="lazy" />
          <button class="add-to-cart-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px"
                 viewBox="0 -960 960 960" width="24px" fill="#fff">
              <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80
              q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 
              56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 
              0q-33 0-56.5-23.5T600-160q0-33 
              23.5-56.5T680-240q33 0 56.5 
              23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 
              360h280l156-280h91L692-482q-11 20-29.5 
              31T622-440H324l-44 80h480v80H280q-45 
              0-68.5-39t-1.5-79l54-98-144-304H40Z"/>
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

    setupAddToCartButtons();
  }

  loadProductsForAbout();

  function setupAddToCartButtons() {
    document.body.addEventListener("click", (event) => {
      const btn = event.target.closest(".add-to-cart-btn");
      if (!btn) return;

      event.preventDefault();
      event.stopPropagation();

      const productElement = btn.closest(".product");
      if (!productElement) return;

      const productId = parseInt(productElement.dataset.id);
      const existingItem = currentCart.find((item) => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        currentCart.push({productId, quantity: 1});
      }

      localStorage.setItem("cart", JSON.stringify(currentCart));

      const cartCounter = document.querySelector(".header-actions span");
      if (cartCounter) {
        cartCounter.textContent = currentCart.reduce((sum, item) => sum + item.quantity, 0);
      }

      gsap.fromTo(
        productElement,
        {scale: 1},
        {scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut"}
      );

      const cartIconSVG = document.querySelector(".header-actions .cart-holder svg");
      if (cartIconSVG) {
        gsap.fromTo(cartIconSVG, {scale: 1}, {scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut"});
      }
    });

    const cartCounter = document.querySelector(".header-actions span");
    if (cartCounter) {
      cartCounter.textContent = currentCart.reduce((sum, item) => sum + item.quantity, 0);
    }
  }
});
