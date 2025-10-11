gsap.registerPlugin(ScrollTrigger);

const currentPath = window.location.pathname.split("/").pop();

const root = document.documentElement;
const primaryColour = getComputedStyle(root).getPropertyValue("--primary-colour");
const secondaryColour = getComputedStyle(root).getPropertyValue("--secondary-colour");
const typographyColour = getComputedStyle(root).getPropertyValue("--typography-colour");
const backgroundColour = getComputedStyle(root).getPropertyValue("--background-colour");

function loadNav() {
  const navContainer = document.getElementById("nav-placeholder");
  if (!navContainer) return;
  // Load nav
  const navHTML = `
      <header>
        <nav class="nav-container">
          <div class="nav-menu">
            <ul class="navlinks">
              <li><a href="/index.html">Home</a></li>
              <li><a href="/shop/shop.html">Shop</a></li>
              <li><a href="/about/about.html">About</a></li>
              <li><a href="/contact/contact.html">Contact</a></li>
            </ul>
          </div>
          <div class="nav-elements"></div>
        </nav>
      </header>
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
        color: secondaryColour,
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
    endTrigger: "footer",
    pin: true,
    markers: true,
  });
}

window.addEventListener("DOMContentLoaded", loadNav);

async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (response.ok) {
      const products = await response.json();
      console.log(products);
    } else {
      throw new Error(`Error ${response.status}, ${response.statusText}`);
    }
  } catch (error) {
    console.log(error);
  }
}

getProducts();
