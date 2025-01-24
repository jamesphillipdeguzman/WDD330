import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

// Retrieve product ID from the URL
const productId = getParam("product");

// Initialize ProductDetails
const dataSource = new ProductData();
const productDetails = new ProductDetails(productId, dataSource);

// Initialize and populate the product details page
productDetails.init();
