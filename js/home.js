document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("activeUser"));
  const showGreeting = localStorage.getItem("showGreeting"); 

  if (user && showGreeting) {
    const userGreeting = document.getElementById("user-greeting");
    if (userGreeting) {
      userGreeting.style.display = "block"; 
      userGreeting.textContent = `Hi, ${user.firstname}!`;

      const tl = gsap.timeline({ 
        onComplete: () => {
          userGreeting.style.display = "none"; // disable after anim
        }});
      

      tl.from(userGreeting, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
      })
      .to(userGreeting, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.in",
      }, "2");


      localStorage.removeItem("showGreeting");
    }
  }
});
