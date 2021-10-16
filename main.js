const add       = (x, y) => x + y;
const subtract  = (x, y) => x - y;
const multiply  = (x, y) => x * y;
const divide    = (x, y) => x / y;
const power     = (x, y) => Math.pow(x, y);
const square    = x => x * x;
const operate   = (operator, x, y) => {
    switch (operator){
        case 'multiply':
            return multiply(x, y);
            break;
        case 'divide':
            return divide(x, y);
            break;
        case 'add':
            return add(x, y);
            break;
        case 'subtract':
            return subtract(x, y);
            break;
        case 'power':
            return power(x, y);
            break;
    }
}

const calculator = {
    displayValue:       '0',
    firstOperand:       null,
    allowSecondOperand: false,
    secondOperand:      null,
    operator:           null,
    result:             null,
}

const display = document.getElementById('display');

const populateDisplay = (input) => {
    let { displayValue } = calculator;
    if(displayValue === '0'){
        calculator.displayValue = input;
        display.value = calculator.displayValue;
    } else {
        calculator.displayValue = displayValue + input;
        display.value = calculator.displayValue;
    }
}

const handleOperator = (operatorSign) => {
    let { displayValue, firstOperand, operator } = calculator;

    if(displayValue != '0' && firstOperand == null){
        calculator.firstOperand = displayValue;
        calculator.displayValue = '0';
    } else if (firstOperand != null){
        firstOperand = parseFloat(firstOperand);
        displayValue = parseFloat(displayValue);

        calculator.firstOperand = (parseFloat(operate(operator, firstOperand, displayValue).toFixed(7))).toString();
        calculator.displayValue = '0';
        display.value = calculator.firstOperand;
    }
    calculator.allowSecondOperand = true;
    calculator.operator = operatorSign;
}

const handleResult = () => {
    let { allowSecondOperand, secondOperand, firstOperand, displayValue, operator, result} = calculator;

    if(displayValue !== '0' && allowSecondOperand){
        calculator.secondOperand = displayValue;
        secondOperand = calculator.secondOperand;
    } else if (typeof(result) === 'string'){
        firstOperand = result;
    }
    firstOperand = parseFloat(firstOperand);
    secondOperand = parseFloat(secondOperand);
    operator = calculator.operator;

    calculator.result = (parseFloat(operate(operator, firstOperand, secondOperand).toFixed(7))).toString();
    console.log(calculator.result)
    calculator.displayValue = calculator.result;
    display.value = calculator.displayValue;
    
    calculator.allowSecondOperand = false;
    console.table(calculator)
}

const handleAllClear = () => {
    calculator.displayValue         = '0';
    calculator.firstOperand         = null;
    calculator.allowSecondOperand   = false;
    calculator.secondOperand        = null;
    calculator.operator             = null;
    calculator.result               = null;

    display.value = calculator.displayValue;
}

const handleDecimal = (dot) => {
    let { displayValue } = calculator;

    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue     = displayValue + dot;
        display.value = calculator.displayValue;
    }
}

const handleClear = () => {
    let { displayValue } = calculator;

    calculator.displayValue = displayValue.substr(0, displayValue.length - 1);
    if(displayValue.length > 1){
        display.value = calculator.displayValue;
    } else {
        display.value = '0'
    }
}

const keys = document.getElementById('keys');
keys.addEventListener('click', (e) => {
    let { target } = e;

    if(!target.matches('.key')){
        return;
    }

    if(target.classList.contains('numKey')){
        populateDisplay(target.value);
        return;
    }

    if(target.classList.contains('operator')){
        handleOperator(target.value);
        return;
    }

    if(target.classList.contains('decimal')){
        handleDecimal(target.value);
        return;
    }

    if(target.classList.contains('result')){
        handleResult();
        return;
    }

    if(target.classList.contains('clear')){
        handleClear();
        return;
    }

    if(target.classList.contains('allClear')){
        handleAllClear();
        return;
    }
 })