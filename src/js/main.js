import ProductData from "./ProductData.mjs";
// import { getParams, renderListWithTemplate } from "./utils.mjs";
import ProductListing from "./ProductListing.mjs";
// import { list } from "postcss";

document.addEventListener("DOMContentLoaded", () => {
  // Run the renderListWithTemplate function to load ALL the products from tents.json (e.g. all six of them)
  function renderListWithTemplate() {
    const dataSource = new ProductData("tents");
    const element = document.querySelector(".product-list");
    const listing = new ProductListing("Tents", dataSource, element);
    // console.log(listing);
    listing.init();
  }

  renderListWithTemplate();
});
