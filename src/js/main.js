import ProductData from "./ProductData.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import ProductList from "./ProductList.mjs";
// import { list } from "postcss";

document.addEventListener("DOMContentLoaded", () => {
  // Run the renderListWithTemplate function to load ALL the products from tents.json (e.g. all six of them)
  function renderListWithTemplate() {
    const dataSource = new ProductData("tents");
    const element = document.querySelector(".product-list");
    const listing = new ProductList("Tents", dataSource, element);
    // console.log(listing);
    listing.init();
  }

  loadHeaderFooter();
  renderListWithTemplate();

});
