import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs"; // Corrected the import to match the class name
document.addEventListener("DOMContentLoaded", () => {
  function renderProductDetails() {
    // Get the URL parameter and assign it to productId
    const productId = getParams("product");

    // Get the product category and assign it to dataSource
    const dataSource = new ProductData("tents");

    // Create a product instance with the productId and dataSource, then initialize it
    const product = new ProductDetails(productId, dataSource);
    product.init();
  }

  renderProductDetails();

  // AI helped with this stripHtmlTags
  function stripHtmlTags(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || doc.body.innerText;
  }

  // Run the showTemplate function to show the individual product details when clicked by the user...

  async function showTemplate() {
    const cartTemplate = document.querySelector("#cart-template");
    const cartContainer = document.querySelector(".cart-container");
    const productData = new ProductData("tents");
    // Get the URL parameter and assign it to productId
    let productId = getParams("product");

    const product = await productData.findProductById(productId);
    // console.log(product);

    if (product) {
      const clone = cartTemplate.content.cloneNode(true);

      // const dataId = product.dataId;
      const brandName = product.brand;
      const brandFullName = product.brandFullName;
      const productColor = product.colors;
      const productImage = product.image;
      const price = product.price;

      // Get the plain text content from 'descriptionHtmlSimple'
      const descriptionSimple = stripHtmlTags(product.description);

      clone.querySelector(".brand-name").textContent = brandName;
      clone.querySelector(".brand-fullname").textContent = brandFullName;
      clone.querySelector(".product__color").textContent = productColor;
      clone.querySelector(".product-img").src = productImage;
      clone.querySelector(".product-card__price").innerHTML = "$" + price;
      clone.querySelector(".product__description").innerText = descriptionSimple;

      // const addToCartBtn = clone.querySelector("#addToCart");
      const addToCartBtn = document.querySelector("#addToCart");
      addToCartBtn.setAttribute("data-id", productId);
      cartContainer.appendChild(clone);
    } else {
      // console.log("Product not found!");
    }

  }

  showTemplate();
});
