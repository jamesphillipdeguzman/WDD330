// product-listing.js - Responsible for rendering the product list with templates for all categories
// (e.g., tents, backpacks, sleeping bags, and hammocks).

import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  const category = getParams("category");
  const dataSource = new ProductData(category); // ensure category is passed here...
  const element = document.querySelector(".product-list");
  const listing = new ProductList(category, dataSource, element);
  // console.log(listing);
  listing.init();
  // Load the category title
  const categoryTitle = document.querySelector(".title");
  if (categoryTitle) {
    categoryTitle.textContent =
      categoryTitle.textContent +
      " - " +
      category.charAt(0).toUpperCase() +
      category.slice(1);
  } else {
    return;
  }
});
