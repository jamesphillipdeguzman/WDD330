
// ExternalServices.mjs (previously ProductData.mjs) - Class template for handling product data.
// - Responsible for finding a product by its Id.
// - Vite uses the VITE_SERVER_URL environment variable to inject the actual server URL
// into the code, as declared in Netlify.

const baseURL = import.meta.env.VITE_SERVER_URL;
// const baseURL = "/json/";

//const baseURL = "https://wdd330-backend.onrender.com/";
// const baseURL = "http://wdd330-backend.onrender.com/checkout";


// function convertToJson(res) {
//   if (res.ok) {
//     return res.json();
//   } else {
//     throw new Error("Bad Response");
//   }
// }

// export default class ExternalServices {

//   constructor(category) {
//     //this.category = category; // comment out this line
//     //this.path = `${baseURL}${this.category}.json`; // comment out this line


//   }
//   async getData(category) {
//     const response = await fetch(`${baseURL}products/search/${category}`);
//     // const response = await fetch(this.path);
//     const data = await convertToJson(response);
//     return data.Result;
//   }

//   async findProductById(id) {

//     const response = await fetch(`${baseURL}product/${id}`);
//     const data = await convertToJson(response);
//     console.log(data.Result);
//     return data.Result;
//     // const products = await this.getData();
//     // const product = products.find((item) => item.Id === id);

//     // // Help with AI
//     // // Check if product exists, then return the product and its details
//     // if (product) {
//     //   return {
//     //     product: product,
//     //     brandId: product.Id ? product.Brand.Id : "Unknown Id",
//     //     brand: product.Brand.Name,
//     //     brandFullName: product.Name,
//     //     productDesc: product.Brand.Desc,
//     //     colors: product.Colors[0].ColorName,
//     //     image: product.Image,
//     //     price: product.ListPrice,
//     //     description: product.DescriptionHtmlSimple,
//     //     dataId: product.Id,


//     //   };
//     // } else {
//     //   return null;  // Return null if product not found
//     // }
//   }
// }

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }

}

export default class ExternalServices {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}