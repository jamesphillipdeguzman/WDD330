function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Bad Response");
    }
}

export default class ProductDetails {
    constructor(product) {
        this.product = product;
        this.path = `../product_pages/${this.product}.html`;
    }
    getData() {
        return fetch(this.path)
            .then(convertToJson)
            .then((data) => data);
    }
    async findProductById(id) {
        const products = await this.getData();
        return products.find((item) => item.Id === id);
    }
}
