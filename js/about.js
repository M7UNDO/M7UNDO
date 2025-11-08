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

  const productGallery = document.getElementById("about-products");
  if (productGallery && typeof customProducts !== "undefined") {
    const productsToShow = customProducts.slice(1, 4); // skipping 0 first 3 products after that

    productGallery.innerHTML = productsToShow
      .map(
        (product) => `
      <div class="product" data-id="${product.id}">
        <div class="image-holder">
          <img src="${product.image}" alt="${product.title}" loading="lazy" />
          <button class="add-to-cart-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px"
                 viewBox="0 -960 960 960" width="24px" fill="#fff">
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
        </div>
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

    gsap.utils.toArray("#about-products .product").forEach((prod) => {
      gsap.from(prod, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: prod,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    setupAddToCartButtons();
  }

  function setupAddToCartButtons() {
    const buttons = document.querySelectorAll("#about-products .add-to-cart-btn");
    const cartCounter = document.querySelector(".header-actions span");
    const cartIconSVG = document.querySelector(".header-actions .cart-holder svg"); // cart icon

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

        if (cartIconSVG) {
          gsap.fromTo(
            cartIconSVG,
            {scale: 1},
            {scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut"}
          );
        }
      });
    });
  }
});
