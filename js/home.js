document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("activeUser"));
  const showGreeting = localStorage.getItem("showGreeting");
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".dot");
  let current = 0;

  if (user && showGreeting) {
    const userGreeting = document.getElementById("user-greeting");
    if (userGreeting) {
      userGreeting.style.display = "block";
      userGreeting.textContent = `Hi, ${user.firstname}!`;

      const tl = gsap.timeline({
        onComplete: () => {
          userGreeting.style.display = "none"; // disable after anim
        },
      });

      tl.from(userGreeting, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
      }).to(
        userGreeting,
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.in",
        },
        "2"
      );

      localStorage.removeItem("showGreeting");
    }
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
    });

    const activeSlide = slides[index];
    const content = activeSlide.querySelector(".hero-content");

    gsap.fromTo(content, {autoAlpha: 0, y: 50}, {duration: 1.2, autoAlpha: 1, y: 0, ease: "power3.out"});
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      current = i;
      showSlide(current);
    });
  });

  // Auto-slide every 6 seconds
  setInterval(nextSlide, 6000);

  // Initial animation
  showSlide(current);
});
