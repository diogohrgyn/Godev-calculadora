const numberbuttons = document.querySelectorAll("[data-number]");
const operatorbuttons = document.querySelectorAll("[data-operator]");
const equalsbutton = document.querySelector("[data-equals]");
const deletebutton = document.querySelector("[data-delete]");
const clearbutton = document.querySelector("[data-clear]");
const previonoperandTextElement = document.querySelector("[data-previous]");
const currentoperandTextElement = document.querySelector("[data-current]");

class Calcular {
  constructor(previonoperandTextElement, currentoperandTextElement) {
    this.previonoperandTextElement = previonoperandTextElement;
    this.currentoperandTextElement = currentoperandTextElement;
    this.clear();
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    const integerDigits = parseFloat(integerDigits.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString(en, {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${integerDigits}`;
    } else {
      return integerDisplay;
    }
  }

  closeOperation(operation) {
    if (this.currentOperand == "") return;

    if (this.previousOperand !== "") {
      this.calculate();
    }

    this.operation = operation;

    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  calculate() {
    let result;

    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

    switch (this.operation) {
      case "+":
        result = _previousOperand + _currentOperand;
        break;
      case "-":
        result = _previousOperand - _currentOperand;
        break;
      case "*":
        result = _previousOperand * _currentOperand;
        break;
      case "/":
        result = _previousOperand / _currentOperand;
        break;
      default:
        return;
    }
    this.previousOperand = "";
    this.currentOperand = result;
    this.operation = undefined;
  }

  appendNumber(number) {
    if (this.currentOperand.includes(".") && number == ".") return;
    if (this.currentOperand == "" && number == ".") {
      this.currentOperand = "0" + number.toString();
      return;
    }

    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }
  updateDisplay() {
    this.previonoperandTextElement.innerText = `${this.previousOperand}${
      this.operation || ""
    }`;
    this.currentoperandTextElement.innerText = this.formatDisplayNumber(
      this.currentOperand
    );
  }
}

const calc = new Calcular(previonoperandTextElement, currentoperandTextElement);

for (const numberbutton of numberbuttons) {
  numberbutton.addEventListener("click", () => {
    calc.appendNumber(numberbutton.innerText);
    calc.updateDisplay();
  });
}

for (const operatorbutton of operatorbuttons) {
  operatorbutton.addEventListener("click", () => {
    calc.closeOperation(operatorbutton.innerText);
    calc.updateDisplay();
  });
}

clearbutton.addEventListener("click", () => {
  calc.clear();
  calc.updateDisplay();
});

equalsbutton.addEventListener("click", () => {
  calc.calculate();
  calc.updateDisplay();
});
deletebutton.addEventListener("click", () => {
  calc.delete();
  calc.updateDisplay();
});
