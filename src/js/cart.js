import { getLocalStorage } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// Use the correct key "cart"
const cart = new ShoppingCart("cart", ".product-list");
cart.renderCartContents();
