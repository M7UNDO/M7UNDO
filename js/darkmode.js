gsap.registerPlugin(DrawSVGPlugin);

let darkmode = localStorage.getItem("darkmode");
const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active"? enableDarkmode() : disableDarkmode();
});

function enableDarkmode(){
    
    document.body.classList.add("darktheme");
    localStorage.setItem("darkmode", "active");
    gsap.to(themeBtn, { rotate: 45, duration: 0.5, ease: "power2.out" });
}

function disableDarkmode(){
    document.body.classList.remove("darktheme");
    localStorage.setItem("darkmode", null);
    gsap.to(themeBtn, { rotate: 0, duration: 0.5, ease: "power2.out" });

}

if(darkmode === "active"){
    enableDarkmode();
}



const themeIconPaths = document.querySelectorAll(".theme-btn svg path");


gsap.set(themeIconPaths, { drawSVG: "100%" });


themeBtn.addEventListener("mouseenter", () => {
    gsap.to(themeIconPaths, {
        drawSVG: "0%",
        duration: 0.6,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1
    });
    gsap.to(themeBtn, { scale: 1.1, duration: 0.2, ease: "power1.out" });
});

themeBtn.addEventListener("mouseleave", () => {
    gsap.to(themeBtn, { scale: 1, duration: 0.2, ease: "power1.in" });
});