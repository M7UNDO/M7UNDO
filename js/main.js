gsap.registerPlugin(ScrollTrigger);
const navlinks = document.querySelectorAll(".navlinks a");
const activeLink = document.querySelectorAll(".navlinks a.active");
const navContainer = document.querySelector(".nav-container");
const currentPath = window.location.pathname.split("/").pop();

const root = document.documentElement;
const primaryColour = getComputedStyle(root).getPropertyValue('--primary-colour');
const secondaryColour = getComputedStyle(root).getPropertyValue('--secondary-colour');
const typographyColour = getComputedStyle(root).getPropertyValue('--typography-colour');
const backgroundColour = getComputedStyle(root).getPropertyValue('--background-colour');

async function loadNav() {
    const navContainer = document.getElementById("nav-placeholder");
    if(!navContainer){return};
    try {
        const response = await fetch("../nav.html");
        const navHtml = await response.text();
        navContainer.innerHTML = navHtml;
        
    } catch (error) {
        console.error("error loading nav: " + error);
    }
    
}

window.addEventListener("DOMContentLoaded", loadNav);


async function getProducts(){
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        if(response.ok){
            const products = await response.json();
            console.log(products);
        }
        else{
            throw new Error(`Error ${response.status}, ${response.statusText}`)
        }
        
    } catch (error) {
        console.log(error);  
    }
}

getProducts();

navlinks.forEach((link) => {

    const linkPath = link.getAttribute("href");
    
    link.addEventListener("mouseenter", ()=>{
        gsap.to(link, {y: -300, scale: 1.5, duration: 0.2, color: secondaryColour, ease: "power1.inOut", fontWeight: "bold"})

    })

    link.addEventListener("mouseleave", ()=>{
        gsap.to(link, {y: 0, scale: 1, duration: 0.2, color: "", ease: "power2.inOut", fontWeight: ""})

    })

    if(linkPath === currentPath){
        link.classList.add("active");
    }
    else{
        link.classList.remove("active");
    }
})

ScrollTrigger.create({
    trigger: navContainer,
    start: "top top",
    endTrigger: "footer",
    pin: true,
})
