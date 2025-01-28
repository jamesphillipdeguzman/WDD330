import { getLocalStorage } from "./utils.mjs";


function cardItemTemplate(item) {

    const newItem = `<li class="cart-card divider">
            <a href="#" class="cart-card__image">
              <img
                src="${item.Image}"
                alt="${item.Name}"
              />
            </a>
            <a href="#">
              <h2 class="card__name">${item.Name}</h2>
            </a>
            <p class="cart-card__color">${item.Colors[0].ColorName}</p>
            <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
            <p class="cart-card__price">$${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</p>
          </li>`
    return newItem;
}


export default class ShoppingCart {

    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }
    renderCartContents() {
        const cartItems = getLocalStorage(this.key);
        const productListEl = document.querySelector(this.parentSelector);
        // Clear the existing cart items
        productListEl.innerHTML = "";
        // Generate HTML for each cart item, passing the index to cartItemTemplate
        const htmlItems = cartItems.map((item) =>
            cardItemTemplate(item),
        );
        productListEl.innerHTML = htmlItems.join("");
    }

}