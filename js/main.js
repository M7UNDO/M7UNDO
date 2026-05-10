gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(DrawSVGPlugin);

window.addEventListener("load", () => {
  const progressCircle = document.querySelector(".progress-circle");
  const loaderText = document.querySelector(".loader-text");
  const loader = document.querySelector(".loader");

  gsap.set(progressCircle, {opacity: 1, visibility: "visible", drawSVG: "0% 0%"});

  gsap.to(progressCircle, {
    duration: 0.2,
    drawSVG: "0% 100%",
    ease: "power2.inOut",
    onUpdate: function () {
      const progress = Math.round(this.progress() * 100);
      loaderText.textContent = `${progress}%`;
    },
    onComplete: function () {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => loader.remove(),
      });
    },
  });
});

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
const transparentColour = getComputedStyle(root).getPropertyValue("--transparent-colour");

function loadNav() {
  const navContainer = document.querySelector("#nav-placeholder");

  if (!navContainer) return;

  const isGithub = window.location.hostname.includes("github.io");
  const repoName = isGithub ? "/Shop-Northstar-Studios" : "";

  const navHTML = `
      <nav class="nav-container">
       <div class="nav-logo">
          <a  href="${repoName}/index.html"><svg id="logo" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 426.2 441.6" style="enable-background:new 0 0 426.2 441.6;" xml:space="preserve">
<g>
	<line x1="106.2" y1="195.3" x2="101.5" y2="186"/>
	<g>
		<line x1="106.2" y1="195.3" x2="101.5" y2="186"/>
		<polygon points="208.5,224.9 208.5,414.1 188.1,402.3 167.6,390.5 151.2,357.3 147.1,349 134.8,324.1 126.7,307.5 118.4,290.9 
			106.2,265.9 102,257.6 85.6,224.3 85.6,343.2 65.1,331.3 44.6,319.5 44.6,130.2 65.1,142.1 85.6,153.9 101.5,186 106.2,195.3 
			118.1,219.4 126.7,236.7 134.6,252.7 147.1,278 151.1,286 167.6,319.3 167.6,201.3 188.1,213.1 		"/>
	</g>
	<g>
		<polygon points="258.6,248.6 258.6,272.3 279.1,260.5 299.6,248.6 320.1,236.7 340.6,224.9 361.1,213 381.6,201.1 381.6,319.5 
			361.1,331.3 340.6,343.2 320.1,355 299.6,366.9 279.1,378.7 258.6,390.5 238.2,402.3 217.7,414.1 217.7,367.2 238.2,355.4 
			258.6,343.6 279.1,331.7 299.6,319.9 320.1,308 340.6,296.2 340.6,272.4 320.1,284.3 299.6,296.1 279.1,308 258.6,319.8 
			238.2,331.7 217.7,343.5 217.7,224.9 238.2,213.1 258.6,201.3 279.1,189.4 299.6,177.6 320.1,165.8 340.6,153.9 361.1,142.1 
			381.6,130.2 381.6,177.3 361.1,189.2 340.6,201.1 320.1,213 299.6,224.9 279.1,236.7 		"/>
	</g>
	<g>
		<polyline points="315.8,86.9 295.3,75 274.8,63.2 254.3,51.4 233.8,39.5 213.2,27.7 213.6,27.5 234.1,39.3 254.6,51.2 275.1,63 
			295.6,74.9 316.1,86.7 		"/>
		<polygon points="254.1,193.2 254.2,193.3 233.7,205.1 213.1,217 192.6,205.2 172.1,193.5 151.6,181.7 131,169.9 110.5,158.1 
			89.9,146.3 69.3,134.4 48.7,122.6 49.3,122.3 69.9,134.2 90.4,146 110.9,157.8 151.9,181.5 172.3,193.3 192.8,205.1 213.1,216.9 
			233.5,205.1 		"/>
		<polygon points="315.8,157.7 295.3,169.6 274.8,181.4 274.6,181.3 295.2,169.5 315.7,157.6 		"/>
		<line x1="315.8" y1="157.7" x2="315.7" y2="157.6"/>
		<line x1="295.3" y1="169.6" x2="295.2" y2="169.5"/>
		<line x1="274.8" y1="181.4" x2="274.6" y2="181.3"/>
		<line x1="254.2" y1="193.3" x2="254.1" y2="193.2"/>
		<line x1="233.7" y1="205.1" x2="233.5" y2="205.1"/>
		<polygon points="295.4,145.9 315.7,157.6 295.2,169.5 274.6,181.3 254.3,169.6 233.8,157.8 213.3,146 192.8,134.2 172.2,122.4 
			151.7,110.6 131.1,122.5 172.2,146.1 192.7,157.9 213.2,169.7 233.7,181.5 254.1,193.2 233.5,205.1 213.1,216.9 192.8,205.1 
			172.3,193.3 151.9,181.5 110.9,157.8 90.4,146 69.9,134.2 49.3,122.3 69.3,110.7 89.9,98.8 110.6,86.9 151.8,63.1 172.4,51.3 
			193,39.4 213.2,27.7 233.8,39.5 254.3,51.4 274.8,63.2 295.3,75 315.8,86.9 295.6,98.5 275,110.4 254.5,98.6 234,86.8 213.5,74.9 
			192.9,86.8 213.4,98.7 233.9,110.5 254.4,122.3 274.9,134.1 		"/>
		<line x1="192.8" y1="205.1" x2="192.6" y2="205.2"/>
		<line x1="172.3" y1="193.3" x2="172.1" y2="193.5"/>
		<line x1="316.1" y1="86.7" x2="315.8" y2="86.9"/>
		<line x1="151.9" y1="181.5" x2="151.6" y2="181.7"/>
		<line x1="295.6" y1="74.9" x2="295.3" y2="75"/>
		<line x1="131.4" y1="169.7" x2="131" y2="169.9"/>
		<line x1="275.1" y1="63" x2="274.8" y2="63.2"/>
		<line x1="110.9" y1="157.8" x2="110.5" y2="158.1"/>
		<line x1="254.6" y1="51.2" x2="254.3" y2="51.4"/>
		<line x1="90.4" y1="146" x2="89.9" y2="146.3"/>
		<line x1="234.1" y1="39.3" x2="233.8" y2="39.5"/>
		<line x1="69.9" y1="134.2" x2="69.3" y2="134.4"/>
	</g>
	<g>
		<g>
			<polygon points="333.2,124.3 326.1,117.5 326.1,153.7 			"/>
			<polygon points="319.1,124.3 326.2,117.5 326.2,153.7 			"/>
		</g>
		<g>
			<polygon points="319.1,110.6 326.2,117.5 326.2,81.3 			"/>
			<polygon points="333.2,110.6 326.1,117.5 326.1,81.3 			"/>
		</g>
		<g>
			<polygon points="333,110.5 326.2,117.5 362.4,117.5 			"/>
			<polygon points="333,124.5 326.2,117.5 362.4,117.5 			"/>
		</g>
		<g>
			<polygon points="319.3,124.5 326.1,117.4 289.9,117.4 			"/>
			<polygon points="319.3,110.4 326.1,117.5 289.9,117.5 			"/>
		</g>
	</g>
</g>
</svg></a>
          <a class="closeBtn" aria-label="close" onclick="closeNav()"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></a>
        </div>
        <div class="nav-menu" id="main-nav">
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
            <li id="category-parent"><span>Shop<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg></span></li>
            <li><a href="${repoName}/wishlist/wishlist.html">Wishlist</a></li>
            <li><a href="${repoName}/about/about.html">About</a></li>
          </ul>
        </div>
        <div class="nav-menu sub">
          <button id="back-to-nav"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>Back</button>
          <ul class="navlinks">
            <li><a href="${repoName}/shop/shop.html">All Products</a></li>
            <li><a href="${repoName}/shop/clothing.html">Clothing</a></li>
            <li><a href="${repoName}/shop/jewellery.html">Jewellery</a></li>
            <li><a href="${repoName}/shop/accessories.html">Accessories</a></li>
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
                 <div class="login-details"><a href="${repoName}/login.html">Login</a>| <a href="${repoName}/signup.html">Register</a></div>
                 <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
            </div>
            <div class="login-container loggedin">
               <div class="login-details"><span>Hi User</span> | <a href="${repoName}/login.html">Logout</a></div>
               <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
            </div>
        </div>
      </nav>
  `;

  navContainer.innerHTML = navHTML;

  const mobileNavActions = document.querySelector(".nav-actions");
  mobileNavActions.innerHTML = "";

  navActionsHTML = `
       <svg class="search-icon mobile" xmlns="http://www.w3.org/2000/svg" height="24px" 
                viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580
                q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38
                69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760
                q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
        </svg>
        <a href="${repoName}/cart/cart.html" class="mobile-cart-container">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path
              d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"
            />
          </svg>
          <span>0</span>
        </a>
  
  `;

  mobileNavActions.innerHTML = navActionsHTML;

  const dropdownLinks = navContainer.querySelectorAll(".dropdown-menu a");
  dropdownLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link, {color: "white", duration: 0.1});
    });
    link.addEventListener("mouseleave", () => {
      gsap.to(link, {color: "", duration: 0.1});
    });
  });

  const categoryParent = document.getElementById("category-parent");
  const backToNavBtn = document.getElementById("back-to-nav");

  categoryParent.addEventListener("click", () => {
    const categoryMenu = document.querySelector(".nav-menu.sub");
    const mainNav = document.getElementById("main-nav");

    mainNav.style.display = "none";
    categoryMenu.style.display = "flex";
  });

  backToNavBtn.addEventListener("click", () => {
    const categoryMenu = document.querySelector(".nav-menu.sub");
    const mainNav = document.getElementById("main-nav");

    mainNav.style.display = "flex";
    categoryMenu.style.display = "none";
  });

  const navlinks = navContainer.querySelectorAll(".navlinks a");
  navlinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPath) link.classList.add("active");
  });

  navlinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link, {
        scale: 1.1,
        color: accentColour,
        duration: 0.1,
        fontWeight: "bold",
        ease: "power1.inOut",
      });
    });
    link.addEventListener("mouseleave", () => {
      gsap.to(link, {
        scale: 1,
        color: "",
        duration: 0.1,
        fontWeight: "",
        ease: "power2.inOut",
      });
    });
  });

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

  const logoutLink = loggedInContainer?.querySelector("a");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("activeUser");
      const isGithub = window.location.hostname.includes("github.io");
      const repoName = isGithub ? "/Shop-Northstar-Studios" : "";

      window.location.href = `${repoName}/index.html`;
    });
  }
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

    if (window.location.pathname.includes("shop.html")) {
      displayProducts(allProducts);
    }
  });

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    const isShopPage = window.location.pathname.includes("shop.html");

    if (isShopPage) {
      const filteredProducts = allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()),
      );
      displayProducts(filteredProducts, query);
    } else {
      const isGithub = window.location.hostname.includes("github.io");
      const repoName = isGithub ? "/Shop-Northstar-Studios" : "";
      window.location.href = `${repoName}/shop/shop.html?search=${encodeURIComponent(query)}`;
    }
  });
}

