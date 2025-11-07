gsap.registerPlugin(DrawSVGPlugin);

let darkmode = localStorage.getItem("darkmode");

if (darkmode === "active") {
  document.body.classList.add("darktheme");
}


const observer = new MutationObserver(() => {
  const themeBtn = document.querySelector(".theme-btn");
  if (themeBtn) {
    observer.disconnect(); 
    setupThemeButton(themeBtn);
  }
});

observer.observe(document.body, { childList: true, subtree: true });

function setupThemeButton(themeBtn) {
  const themeIconPaths = themeBtn.querySelectorAll("svg path");
  gsap.set(themeIconPaths, { drawSVG: "100%" });


  if (darkmode === "active") {
    gsap.set(themeBtn, { rotate: 45 });
  }

  themeBtn.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? enableDarkmode(themeBtn) : disableDarkmode(themeBtn);
  });


  themeBtn.addEventListener("mouseenter", () => {
    gsap.to(themeIconPaths, {
      drawSVG: "0%",
      duration: 0.6,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1,
    });
    gsap.to(themeBtn, {opacity: 1, scale: 1.1, duration: 0.2, ease: "power1.out" });
  });

  themeBtn.addEventListener("mouseleave", () => {
    gsap.to(themeBtn, {opacity: 0.8, scale: 1, duration: 0.2, ease: "power1.in" });
  });
}

function enableDarkmode(themeBtn) {
  document.body.classList.add("darktheme");
  localStorage.setItem("darkmode", "active");
  gsap.to(themeBtn, { rotate: 45, duration: 0.5, ease: "power2.out" });
}

function disableDarkmode(themeBtn) {
  document.body.classList.remove("darktheme");
  localStorage.setItem("darkmode", null);
  gsap.to(themeBtn, { rotate: 0, duration: 0.5, ease: "power2.out" });
}
