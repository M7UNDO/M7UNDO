gsap.registerPlugin(ScrollTrigger);

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
        </div>
        <div class="nav-menu">
          <ul class="navlinks">
            <li><a href="${repoName}/index.html">Home</a></li>
            <li><a href="${repoName}/shop/shop.html">Shop</a></li>
            <li><a href="${repoName}/about/about.html">About</a></li>
            <li><a href="${repoName}/contact/contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="header-actions">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
            <a class="cart-holder" href="${repoName}/cart/cart.html">
               <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>
               <span>0</span>
            </a>
            
        </div>
      </nav>
  `;

  navContainer.innerHTML = navHTML;

  const navlinks = navContainer.querySelectorAll(".navlinks a");
  navlinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPath) link.classList.add("active");
  });

  navlinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link, {
        y: -5,
        scale: 1.2,
        color: accentColour,
        duration: 0.2,
        fontWeight: "bold",
        ease: "power1.inOut",
      });
    });
    link.addEventListener("mouseleave", () => {
      gsap.to(link, {
        y: 0,
        scale: 1,
        color: "",
        duration: 0.2,
        fontWeight: "",
        ease: "power2.inOut",
      });
    });
  });

  // ScrollTrigger
  ScrollTrigger.create({
    trigger: ".nav-container",
    start: "top top",
    end: "top top",
    endTrigger: "footer",
    pin: true,
    pinSpacing: false,
  });
}

window.addEventListener("DOMContentLoaded", () => {
  loadNav();
  updateCartCounter();
});

function updateCartCounter() {
  const cartCounter = document.querySelector(".header-actions span");
  if (!cartCounter) return; // in case header doesn't exist on a page

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  // Total items (sum of quantities)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCounter.textContent = totalItems;
}

const backToTopBtn = document.querySelector(".back-to-top");


//Back to top button logic
function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
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

backToTopBtn.addEventListener("click", ()=>{
  topFunction();
})
