import { loadHeaderFooter, showCartTotal, getLocalStorage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
debugger;
const subTotal = document.querySelector("#subtotal");
const itemSummary = document.querySelector("#item-summary");
subTotal.textContent = showCartTotal();

const cart = getLocalStorage("cart");
const checkoutItemSummary = new CheckoutProcess(cart, itemSummary);
checkoutItemSummary.init();
console.log(checkoutItemSummary);
