async function getProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    document.getElementById("product-details").textContent = "No product selected.";
    return;
  }

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product");

    const product = await response.json();
    displayProductDetails(product);
  } catch (error) {
    console.error(error);
    document.getElementById("product-details").textContent = "Error loading product.";
  }
}

function displayProductDetails(product) {
  const container = document.getElementById("product-details");
  container.classList.remove("loading");

  container.innerHTML = `
    <div class="product-detail">
      <div class="image-holder"><img src="${product.image}" alt="${product.title}" /></div>
      <div class="details">
        <div>
           <h1>${product.title}</h1>
           <p class="price">R ${product.price.toLocaleString("en-ZA", {minimumFractionDigits: 2})}</p>
        </div>
        <p class="description">${product.description}</p>

        <div>
           <button class="add-to-cart-btn">Add to Cart - ${product.price.toLocaleString("en-ZA", {minimumFractionDigits: 2})}<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>
           </button>
        </div>
        
      </div>
    </div>
  `;
}

getProductDetails();
