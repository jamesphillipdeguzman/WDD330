import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

document.addEventListener("DOMContentLoaded", () => {

  // Run the renderListWithTemplate function to load ALL the products from tents.json (e.g. all six of them)
  function renderListWithTemplate() {
    const dataSource = new ProductData("tents");
    const element = document.querySelector(".product-list");
    const listing = new ProductList("Tents", dataSource, element);
    // console.log(listing);

    // initialize the header and footer
    const urlName = window.location.pathname;
    if (urlName.includes("cart/index.html")) {
      // Do not reload all the products if the user is on the cart page
      loadHeaderFooter();

    } else {
      // initialize the product list and load the header and footer
      listing.init();
      loadHeaderFooter();
    }



  }

  renderListWithTemplate();

});
