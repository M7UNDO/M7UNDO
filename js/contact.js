
(function () {
  emailjs.init({
    publicKey: "v4iQ1JjKe9R4nhE3L", 
  });
})();

const form = document.getElementById("contact-form");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");


function showPopup(message, success = true) {
  popupMessage.textContent = message;
  popupMessage.style.color = success ? "#0f5132" : "#842029";
  popup.style.background = success
    ? "rgba(209, 231, 221, 0.95)"
    : "rgba(248, 215, 218, 0.95)";

  gsap.fromTo(
    popup,
    { opacity: 0, y: 50, display: "none" },
    { opacity: 1, y: 0, display: "flex", duration: 0.6, ease: "power2.out" }
  );

  setTimeout(() => {
    gsap.to(popup, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: "power1.in",
      onComplete: () => (popup.style.display = "none"),
    });
  }, 3000);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  
  emailjs
    .sendForm("service_d0xb3q5","template_65uftbi", this)
    .then(() => {
      gsap.to(form, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        onComplete: () => {
          form.reset();
          gsap.to(form, { opacity: 1, y: 0, delay: 0.6 });
        },
      });

      showPopup("Message sent! I'll get back to you soon.");
    })
    .catch((error) => {
      console.error("Email send error:", error);
      showPopup("Something went wrong. Please try again later.", false);
    });
});
