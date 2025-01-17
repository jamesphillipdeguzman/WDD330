function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    const products = await this.getData();
    const product = products.find((item) => item.Id === id);

    // Help with AI
    // Check if product exists, then return the product and its brand
    if (product) {
      return {
        product: product,
        brandId: product.Id ? product.Brand.Id : "Unknown Id",
        brand: product.Brand,
        brandName: product.Brand.Name,
        colors: product.Colors[0].ColorName,
        image: product.Image,


      };
    } else {
      return null;  // Return null if product not found
    }
  }
}
