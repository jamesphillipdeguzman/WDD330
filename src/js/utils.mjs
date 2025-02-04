// utils.mjs - Contains utility functions used by other modules.

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}


export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {

  const htmlStrings = list.map(templateFn);

  if (!parentElement) {
    // console.error("Parent element not found");
    return
  }

  // Clear out contents of html if clear is true.
  if (clear) {
    parentElement.innerHTML = "";
  } else {
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
  }
}

async function loadTemplate(path) {

  const res = await fetch(path)
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {

  const headerPath = "/partials/header.html";
  const footerPath = "/partials/footer.html";

  const headerTemplate = await loadTemplate(headerPath);
  const headerEl = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate(footerPath);
  const footerEl = document.querySelector("#main-footer");

  // let clear = false;


  renderWithTemplate(headerTemplate, headerEl);
  renderWithTemplate(footerTemplate, footerEl);
}

export function renderWithTemplate(template, parentElement, clear, data, callback) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML("afterbegin", template);
  // applyCartStyles();
  // if there is a callback, call it with the data
  if (callback) {
    callback(data)
  }
}

//  Helper function to fix styling for backpack icon

// export function applyCartStyles() {
//   const cart = document.querySelector('.cart');
//   if (cart) {
//     cart.style.position = 'absolute';
//     cart.style.top = '20px'; // Distance from top
//     cart.style.right = '20px'; // Distance from right
//     cart.style.zIndex = '1000'; // Ensure it's above other content
//   }
// }
export function showCartTotal() {

  const cart = getLocalStorage("cart");

  if (!cart) {
    return "$0.00"; // Return $0.00 if cart is empty

  }
  // Calculate total by multiplying price by quantity for each item
  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = item.FinalPrice * item.quantity;
    return total + itemPrice;
  }, 0);

  return `$${totalPrice.toFixed(2)}`;

}

export function alertMessage(message, scroll = true) {
  debugger;
  // create element to hold our alert
  const alert = document.createElement("div");
  // add a class to style the alert
  alert.classList.add("alert");
  // set the contents. You should have a message and an X or something the user can click on to remove
  alert.innerHTML = `
    <span class="alert-message">${message}</span>
    <span class="alert-close" style="cursor: pointer;">&times;</span>
  `;

  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener("click", function (e) {
    if (e.target.classList.contains("alert-close")) { // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
      main.removeChild(this);
    }
  })
  // add the alert to the top of main
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll)
    window.scrollTo(0, 0);
}

export function getFormValidationErrors(form) {
  const invalidFields = [];
  for (let element of form.elements) {
    if (!element.validity.valid) {
      invalidFields.push(element.name || element.id || "Unnamed field");
    }
  }
  return `Invalid fields: ${invalidFields.join(", ")}`;
}

export function loadCarouselSlider(data) {

  debugger;
  console.log(data);
  const slides = document.querySelectorAll(".product-card");
  let slideIndex = 0;
  let intervalId = null;

  function initializeSlider() {
    // debugger;
    slides[slideIndex].classList.add("displaySlide");
    intervalId = setInterval(nextSlide, 5000);
  }

  function showSlide(index) {
    // debugger;

    console.log("slideIndex: ", index);
    console.log("slidesLength: ", slides.length);

    if (index >= slides.length) {
      // Loop back to the first slide
      slideIndex = 0;

    } else if (index < 0) {
      // Go to the last slide
      slideIndex = slides.length - 1;
    } else {
      slideIndex = index; // Valid index within bounds
    }

    // First, hide the slides
    slides.forEach(slide => {
      slide.classList.remove("displaySlide");
    });
    // Add the displaySlide class to the active slide
    slides[slideIndex].classList.add("displaySlide");


  }
  console.log("Slides", slides);


  // Function to go to the previous slide
  function prevSlide() {

    // Move to the previous slide
    slideIndex--;
    showSlide(slideIndex);
  }

  // Function to go to the next slide
  function nextSlide() {

    // Move to the next slide
    slideIndex++;
    showSlide(slideIndex);

  }

  const prevBtn = document.querySelector("#prev");
  const nextBtn = document.querySelector("#next");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      // Show previous slide, when clicked
      prevSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      // Show next slide, when clicked
      nextSlide();

    });
  }

  initializeSlider();
}