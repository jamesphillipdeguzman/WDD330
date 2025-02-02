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
        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
        
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
                .addEventListener("click", this.checkDuplicates.bind(this));

        } catch (error) {
            console.error("Error loading product details", error);
        }
    }

    // Check for duplicate items in the cart
    async checkDuplicates() {

        debugger;
        const cart = getLocalStorage("cart") || [];
        if (cart.length > 0) {
            const cartItem = cart.find((item) => item.Id === this.productId);
            if (cartItem) {
                this.showPopupMessage("Item already in cart");
                // increase quantity of the item in the cart
                cartItem.quantity += 1;
                // Update the cart in local storage 
                setLocalStorage("cart", cart);
                // Update the quantity input field
                document.querySelector("#quantity").value = cartItem.quantity;

            } else {
                // filter out the item from the cart with same id   
                const filteredCart = cart.filter((item) => item.Id !== this.productId);
                // Save the updated cart back to local storage
                setLocalStorage("cart", filteredCart);

                // Add the product to the cart
                this.addToCart();
            }
        } else {
            // if cart is empty, add the product to the cart
            this.addToCart();
        }
    }

    // Add to cart button event handler
    async addToCart() {


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
