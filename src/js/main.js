import { loadHeaderFooter } from "./utils.mjs";


document.addEventListener("DOMContentLoaded", () => {

  // initialize the header and footer
  const urlName = window.location.pathname;
  if (urlName.includes("cart/index.html") || urlName.includes("cart/")) {
    // Do not reload all the products if the user is on the cart page
    loadHeaderFooter();
  } else {
    // initialize the product list and load the header and footer
    listing.init();
    loadHeaderFooter();
  }

});
