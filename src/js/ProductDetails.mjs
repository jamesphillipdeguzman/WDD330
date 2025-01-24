import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    // Initialize the page and add event listeners
    async init() {
        try {
            // Fetch product details using the product ID
            const product = await this.dataSource.findProductById(this.productId);

            // Save the product data for future use
            this.product = product;

            // Populate the product details on the page
            this.renderProductDetails(product);

            // Add listener to the "Add to Cart" button
            document.getElementById("addToCart").addEventListener("click", this.addToCartHandler.bind(this));
        } catch (error) {
            console.error("Error initializing product details:", error);
        }
    }

    // Render product details on the page
    renderProductDetails(product) {
        // Populate product details dynamically
        document.querySelector(".brand-name").textContent = product.Brand?.Name || "Brand Name Not Available";
        document.querySelector(".brand-fullname").textContent = product.Name || "Product Name Not Available";
        document.querySelector(".product-img").src = product.Images?.PrimaryLarge || "placeholder.jpg"; // Fallback image if unavailable
        document.querySelector(".product-img").alt = product.Name || "Product Image";
        document.querySelector(".product-card__price").textContent = `$${product.FinalPrice || "0.00"}`;
        document.querySelector(".product__description").textContent = product.Description || "No description available.";
    }

    // Add to cart button event handler
    async addToCartHandler() {
        try {
            // Add the product to the cart
            this.addProductToCart(this.product);

            // Provide feedback to the user (optional)
            alert("Product added to cart!");
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    }

    // Add product to the shopping cart
    addProductToCart(product) {
        let cart = getLocalStorage("cart") || [];
      
        // Add FinalPrice and ensure it's valid
        const cartItem = {
          ...product,
          ListPrice: product.FinalPrice || 0, // Default to 0 if missing
          cartItemId: Date.now().toString(),  // Assign a unique ID
        };
      
        cart.push(cartItem);
        setLocalStorage("cart", cart);
      }
      
      
}
