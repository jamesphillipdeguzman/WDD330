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


export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {

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


export function loadHeaderFooter() {
  const path = "/src/public/partials/";
  const headerPath = "/src/public/partials/header.html";
  const footerPath = "/src/public/partials/footer.html";

  loadTemplate(path);

  const header = document.querySelector(".main-header");
  const footer = document.querySelector(".main-footer");

  renderWithTemplate(header, headerPath);
  renderWithTemplate(footer, footerPath);
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data)
  }
}


export async function loadTemplate(path) {

  const html = await fetch(path).then((response) => response.text());
  const template = document.createElement("template");
  template.innerHTML = html;

}
