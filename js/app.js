let buttons = document.querySelectorAll(".button");
let numberBtns = document.querySelectorAll("[type=number]");
let display = document.querySelector("#display");
let calculator = document.querySelector(".calculadora");

function calcular(n1, operator, n2) {
  let resultado = "";

  if (operator == "+") {
    resultado = parseFloat(n1) + parseFloat(n2);
  } else if (operator == "-") {
    resultado = parseFloat(n1) - parseFloat(n2);
  } else if (operator == "*") {
    resultado = parseFloat(n1) * parseFloat(n2);
  } else if (operator == "/") {
    resultado = parseFloat(n1) / parseFloat(n2);
  } else if (operator == "%") {
    resultado = parseFloat(n1) % parseFloat(n2);
  }
  return resultado;
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let target = e.target;

    // pega do type operator do botão
    let operatorType = target.dataset.type;

    // pega o textContent do número clicado
    let numValue = target.value;

    // pega o value do operador clicado
    let operatorTargetValue = target.value;

    if (operatorType == "number") {
      if (display.textContent == "0") {
        display.textContent = numValue;
      } else {
        display.textContent += numValue;
      }
    } else if (operatorType == "operator" && calculator.dataset.previousKeyType !== "operator") {
      // pegar o numero atual exibido no display
      // pegar numero antes de adicionar o simbolo do operador no display
      calculator.dataset.firstValue = display.textContent;

      // adiciona o value (simbolo) do tipo operador clicado no display
      display.textContent += operatorTargetValue;

      // pegar o simbolo do operador/value
      calculator.dataset.operator = operatorTargetValue;

      calculator.dataset.previousKeyType = "operator";
    } else if (operatorType == "decimal") {
      // adiciona ponto decimal
      display.textContent += ".";
    } else if (operatorType == "clean") {
      // limpa e volta o display pra zero
      display.textContent = "0";

      // limpa datasets
      calculator.dataset.firstValue = "";
      calculator.dataset.operator = "";
      calculator.dataset.previousKeyType = "";
    } else if (operatorType == "equal") {
      // obtem segundo valor do display
      let secondValue = "";

      for (let i = 0; i < display.textContent.length; i++) {
        if (display.textContent.charAt(i) == calculator.dataset.operator) {
          secondValue = display.textContent.slice(i + 1);
          break;
        }
      }

      // limpar antes de mostrar resultado
      display.textContent = "";

      // calcula e mostra o resultado no display
      let resultado = calcular(calculator.dataset.firstValue, calculator.dataset.operator, secondValue);
      display.textContent = resultado;

      calculator.dataset.previousKeyType = "";
    }
  });
});
