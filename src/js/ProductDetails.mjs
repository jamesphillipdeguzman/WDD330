import { setLocalStorage, getLocalStorage } from "./utils.mjs";

// ProductDetails - Creates the product details template.

function productDetailsTemplate(product) {
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

        <!-- Comments Section -->
        <div class="comments-section">
            <h3>Customer Reviews</h3>
            <ul id="comments-list"></ul>
            <textarea id="comment-input" placeholder="Write a comment..." rows="3"></textarea>
            <button id="submit-comment">Submit Comment</button>
        </div>
    </section>`;
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        try {
            // Find the product by Id
            this.product = await this.dataSource.findProductById(this.productId);
            console.log(this.product);

            // Render product details
            this.renderProductDetails("main");

            // Load and display comments
            this.loadComments();

            // Add listener to "Add to Cart" button
            document
                .getElementById("addToCart")
                .addEventListener("click", this.checkDuplicates.bind(this));

            // Add listener to "Submit Comment" button
            document
                .getElementById("submit-comment")
                .addEventListener("click", this.addComment.bind(this));

        } catch (error) {
            console.error("Error loading product details", error);
        }
    }

    // Load comments from local storage
    loadComments() {
        const comments = getLocalStorage(`comments-${this.productId}`) || [];
        const commentsList = document.getElementById("comments-list");

        commentsList.innerHTML = comments.map(comment => `<li>${comment}</li>`).join("");
    }

    // Add a new comment
    addComment() {
        const commentInput = document.getElementById("comment-input");
        const commentText = commentInput.value.trim();

        if (commentText === "") return;

        let comments = getLocalStorage(`comments-${this.productId}`) || [];
        comments.push(commentText);
        setLocalStorage(`comments-${this.productId}`, comments);

        // Reload comments list
        this.loadComments();

        // Clear input field
        commentInput.value = "";
    }

    checkDuplicates() {
        const cart = getLocalStorage("cart") || [];
        if (cart.length > 0) {
            const cartItem = cart.find((item) => item.Id === this.productId);
            if (cartItem) {
                this.showPopupMessage("Item already in cart");
                cartItem.quantity += 1;
                setLocalStorage("cart", cart);
                document.querySelector("#quantity").value = cartItem.quantity;
            } else {
                const filteredCart = cart.filter((item) => item.Id !== this.productId);
                setLocalStorage("cart", filteredCart);
                this.addToCart();
            }
        } else {
            this.addToCart();
        }
    }

    async addToCart() {
        const product = await this.dataSource.findProductById(this.productId);
        const quantity = parseInt(document.getElementById("quantity").value) || 1;
        this.addProductToCart(product, quantity);
    }

    addProductToCart(product, quantity) {
        let cart = getLocalStorage("cart") || [];
        if (!Array.isArray(cart)) {
            cart = [];
        }

        const productWithQuantity = {
            ...product,
            quantity: quantity
        };

        cart.push(productWithQuantity);
        setLocalStorage("cart", cart);

        this.showPopupMessage(`${quantity} item(s) added to cart`);
    }

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
