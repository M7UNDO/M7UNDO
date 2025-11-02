window.addEventListener("DOMContentLoaded", () => {
  gsap.utils.toArray(".fade-in").forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  const hero = document.querySelector(".about-hero .container");
  if (hero) {
    gsap.from(hero.children, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      delay: 0.2,
    });
  }

  gsap.utils.toArray("section img").forEach((img) => {
    gsap.from(img, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: img,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  });

  gsap.utils.toArray(".product-gallery img, .team-gallery img").forEach((img) => {
    gsap.from(img, {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: img,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  const cta = document.querySelector("#cta .container");
  if (cta) {
    gsap.from(cta, {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: cta,
        start: "top 90%",
      },
    });
  }

  const productGallery = document.querySelector(".product-gallery");

  async function loadFeaturedProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products?limit=3"); // Fetch 3 products
      if (!response.ok) throw new Error("Failed to fetch products");
      const products = await response.json();

      productGallery.innerHTML = products
        .map(
          (product) => `
          <img src="${product.image}" alt="${product.title}" loading="lazy" />
        `
        )
        .join("");

      // Animate the newly added product images
      gsap.utils.toArray(".product-gallery img").forEach((img) => {
        gsap.from(img, {
          scale: 0.9,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    } catch (error) {
      console.error(error);

      productGallery.innerHTML = `
        <img src="images/tech-gadgets.jpg" alt="Tech gadgets" loading="lazy" />
        <img src="images/fashion-items.jpg" alt="Fashion items" loading="lazy" />
        <img src="images/home-decor.jpg" alt="Home decor" loading="lazy" />
      `;
    }
  }

  loadFeaturedProducts();
});
