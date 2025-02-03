import {
  loadHeaderFooter,
  getLocalStorage,
  setLocalStorage,
} from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import { alertMessage, getFormValidationErrors } from "./utils.mjs";

loadHeaderFooter();
document.addEventListener("DOMContentLoaded", () => {
  const myCheckout = new CheckoutProcess("cart", ".checkout-summary");
  const myForm = document.forms["checkout-form"];

  // Check for invalid inputs from the user
  const creditcardNum = document.querySelector("#creditcard-number");

  creditcardNum.addEventListener("click", () => {
    debugger;
    if (creditcardNum) {
      // Show a custom alert message on fail
      const errors = getFormValidationErrors(myForm);
      if (errors.length > 0) {
        console.log(errors);
        alertMessage(errors, true);
      }
    }
  });

  const zipInput = document.querySelector("#zipcode");
  const checkoutSubmitButton = document.querySelector("#btn-checkout");

  debugger;

  if (myCheckout) {
    myCheckout.init();
    myCheckout.calculateOrdertotal();

    if (zipInput) {
      zipInput.addEventListener(
        "blur",
        myCheckout.calculateOrdertotal.bind(myCheckout),
      );
    }

    if (checkoutSubmitButton) {
      debugger;
      checkoutSubmitButton.addEventListener("click", (e) => {
        e.preventDefault();

        const chk_status = myForm.checkValidity();
        myForm.reportValidity();
        // Check status if okay before checkout
        if (chk_status) {
          myCheckout.checkout();
          // Navigate to the success page!
          window.location.href = "../checkout/success.html";
          // Empty the cart
          setLocalStorage("cart", []);
        }
      });
    }
  }
});
