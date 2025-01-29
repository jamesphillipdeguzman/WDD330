import { setLocalStorage, getLocalStorage } from "./utils.mjs";

// ProductDetails - Creates the product details template.
// - Also defines the ProductDetails class, which takes a productId and a dataSource.
// - Primarily responsible for initializing the page and managing the cart (storing/retrieving) in local storage.


function productDetailsTemplate(product) {
    debugger;
    // Check for brand existence and provide fallback
    const brandName = product.Brand && product.Brand.Name ? product.Brand.Name : "Unknown Brand";
    return `<section class="product-detail">
        <h3>${brandName}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img 
            class="divider" 
            src="${product.Images.PrimaryLarge}" 
            alt="${product.NameWithoutBrand}" 
        />
        <p class="product-card__price">$${product.FinalPrice}</p>    
        <p class="product__color">${product.Colors[0].ColorName}</p>  
        <p class="product__description">${product.DescriptionHtmlSimple}</p>    
        
    </section>`;
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    // Initialize the page and add event listeners
    async init() {

        try {
            // Find the product by Id
            this.product = await this.dataSource.findProductById(this.productId);

            console.log(this.product); // Fixed the reference to this.product

            // Render the product details
            this.renderProductDetails("main");

            // Add listener to "Add to Cart" button
            document
                .getElementById("addToCart")
                .addEventListener("click", this.addToCart.bind(this));

        } catch (error) {
            console.error("Error loading product details", error);
        }
    }

    // Add to cart button event handler
    addToCart() {
        let cart = getLocalStorage("cart") || [];

        if (!Array.isArray(cart)) {
            cart = [];
        }

        cart.push(this.product);
        setLocalStorage("cart", cart);
    }

    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.insertAdjacentHTML(
                "afterBegin",
                productDetailsTemplate(this.product)
            );
        } else {
            console.error("Parent element not found");
        }
    }
}
