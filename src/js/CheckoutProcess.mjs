import { getLocalStorage } from './utils.js';

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        // Count the number of items.
        const cart = getLocalStorage(this.key);
        if (!cart && Array.isArray(cart)) {
            return 0;

        }

        const numItems = cart.length

        // calculate and display the total amount of the items in the cart
        const total = cart.reduce((acc, item) => acc + item.price, 0);
        this.itemTotal = total;

        return `${total} (${numItems})`; // Return the total and number of items


    }

    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total

        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page

    }
}