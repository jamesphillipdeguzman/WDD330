// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
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
        debugger;
        // this.list = JSON.parse(localStorage.getItem(this.key));
        this.list = this.packageItems(JSON.parse(localStorage.getItem(this.key)));
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        debugger;
        const summaryEl = document.querySelector(
            // the space betweenn the this.outputSelector and the element Id is necessary for this to work!
            this.outputSelector + " #cartTotal"
        );

        const itemNumEl = document.querySelector(
            this.outputSelector + " #num-items"
        );

        if (summaryEl && itemNumEl) {
            itemNumEl.innerText = this.list.length;

            // calculate the total of all items in the cart
            this.itemTotal = this.list.reduce((total, item) => {
                return total + item.price;
            }, 0);
            summaryEl.innerText = "$" + this.itemTotal.toFixed(2);

        }

    }

    calculateOrdertotal() {
        debugger;
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
        debugger;
        // once the totals are all calculated display them in the order summary page
        const shipping = document.querySelector(
            this.outputSelector + " #shipping"
        );
        const tax = document.querySelector(
            this.outputSelector + " #tax"
        );
        const orderTotal = document.querySelector(
            this.outputSelector + " #orderTotal"
        );

        if (shipping && tax && orderTotal) {
            shipping.innerText = "$" + this.shipping;
            tax.innerText = "$" + this.tax;
            orderTotal.innerText = "$" + this.orderTotal;
        }

    }

    // takes a form element and returns an object where the key is the "name" of the form input.
    formDataToJSON(formEl) {
        debugger;

        const convertedJSON = {};

        const formData = new FormData(formEl);
        // Print the entries to console
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ": " + pair[1]);
        // }

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });

        return convertedJSON;
    }

    packageItems(items) {
        debugger;

        if (!items || items.length === 0) {
            console.log("No items to process!");
            return [];  // Return an empty array if no items are passed
        }

        // Convert the list of products from localStorage to the simpler form required for the checkout process.
        return items.map(item => ({
            id: item.Id,
            name: item.NameWithoutBrand,
            price: item.FinalPrice,
            quantity: item.quantity,
            image: item.Images
        }));

    }


    async checkout() {
        debugger;
        const formEl = document.forms["checkout-form"];

        const json = this.formDataToJSON(formEl);
        // add totals and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = this.list;
        console.log(json);

        try {
            const res = await services.checkout(json);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }



}

