gsap.registerPlugin(ScrollTrigger);
const navlinks = document.querySelectorAll(".navlinks a");
const navContainer = document.querySelector(".nav-container");

navlinks.forEach((link) => {
    
    link.addEventListener("mouseenter", ()=>{
        gsap.to(link, {y: -300, scale: 1.5, duration: 0.2, color: "red", ease: "power1.in", fontWeight: "bold"})

    })

    link.addEventListener("mouseleave", ()=>{
        gsap.to(link, {y: 0, scale: 1, duration: 0.2, color: "", fontWeight: ""})

    })
})

ScrollTrigger.create({
    trigger: navContainer,
    start: "top top",
    endTrigger: "footer",
    pin: true,
})
