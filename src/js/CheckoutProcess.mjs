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
        const summaryEl = document.querySelector(
            this.outputSelector + "#cartTotal"
        );

        const itemNumEl = document.querySelector(
            this.outputSelector + "#num-items"
        );

        itemNumEl.textContent = this.list.length;

        // calculate the total of all items in the cart
        this.itemTotal = this.list.reduce((total, item) => {
            return total + item.price;
        }, 0);
        summaryEl.textContent = this.itemTotal;

    }

    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        // display the totals.
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
        ).toFixed(2);

        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const shipping = document.querySelector(
            this.outputSelector + "#shipping"
        );
        const tax = document.querySelector(
            this.outputSelector + "#tax"
        );
        const orderTotal = document.querySelector(
            this.outputSelector + "#orderTotal"
        );

        shipping.textContent = "$" + this.shipping;
        tax.textContent = "$" + this.tax;
        orderTotal.textContent = "$" + this.orderTotal;
    }

    async checkout() {
        const formEl = document.forms["checkout-form"];

        const json = formDataToJSON(formEl);
        // add totals and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);

        try {
            const res = await services.checkout(json);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
}

