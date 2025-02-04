// ProductList.mjs - Filters products by unique brand name.
// - Creates the ProductCardTemplate for individual product display.
// - Defines the ProductList class, which takes in the category, dataSource, and listElement.
// - Includes the init function to render the product list.


import { renderListWithTemplate, loadCarouselSlider } from "./utils.mjs";

//Filter unique product names
function filteredProducts(products) {
    const uniqueProducts = products.filter((item, index, self) =>
        self.findIndex(product => product.Brand.Name === item.Brand.Name) === index);

    // console.log(uniqueProducts);
    return uniqueProducts;
}

function productCardTemplate(product) {
    // Fixed the href to avoid relative path issues; used '/' for absolute path    
    return `<li class="product-card">
      <a href="/product-pages/index.html?product=${product.Id}"> 
        <img 
            class="slide"
            src="${product.Images.PrimaryLarge}" 
            alt="Image of ${product.Name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>`;
}

export default class ProductList {
    // Make the ProductListing class as flexible and reusable by passing in category, dataSource, and listElement.
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    // Use init function to initialize and grab the dataSource using the getData function from ProductData class.
    async init() {
        debugger;
        const productList = await this.dataSource.getData(this.category);



        // List only those products with valid images
        const filteredList = filteredProducts(productList);
        // Render list of products here...
        this.renderList(filteredList);
        // this.renderList(productList);
        // Product carousel starts here...
        loadCarouselSlider(filteredList);

        // Set the title of the page to the category
        if (document.title === null || document.title === "" || document.title === "Sleep Outside | Home") {
            return
        }
        document.title = this.category.charAt(0).toUpperCase() + this.category.slice(1);
    }

    renderList(productList) {
        // console.log(productList);
        renderListWithTemplate(productCardTemplate, this.listElement, productList);

    }

}