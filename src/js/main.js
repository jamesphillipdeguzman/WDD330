import tents from "../json/tents.json"
import ProductData from "./ProductData.mjs";
import { getParams } from "./utils.mjs";



async function showTemplate() {
  const cartTemplate = document.querySelector("#cart-template");
  const cartContainer = document.querySelector(".cart-container");
  const productData = new ProductData("tents");
  // Get the URL parameter and assign it to productId
  let productId = getParams("product");

  const product = await productData.findProductById(productId)
  console.log(product);

  if (product) {
    const clone = cartTemplate.content.cloneNode(true);

    const brandName = product.brandName;
    const productDesc = product.brandName;
    const productColor = product.colors;
    const productImage = product.image;


    clone.querySelector(".brand-name").textContent = brandName;
    clone.querySelector(".product-desc").textContent = productDesc;
    clone.querySelector(".product__color").textContent = productColor;
    clone.querySelector(".product-img").src = productImage;
    cartContainer.appendChild(clone);

  } else {

    console.log("Product not found!");
  }


  // clone.querySelector(".cart-title").textContent = `Sleep Outside | ${tents.Name}`;



}

document.addEventListener("DOMContentLoaded", showTemplate);




