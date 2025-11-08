document.addEventListener("DOMContentLoaded", async () => {
  const productList = document.getElementById("product-list");
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  if (favourites.length === 0) {
    productList.innerHTML = `<p style="grid-column: 1 / -1;">You have no favourite items yet</p>`;
    return;
  }

  let products = [];
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const apiProducts = await response.json();
    products = [...apiProducts, ...(window.customProducts || [])];
  } catch (error) {
    console.warn("Falling back to local data:", error);
    products = window.customProducts || [];
  }

  const EXCHANGE_RATE = 17;
  const favouritesData = products.filter((p) => favourites.includes(p.id));
  const isGithub = window.location.hostname.includes("github.io");
  const repoName = isGithub ? "/M7UNDO" : "";

  productList.innerHTML = favouritesData
    .map((product) => {
      product.price = parseFloat((product.price * EXCHANGE_RATE).toFixed(2));
      const isFav = favourites.includes(product.id);

      return `
        <div class="product" data-id="${product.id}">
          <a class="image-holder" href="${repoName}/product/product.html?id=${product.id}">
            <button class="fav-btn" data-id="${product.id}">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px"
                viewBox="0 -960 960 960" width="24px"
                class="${isFav ? "filled" : ""}"
                fill="none" stroke="#000">
                <path d="m480-120-58-52q-101-91-167-157T150-447.5
                Q111-500 95.5-544T80-634q0-94 63-157t157-63
                q52 0 99 22t81 62q34-40 81-62t99-22q94 0 
                157 63t63 157q0 46-15.5 90T810-447.5
                Q771-395 705-329T538-172l-58 52Z"/>
              </svg>
            </button>
            <img src="${product.image}" alt="${product.title}">
            <button class="add-to-cart-btn" data-id="${product.id}">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>
            </button>
          </a>
          <h3 class="product-title">${product.title}</h3>
          <p class="product-price">
            R ${product.price.toLocaleString("en-ZA", {minimumFractionDigits: 2})}
          </p>
        </div>
      `;
    })
    .join("");

    setupWishlistAddToCartButtons();

  function setupWishlistAddToCartButtons() {
    document.body.addEventListener("click", (event) => {
      const btn = event.target.closest(".add-to-cart-btn");
      if (!btn) return;

      event.preventDefault();
      event.stopPropagation();

      const productElement = btn.closest(".product");
      if (!productElement) return;

      const productId = parseInt(productElement.dataset.id);
      const sizeSelect = productElement.querySelector(".product-size-select");
      const selectedSize = sizeSelect ? sizeSelect.value : undefined;


      if (sizeSelect && !selectedSize) {
        alert("Please select a size before adding to cart.");
        return;
      }

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find((item) => item.productId === productId && item.size === selectedSize);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          productId,
          title: productElement.querySelector(".product-title").textContent,
          price: parseFloat(productElement.querySelector(".product-price").textContent.replace(/[^\d.]/g, "")),
          image: productElement.querySelector("img").src,
          quantity: 1,
          size: selectedSize,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      const cartCounter = document.querySelector(".header-actions span");
      if (cartCounter) {
        cartCounter.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
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
  }

  document.querySelectorAll(".fav-btn").forEach((btn) => {
    const svgPath = btn.querySelector("path");
    const id = parseInt(btn.dataset.id);

    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const isFav = favourites.includes(id);
    if (isFav) {
      svgPath.style.fill = "red";
      svgPath.style.stroke = "none";
    } else {
      svgPath.style.fill = "none";
      svgPath.style.stroke = "#000";
    }

    const pathLength = svgPath.getTotalLength();
    svgPath.style.strokeDasharray = pathLength;
    svgPath.style.strokeLinecap = "round";
    svgPath.style.strokeLinejoin = "round";
    svgPath.style.strokeDashoffset = isFav ? 0 : pathLength;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
      const isFav = favourites.includes(id);

      gsap.fromTo(btn, {scale: 1}, {scale: 1.3, duration: 0.2, yoyo: true, repeat: 1});

      if (isFav) {

        favourites = favourites.filter((f) => f !== id);
        localStorage.setItem("favourites", JSON.stringify(favourites));

        svgPath.style.fill = "none";
        svgPath.style.stroke = "#000";

        gsap.fromTo(
          svgPath,
          {strokeDashoffset: 0},
          {
            strokeDashoffset: pathLength,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              btn.closest(".product").remove();

              if (document.querySelectorAll(".product").length === 0) {
                document.getElementById(
                  "product-list"
                ).innerHTML = `<p style="grid-column: 1 / -1;">You have no favourite items yet 💔</p>`;
              }
            },
          }
        );
      } else {
        favourites.push(id);
        localStorage.setItem("favourites", JSON.stringify(favourites));

        svgPath.style.fill = "none";
        svgPath.style.stroke = "#000";
        svgPath.style.strokeDashoffset = pathLength;

        gsap.to(svgPath, {
          strokeDashoffset: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => gsap.to(svgPath, {fill: "red", duration: 0.3}),
        });
      }
    });
  });
});
