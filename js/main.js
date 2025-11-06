gsap.registerPlugin(ScrollTrigger);

const categories = [
  {name: "Clothing", slug: "clothing"},
  {name: "Electronics", slug: "electronics"},
  {name: "Accessories", slug: "accessories"},
  {name: "Jewellery", slug: "jewellery"},
];

const currentPath = window.location.pathname.split("/").pop();

const root = document.documentElement;
const primaryColour = getComputedStyle(root).getPropertyValue("--primary-colour");
const accentColour = getComputedStyle(root).getPropertyValue("--accent-colour");
const typographyColour = getComputedStyle(root).getPropertyValue("--typography-colour");
const backgroundColour = getComputedStyle(root).getPropertyValue("--background-colour");

function loadNav() {
  const navContainer = document.querySelector("#nav-placeholder");
  if (!navContainer) return;

  const isGithub = window.location.hostname.includes("github.io");
  const repoName = isGithub ? "/M7UNDO" : "";

  const navHTML = `
      <nav class="nav-container">
       <div class="nav-logo">
          <div class="logo"><a href="${repoName}/index.html">M7UNDO</a></div>
          <label class="burgerbutton" aria-label="burger button"
           onclick="openNav()"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></label>
        </div>
        <div class="nav-menu">
          <a class="closeBtn" aria-label="close" onclick="closeNav()"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></a>
          <ul class="navlinks">
            <li><a href="${repoName}/index.html">Home</a></li>
            <li class="dropdown">
                <a href="${repoName}/shop/shop.html">Shop<svg id="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-357.85 253.85-584 296-626.15l184 184 184-184L706.15-584 480-357.85Z"/></svg></a>
            
                <ul class="dropdown-menu">
                   ${categories
                     .map((cat) => `<li><a href="${repoName}/shop/${cat.slug}.html">${cat.name}</a></li>`)
                     .join("")}
                </ul>
            </li>
            <li><a href="${repoName}/about/about.html">About</a></li>
            <li><a href="${repoName}/contact/contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="header-actions">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" height="24px" 
                viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580
                q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38
                69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760
                q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
           </svg>
            <a class="cart-holder" href="${repoName}/cart/cart.html">
               <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>
               <span>0</span>
            </a>
            <div class="login-container loggedout">
                 <a href="${repoName}/login.html">Login</a>| <a href="${repoName}/signup.html">Register</a>
                 <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
            </div>
            <div class="login-container loggedin">
               <span>Hi User</span> | <a href="${repoName}/login.html">Logout</a>
               <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
            </div>
        </div>
      </nav>
  `;

  navContainer.innerHTML = navHTML;

  const dropdownLinks = navContainer.querySelectorAll(".dropdown-menu a");
  dropdownLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link, {color: "white", duration: 0.1});
    });
    link.addEventListener("mouseleave", () => {
      gsap.to(link, {color: "", duration: 0.1});
    });
  });

  const navlinks = navContainer.querySelectorAll(".navlinks a");
  navlinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPath) link.classList.add("active");
  });

  navlinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link, {
        //scale: 1.1,
        color: accentColour,
        duration: 0.1,
        fontWeight: "bold",
        ease: "power1.inOut",
      });
    });
    link.addEventListener("mouseleave", () => {
      gsap.to(link, {
        //scale: 1,
        color: "",
        duration: 0.1,
        fontWeight: "",
        ease: "power2.inOut",
      });
    });
  });

  // Login/Logout logic
  const user = JSON.parse(localStorage.getItem("activeUser"));
  const loggedOutContainer = navContainer.querySelector(".login-container.loggedout");
  const loggedInContainer = navContainer.querySelector(".login-container.loggedin");
  const loggedInName = loggedInContainer?.querySelector("span");

  if (user) {
    if (loggedOutContainer) loggedOutContainer.style.display = "none";
    if (loggedInContainer) {
      loggedInContainer.style.display = "flex";
      if (loggedInName) loggedInName.textContent = `Hi, ${user.firstname}`;
    }
  } else {
    if (loggedOutContainer) loggedOutContainer.style.display = "flex";
    if (loggedInContainer) loggedInContainer.style.display = "none";
  }

  // Logout click
  const logoutLink = loggedInContainer?.querySelector("a");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("activeUser");
      window.location.href = "login.html";
    });
  }

  ScrollTrigger.create({
    trigger: ".nav-container",
    start: "top top",
    end: "top top",
    endTrigger: "footer",
    pin: true,
    pinSpacing: false,
  });
}