function loadThemeButton() {
  const themeBtnContainer = document.getElementById("theme-btn-container");
  themeBtnContainer.innerHTML = "";

  const BtnContainerHTML = `
      <button class="theme-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
      </button>
        
  `;

  themeBtnContainer.innerHTML = BtnContainerHTML;
}

window.addEventListener("DOMContentLoaded", () => {
  loadNav();
  loadThemeButton();
  updateCartCounter();
  loadSearch();

  const searchIcons = document.querySelectorAll(".search-icon");
  const searchOverlay = document.querySelector(".search-overlay");
  const searchBox = document.querySelector(".search-box");
  const searchClose = document.querySelector("#search-close");
  const searchClear = document.querySelector("#search-clear");
  const searchInput = document.querySelector("#search-input");

  if (!searchIcons || !searchOverlay) return;

  searchIcons.forEach((searchIcon) => {
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
  });

  searchClose.addEventListener("mouseover", () => {
    gsap.to(searchClose, {scale: 1.1, fill: accentColour, duration: 0.2, ease: "power2.out"});
  });

  searchClose.addEventListener("mouseleave", () => {
    gsap.to(searchClose, {scale: 1, fill: "", duration: 0.2, ease: "power2.out"});
  });

  searchClear.addEventListener("mouseover", () => {
    gsap.to(searchClear, {scale: 1.1, fill: accentColour, duration: 0.2, ease: "power2.out"});
  });

  searchClear.addEventListener("mouseleave", () => {
    gsap.to(searchClear, {scale: 1, fill: "", duration: 0.2, ease: "power2.out"});
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

//Udate all of my cart counters
function updateCartCounter() {
  const cartCounter = document.querySelector(".header-actions span");
  const cartCounterMobile = document.querySelector(".mobile-cart-container span");
  if (!cartCounter) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCounter.textContent = totalItems;
  cartCounterMobile.textContent = totalItems;
}

function openNav() {
  const nav = document.querySelector(".nav-container");
  const overlay = document.querySelector(".overlay");
  const burger = document.querySelector(".burger-container");
  const navActions = document.querySelector(".nav-actions");
  const header = document.querySelector("header");

  if (!nav || !overlay) return;

  gsap.set(nav, {x: "-100%", display: "flex"});
  gsap.set(overlay, {opacity: 0, display: "block"});

  gsap.to(nav, {x: "0%", duration: 0.5, ease: "power3.out"});
  gsap.to(overlay, {opacity: 1, duration: 0.5, ease: "power2.out"});

  document.body.style.overflow = "hidden";
  header.style.backgroundColor = transparentColour;
  header.style.boxShadow = "none";

  if (burger) burger.style.display = "none";
  if (navActions) navActions.style.display = "none";
}

function closeNav() {
  const nav = document.querySelector(".nav-container");
  const overlay = document.querySelector(".overlay");
  const burger = document.querySelector(".burger-container");
  const navActions = document.querySelector(".nav-actions");
  const header = document.querySelector("header");

  if (!nav || !overlay) return;

  gsap.to(nav, {
    x: "-100%",
    duration: 0.5,
    ease: "power3.in",
    onComplete: () => (nav.style.display = "none"),
  });
  gsap.to(overlay, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => (overlay.style.display = "none"),
  });

  document.body.style.overflow = "";
  header.style.backgroundColor = "";
  header.style.boxShadow = "";

  if (burger) burger.style.display = "block";
  if (navActions) navActions.style.display = "flex";
}

const backToTopBtn = document.querySelector(".back-to-top");

function scrollFunction() {
  if (!backToTopBtn) return;

  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

//Scroll to top of the page
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
