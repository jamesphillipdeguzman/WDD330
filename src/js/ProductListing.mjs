
import ProductData from "./ProductData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

// Filter unique product names
function filteredProducts(product) {
    const uniqueProducts = product.filter((item, index, self) => {
        return self.findIndex(product => product.Brand.Name === item.Brand.Name) === index
    });

    console.log(uniqueProducts);
    return uniqueProducts;
}

function productCardTemplate(product) {

    return `<li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>`
}

export default class ProductListing {
    // Make the ProductListing class as flexible and reusable by passing in category, dataSource, and listElement.
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    // Use init function to initialize and grab the dataSource using the getData function from ProductData class.
    async init() {
        const productList = await this.dataSource.getData()

        // List only those products with valid images
        const filteredList = filteredProducts(productList);
        // Render list of products here...
        this.renderList(filteredList);
    }

    renderList(productList) {
        console.log(productList);
        renderListWithTemplate(productCardTemplate, this.listElement, productList);

    }

}