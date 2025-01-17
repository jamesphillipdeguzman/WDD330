import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs"; // Corrected the import to match the class name

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
