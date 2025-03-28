let blocked = false;
let firstNumber = "";
let operator;
let lastNumber = "";
const display = document.querySelector("div.display");
const numbers = document.querySelector(".container");

numbers.addEventListener("click", (event) => {
  if (event.target.classList.contains("button")) {
    let value = event.target.value;

    if (value === "clear") {
      display.textContent = "0";
      firstNumber = "";
      lastNumber = "";
      operator = "";
    } else if (value === "sign" && !operator) {
      firstNumber = -firstNumber;
      display.textContent = firstNumber;
    } else if (value === "sign" && operator) {
      lastNumber = -lastNumber;
      display.textContent = lastNumber;
    } else if (value === "percentage" && !operator) {
      firstNumber = firstNumber / 100;
      display.textContent = firstNumber;
    } else if (value === "percentage" && operator) {
      lastNumber = lastNumber / 100;
      display.textContent = lastNumber;
    } else if (
      value === "/" ||
      value === "*" ||
      value === "+" ||
      value === "-"
    ) {
      operator = value;
    } else if (value === "=") {
      operate(operator);
      lastNumber = "";
    } else if (value === "." && display.textContent.includes(".")) {
      display.textContent;
    } else if (operator) {
      lastNumber += value;
      if (lastNumber.length <= 9) {
        display.textContent = lastNumber;
      }
    } else {
      if (display.textContent.length < 9) {
        display.textContent === "0"
          ? (display.textContent = value)
          : (display.textContent += value);
        firstNumber += value;
      }
    }
  }
});

function add() {
  let result = Number(firstNumber) + Number(lastNumber);
  firstNumber = "";
  firstNumber = result;
  let tamanho = firstNumber.toString().length;
  if(tamanho <= 9){
    display.textContent = firstNumber;
  } else {
    display.textContent = 'too long';
  } 
}

function subtract() {
  let result = Number(firstNumber) - Number(lastNumber);
  firstNumber = "";
  firstNumber = result;
  let tamanho = firstNumber.toString().length;
  if(tamanho <= 9){
    display.textContent = firstNumber;
  } else {
    display.textContent = 'too long';
  }
}

function multiply() {
  let result = Number(firstNumber) * Number(lastNumber);
  firstNumber = "";
  firstNumber = result;
  let tamanho = firstNumber.toString().length;
  if(tamanho <= 9){
    display.textContent = firstNumber;
  } else {
    display.textContent = 'too long';
  }
}
function divide() {
  let result = Number(firstNumber) / Number(lastNumber);
  firstNumber = "";
  firstNumber = result;
  let tamanho = firstNumber.toString().length;
  if(tamanho <= 9){
    display.textContent = firstNumber;
  } else {
    display.textContent = 'too long';
  }
}

function operate(operator) {
  if (operator === "+") {
    add();
  } else if (operator === "-") {
    subtract();
  } else if (operator === "*") {
    multiply();
  } else if (firstNumber === "0" || lastNumber === "0") {
    display.textContent = "oops";
  } else {
    divide();
  }
}
