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
        
        // Get the quantity from the input
        const quantity = parseInt(document.getElementById("quantity").value) || 1;
        
        // Add the product to the cart with quantity
        this.addProductToCart(product, quantity);
    }

    // Add product to the shopping cart
    addProductToCart(product, quantity) {
        // Check if there's an existing cart
        let cart = getLocalStorage("cart") || [];

        // Ensure cart is an array
        if (!Array.isArray(cart)) {
            cart = [];
        }

        // Add quantity to the product object
        const productWithQuantity = {
            ...product,
            quantity: quantity
        };

        cart.push(productWithQuantity);
        setLocalStorage("cart", cart);
        
        this.showPopupMessage(`${quantity} item(s) added to cart`);
    }

    // Add showPopupMessage as a class method
    showPopupMessage(message) {
        const popup = document.createElement('div');
        popup.className = 'popup-message';
        popup.textContent = message;
        
        document.body.appendChild(popup);
        
        setTimeout(() => {
            popup.remove();
        }, 2000);
    }
}
