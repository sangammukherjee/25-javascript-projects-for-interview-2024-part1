const productsContainer = document.querySelector(".products-container");
const loadMoreBtn = document.querySelector(".load-more-btn");

let currentStep = 0;

async function fetchListOfProducts(getCurrentStep) {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${
        getCurrentStep === 0 ? 0 : getCurrentStep * 10
      }`,
      {
        method: "GET",
      }
    );

    const result = await response.json();
    console.log(result);
    if (result && result.products) displayProducts(result.products);
  } catch (e) {
    console.log(e);
  }
}

function displayProducts(productList) {
  console.log(productList);

  productList.forEach((productItem) => {
    const productItemWrapper = document.createElement("div");
    const productTitle = document.createElement("p");
    const productThumbnail = document.createElement("img");
    const productDescription = document.createElement("p");
    const productPrice = document.createElement("p");

    productTitle.textContent = productItem.title;
    productDescription.textContent = productItem.description;
    productThumbnail.src = productItem.thumbnail;
    productPrice.textContent = productItem.price;

    productItemWrapper.classList.add("product-item-wrapper");
    productTitle.classList.add("product-title");
    productThumbnail.classList.add("product-img");
    productPrice.classList.add("product-price");
    productDescription.classList.add("product-desc");

    productItemWrapper.appendChild(productThumbnail);
    productItemWrapper.appendChild(productTitle);
    productItemWrapper.appendChild(productPrice);
    productItemWrapper.appendChild(productDescription);

    productsContainer.appendChild(productItemWrapper);
  });

  if (productsContainer.children.length === 100) {
    loadMoreBtn.setAttribute("disabled", "true");
  }

  console.log(productsContainer.children.length);
}

fetchListOfProducts(currentStep);

loadMoreBtn.addEventListener("click", () => {
  fetchListOfProducts((currentStep += 1));
});
