const baseURL = import.meta.env.VITE_SERVER_URL
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
  async getData(category) {
    return fetch(baseURL + `products/search/${category}`)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    const products = await this.getData();
    const product = products.find((item) => item.Id === id);

    // Help with AI
    // Check if product exists, then return the product and its details
    if (product) {
      return {
        product: product,
        brandId: product.Id ? product.Brand.Id : "Unknown Id",
        brand: product.Brand.Name,
        brandFullName: product.Name,
        productDesc: product.Brand.Desc,
        colors: product.Colors[0].ColorName,
        image: product.Image,
        price: product.ListPrice,
        description: product.DescriptionHtmlSimple,
        dataId: product.Id,


      };
    } else {
      return null;  // Return null if product not found
    }
  }
}