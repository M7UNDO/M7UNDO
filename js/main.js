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
  const isGithub = window.location.hostname.includes("github.io");
  const repoName = isGithub ? "/M7UNDO" : "";

  const navHTML = `
    <header>
      <nav class="nav-container">
        <div class="nav-menu">
          <ul class="navlinks">
            <li><a href="${repoName}/index.html">Home</a></li>
            <li><a href="${repoName}/shop/shop.html">Shop</a></li>
            <li><a href="${repoName}/about/about.html">About</a></li>
            <li><a href="${repoName}/contact/contact.html">Contact</a></li>
          </ul>
        </div>
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
    end: "top top",
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

function displayProducts(products){

  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  productList.classList.remove("loading");

  const productHTML = products.map(product => `
    <div class= "product-item">
         <img src="${product.image}" alt="${product.title}">
         <h3 class= "product-title">${product.title}</h3>
         <p class= "product-price">${"R " + product.price}</p>
    </div>
  `).join("");

  productList.innerHTML = productHTML;

  gsap.from(".product-item",{
    y: 40,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: "power2.out"

  })

}
