const resultado = document.querySelector(".resultado");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let firstOperand = null;
let operador = null;
let restart = false;


function updateResultado(originClear = false){
    resultado.innerText = originClear ? 0 : currentNumber.replace(".", ",");
}


function addDigit(digit){
    if (digit === "," && (currentNumber.includes(",") || !currentNumber))
    return;

    if (restart){
        currentNumber = digit;
        restart = false;
        
    }else{
        currentNumber += digit;
    }

    updateResultado();
}

function setOperador(newOperador){
    if (currentNumber){
        calculador();

        firstOperand = parseFloat(currentNumber.replace(",", "."));
        currentNumber = "";
    }
    operador = newOperador;
}

function calculador(){
    if (operador === null || firstOperand === null) return;
    let secondOperand = parseFloat(currentNumber.replace(",","."));
    let resultadoValue;

    switch (operador) {
        case "+":
            resultadoValue = firstOperand + secondOperand;
            break;

        case "-":
             resultadoValue = firstOperand - secondOperand;
            break;

            case "x":
                resultadoValue = firstOperand * secondOperand;
               break;

            case "÷":
                resultadoValue = firstOperand / secondOperand;
               break;
               default:
                return;
    }

    if (resultadoValue.toString().split(".")[1]?.length > 5){
        currentNumber = parseFloat(resultadoValue.toFixed(5)).toString();
    }else{
        currentNumber = resultadoValue.toString();
    }

    
    operador = null;
    firstOperand = null;
    restart = true;
    percentageValue = null;
    updateResultado();
}

function clearCalculador(){
    currentNumber = "";
    firstOperand = null;
    operador = null;
    updateResultado(true);
}

function setPercentage(){
    let resultado = parseFloat(currentNumber) / 100;

    if (["+", "-"].includes(operador)){
        resultado = resultado * (firstOperand || 1);
    }

    if (resultado.toString().split(".")[1]?.length > 5) {
        resultado = resultado.toFixed(5).toString();
    }

    currentNumber = resultado.toString();
    updateResultado();
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.innerText;
        if (/^[0-9]+$/.test(buttonText)) {
            addDigit(buttonText);
        }else if (["+", "-", "x", "+"].includes(buttonText)){
            setOperador(buttonText);
        }else if (buttonText =="="){
            calculador();
        }else if (buttonText == "AC"){
            clearCalculador();
        }else if (buttonText == "±"){
            currentNumber = (
                parseFloat(currentNumber || firstOperand) * -1
            ).toString();
            updateResultado();
        }else if (buttonText == "%"){
            setPercentage();
        }
        
    });
});