function loadSearch() {
  const searchOverlay = document.querySelector(".search-overlay");
  if (!searchOverlay) return;

  searchOverlay.innerHTML = `
     <form id="search-form" class="search-box" data-search-form>
        <input type="text" id="search-input" placeholder="Search..." data-search />
        <button type="button" id="search-clear" title="Clear Search">&times;</button>
        <button type="submit" hidden>Search</button>
     </form>
     <button id="search-close">&times;</button>
  `;

  const searchForm = document.querySelector("[data-search-form]");
  const searchInput = document.querySelector("[data-search]");
  const searchClose = document.getElementById("search-close");
  const searchClear = document.getElementById("search-clear");

  searchClose.addEventListener("click", () => {
    searchOverlay.classList.remove("active");
  });

  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    const isShopPage = window.location.pathname.includes("shop.html");

    if (isShopPage) {
      // Reload full product list
      displayProducts(allProducts);
    } else {
      // Remove query from URL and redirect back to shop
      const isGithub = window.location.hostname.includes("github.io");
      const repoName = isGithub ? "/M7UNDO" : "";
      window.location.href = `${repoName}/shop/shop.html`;
    }
  });

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    const isShopPage = window.location.pathname.includes("shop.html");

    if (isShopPage) {
      //Direct filter
      const filteredProducts = allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );
      displayProducts(filteredProducts);
    } else {
      // Redirect to shop page with a query
      const isGithub = window.location.hostname.includes("github.io");
      const repoName = isGithub ? "/M7UNDO" : "";
      window.location.href = `${repoName}/shop/shop.html?search=${encodeURIComponent(query)}`;
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  loadNav();
  updateCartCounter();
  loadSearch();

  const searchIcon = document.querySelector(".search-icon");
  const searchOverlay = document.querySelector(".search-overlay");
  const searchBox = document.querySelector(".search-box");
  const searchClose = document.querySelector("#search-close");
  const searchInput = document.querySelector("#search-input");

  if (!searchIcon || !searchOverlay) return;

  searchIcon.addEventListener("mouseover", () => {
    gsap.to(searchIcon, {scale: 1.1, fill: accentColour, duration: 0.2, ease: "power2.out"});
  });

  searchIcon.addEventListener("mouseleave", () => {
    gsap.to(searchIcon, {scale: 1, fill: "", duration: 0.2, ease: "power2.out"});
  });

  searchIcon.addEventListener("click", () => {
    searchOverlay.style.display = "flex";

    gsap.fromTo(searchOverlay, {opacity: 0}, {opacity: 1, duration: 0.4, ease: "power2.out"});

    gsap.fromTo(searchBox, {y: -40, opacity: 0}, {y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: "power2.out"});

    searchInput.focus();
  });

  // Close search overlay
  function closeSearch() {
    gsap.to(searchBox, {y: -40, opacity: 0, duration: 0.3});
    gsap.to(searchOverlay, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => (searchOverlay.style.display = "none"),
    });
  }

  searchClose.addEventListener("click", closeSearch);
  searchOverlay.addEventListener("click", (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSearch();
  });
});

function updateCartCounter() {
  const cartCounter = document.querySelector(".header-actions span");
  if (!cartCounter) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCounter.textContent = totalItems;
}

function openNav() {
  document.getElementsByClassName("nav-menu")[0].style.display = "flex";
  document.getElementsByClassName("overlay")[0].style.display = "block";
  document.body.style.overflow = "hidden";
  document.querySelector(".burgerbutton").style.display = "none";
}

function closeNav() {
  document.getElementsByClassName("nav-menu")[0].style.display = "none";
  document.getElementsByClassName("overlay")[0].style.display = "none";
  document.body.style.overflow = "";
  document.querySelector(".burgerbutton").style.display = "block";
}

//Back to top button logic
const backToTopBtn = document.querySelector(".back-to-top");

function scrollFunction() {
  if (!backToTopBtn) return;

  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

window.onscroll = function () {
  scrollFunction();
};

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    topFunction();
  });
}
