const inputAmount = document.getElementById("mortgage-amount");
const inputTerm = document.getElementById("mortgage-term");
const inputInterestRate = document.getElementById("interest-rate");
const inputTypeRepayment = document.getElementById("type-repayment");
const inputTypeInterestOnly = document.getElementById("type-interest");
const calculateButton = document.getElementById("calculate");
const clearAll = document.getElementById("clear-all");
const emptyLayout = document.querySelector(".layout-empty");
const completedLayout = document.querySelector(".layout-completed");
const monthlyRepaymentFigure = document.getElementById("monthly-repayment-figure");
const totalRepaymentFigure = document.getElementById("total-repayment-figure");
const errorMessages = document.querySelectorAll(".error-message");

let spanPound = document.querySelector(".pounds");
let spanYears = document.querySelector(".years");
let spanPercentage = document.querySelector(".percentage");

let amountValid;
let termValid;
let interestValid;
let typeChecked;
let typeOfRepayment;

let monthlyRepayment;
let monthlyRepaymentRounded;
let totalRepayment;
let totalRepaymentRounded;
let p;
let i;
let n;

completedLayout.style.display = "none";
emptyLayout.style.display = "block";

for (let i of errorMessages) {
  i.style.display = "none";
}

// Input active styling

inputAmount.onfocus = function () {
  spanPound.style.setProperty("--span-bg-color", "hsl(61, 70%, 52%)");
  spanPound.style.setProperty("--span-text-color", "hsl(202, 55%, 16%)");
};
inputAmount.onblur = function () {
  checkAmount();
  if (amountValid == false) {
    spanPound.style.setProperty("--span-bg-color", "hsl(4, 69%, 50%)");
  } else {
    spanPound.style.setProperty("--span-bg-color", "hsl(202, 86%, 94%)");
  }
};

inputTerm.onfocus = function () {
  spanYears.style.setProperty("--span-bg-color", "hsl(61, 70%, 52%)");
  spanYears.style.setProperty("--span-text-color", "hsl(202, 55%, 16%)");
};
inputTerm.onblur = function () {
  checkTerm();
  if (termValid == false) {
    spanYears.style.setProperty("--span-bg-color", "hsl(4, 69%, 50%)");
  } else {
    spanYears.style.setProperty("--span-bg-color", "hsl(202, 86%, 94%)");
  }
};

inputInterestRate.onfocus = function () {
  spanPercentage.style.setProperty("--span-bg-color", "hsl(61, 70%, 52%)");
  spanPercentage.style.setProperty("--span-text-color", "hsl(202, 55%, 16%)");
};
inputInterestRate.onblur = function () {
  checkInterest();
  if (interestValid == false) {
    spanPercentage.style.setProperty("--span-bg-color", "hsl(4, 69%, 50%)");
  } else {
    spanPercentage.style.setProperty("--span-bg-color", "hsl(202, 86%, 94%)");
  }
};

inputTypeRepayment.onclick = checkType;

// Clear all button

clearAll.onclick = clearAllFields;

function clearAllFields() {
  document.getElementById("mortgage-form").reset();
  completedLayout.style.display = "none";
  emptyLayout.style.display = "block";
}

// Calculate function

calculateButton.onclick = validateInputs;

function validateInputs() {
  checkAmount();
  checkTerm();
  checkInterest();
  checkType();
  if (
    amountValid == true &&
    termValid == true &&
    interestValid == true &&
    typeChecked == true
  ) {
    calculateRepayments();
  }
}

function checkAmount() {
  amountValid = false;
  if (inputAmount.validity.valueMissing || inputAmount.validity.typeMismatch) {
    inputAmount.style.setProperty("--border-color", "hsl(4, 69%, 50%)");
    spanPound.style.setProperty("--span-bg-color", "hsl(4, 69%, 50%)");
    spanPound.style.setProperty("--span-text-color", "hsl(0, 0%, 100%)");
    errorMessages[0].style.display = "block";
    amountValid = false;
  } else {
    inputAmount.style.setProperty("--border-color", "hsl(200, 26%, 54%)");
    spanPound.style.setProperty("--span-bg-color", "hsl(202, 86%, 94%)");
    spanPound.style.setProperty("--span-text-color", "hsl(200, 24%, 40%)");
    errorMessages[0].style.display = "none";
    amountValid = true;
  }
}

function checkTerm() {
  termValid = false;
  if (inputTerm.validity.valueMissing || inputTerm.validity.typeMismatch) {
    inputTerm.style.setProperty("--border-color", "hsl(4, 69%, 50%)");
    spanYears.style.setProperty("--span-bg-color", "hsl(4, 69%, 50%)");
    spanYears.style.setProperty("--span-text-color", "hsl(0, 0%, 100%)");
    errorMessages[1].style.display = "block";
    termValid = false;
  } else {
    inputTerm.style.setProperty("--border-color", "hsl(200, 26%, 54%)");
    spanYears.style.setProperty("--span-bg-color", "hsl(202, 86%, 94%)");
    spanYears.style.setProperty("--span-text-color", "hsl(200, 24%, 40%)");
    errorMessages[1].style.display = "none";
    termValid = true;
  }
}

function checkInterest() {
  interestValid = false;
  if (
    inputInterestRate.validity.valueMissing ||
    inputInterestRate.validity.typeMismatch
  ) {
    inputInterestRate.style.setProperty("--border-color", "hsl(4, 69%, 50%)");
    spanPercentage.style.setProperty("--span-bg-color", "hsl(4, 69%, 50%)");
    spanPercentage.style.setProperty("--span-text-color", "hsl(0, 0%, 100%)");
    errorMessages[2].style.display = "block";
    interestValid = false;
  } else {
    inputInterestRate.style.setProperty("--border-color", "hsl(200, 26%, 54%)");
    spanPercentage.style.setProperty("--span-bg-color", "hsl(202, 86%, 94%)");
    spanPercentage.style.setProperty("--span-text-color", "hsl(200, 24%, 40%)");
    errorMessages[2].style.display = "none";
    interestValid = true;
  }
}

function checkType() {
  typeChecked = false;
  if (inputTypeRepayment.checked) {
    typeChecked = true;
    typeOfRepayment = "repayment";
    errorMessages[3].style.display = "none";
  } else if (inputTypeInterestOnly.checked) {
    typeChecked = true;
    typeOfRepayment = "interest-only";
    errorMessages[3].style.display = "none";
  } else {
    typeChecked = false;
    errorMessages[3].style.display = "block";
  }
}

function calculateRepayments() {
  p = inputAmount.value;
  i = inputInterestRate.value / 100 / 12;
  n = inputTerm.value * 12;
  if (typeOfRepayment == "repayment") {
    monthlyRepayment =
      p * ((i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1));
    totalRepayment = monthlyRepayment * n;
    console.log(monthlyRepayment);
  } else if (typeOfRepayment == "interest-only") {
    monthlyRepayment = (p * (inputInterestRate.value / 100)) / 12;
    totalRepayment = monthlyRepayment * n;
    console.log(monthlyRepayment);
  }
  completedLayout.style.display = "block";
  emptyLayout.style.display = "none";
  monthlyRepaymentRounded = monthlyRepayment.toFixed(2);
  totalRepaymentRounded = totalRepayment.toFixed(2);
  monthlyRepaymentFigure.innerHTML =
    "£" + parseFloat(monthlyRepaymentRounded).toLocaleString();
  totalRepaymentFigure.innerHTML =
    "£" + parseFloat(totalRepaymentRounded).toLocaleString();
}
