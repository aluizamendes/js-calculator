let buttons = document.querySelectorAll(".button");
let display = document.querySelector("#display");
let calculator = document.querySelector(".calculadora");
let historic = document.querySelector(".previousOperation");

function changeDisplayContent(content, option) {
  if (option == "add") {
    display.textContent += content;
  } else if (option == "keep") {
    display.textContent = content;
  }
}

function cleanHistoric() {
  historic.textContent = "";
}

// limpa datasets
function resetDatasets() {
  calculator.dataset.firstValue = "";
  calculator.dataset.operator = "";
  calculator.dataset.previousKeyType = "";
}

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

    // pega do type do botão
    let buttonType = target.dataset.type;

    // pega o valor/value do botao clicado
    let buttonValue = target.value;

    if (buttonType == "number") {

      if (display.textContent == "0") {
        changeDisplayContent(buttonValue, "keep");

      } else if (calculator.dataset.previousKeyType == "equal") {
        // limpa e volta o display pra zero
        changeDisplayContent("", "keep");
        cleanHistoric();
        resetDatasets();

        // adiciona numero ao display
        changeDisplayContent(buttonValue, "add");

      } else {
        changeDisplayContent(buttonValue, "add");
      }
      calculator.dataset.previousKeyType = "number";
    } 
    
    else if (buttonType == "operator" && calculator.dataset.previousKeyType !== "operator" && calculator.dataset.operator == "") {

      cleanHistoric();
      // pegar o numero atual exibido no display antes de adicionar o simbolo do operador
      calculator.dataset.firstValue = display.textContent;

      // adiciona o value (simbolo) do tipo operador clicado no display
      changeDisplayContent(buttonValue, "add");

      // pegar o simbolo do operador/value
      calculator.dataset.operator = buttonValue;

      calculator.dataset.previousKeyType = "operator";
      historic.textContent += `${calculator.dataset.firstValue} ${calculator.dataset.operator} `;
    } 
    
    else if (buttonType == "decimal") {
      changeDisplayContent(".", "add");
    }

    else if (buttonType == "clean") {
      changeDisplayContent("0", "keep");
      cleanHistoric();
      resetDatasets();
    } 
    
    else if (buttonType == "backspace") {

      let ultimoElementoDoDisplay = display.textContent.charAt(display.textContent.length - 1);

      // se ultimo elemento do display for igual ao operador, resetar dataset do operador
      if (ultimoElementoDoDisplay == calculator.dataset.operator) {
        calculator.dataset.operator = "";
        historic.textContent = historic.textContent.slice(0, -2);
      }

      display.textContent = display.textContent.slice(0, -1);
      calculator.dataset.previousKeyType = "backspace";
    } 
    
    else if (buttonType == "equal") {

      let firstValue = calculator.dataset.firstValue;
      let operator = calculator.dataset.operator;

      // obter segundo valor do display
      let secondValue = "";
      let displayContent = display.textContent;

      for (let i = 0; i < displayContent.length; i++) {
        if (displayContent.charAt(i) == operator) {
          secondValue = displayContent.slice(i + 1);
          break;
        }
      }

      // se a ultima tecla clicada for um operador ou o operador nao foi definido ou nao ha o segundo valor para realizar a operacao, o display nao muda e nao calcula nada
      if (calculator.dataset.previousKeyType == "operator" || calculator.dataset.operator == "" || secondValue == "") {
        display.textContent = display.textContent;
      }
      else {
        //mostrar resultado
        let result = calcular(firstValue, operator, secondValue);
        changeDisplayContent(result, "keep");

        calculator.dataset.previousKeyType = "equal";
        calculator.dataset.operator = "";
        historic.textContent += `${secondValue} =`;
      }
    }
  });
});
