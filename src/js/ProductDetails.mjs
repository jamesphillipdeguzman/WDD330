import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    // Initialize the page and add event listeners
    init() {
        // Add listener to "Add to Cart" button
        document.getElementById("addToCart").addEventListener("click", this.addToCartHandler.bind(this));
    }

    // Add to cart button event handler
    async addToCartHandler() {
        // Find the product by Id
        const product = await this.dataSource.findProductById(this.productId);

        // console.log(product);

        // Add the product to the cart
        this.addProductToCart(product);
    }

    // Add product to the shopping cart
    addProductToCart(product) {


        // Check if there's an existing cart
        let cart = getLocalStorage("cart") || []; // Get existing cart or initialize as an empty array

        // Ensure cart is an array (if it's not, initialize it as an empty array) AI helped here
        if (!Array.isArray(cart)) {
            cart = [];
        }

        // If the cart is empty, push the product to the cart array and save it to local storage
        if (cart.length === 0) {
            cart.push(product);
            setLocalStorage("cart", cart);
        } else {
            // If the cart is NOT empty, keep pushing the product to the cart array and log it to the console
            cart.push(product);
            // console.log(cart);
        }

        // Update the contents of the cart in local storage
        setLocalStorage("cart", cart);
    }


}
// document.addEventListener("DOMContentLoaded", () => {
//     const productDetails = new ProductDetails();
//     productDetails.init();

// });