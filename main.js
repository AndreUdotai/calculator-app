const add       = (x, y) => x + y; 
const subtract  = (x, y) => x - y;
const multiply  = (x, y) => x * y;
const divide    = (x, y) => x / y;
const power     = (x, y) => x ** y;

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

const display = document.querySelector('#display');
display.value = '0';

const populateDisplay = (input) => {
    let { displayValue, result, allowSecondOperand } = calculator;
    // When there is no initial display - first input
    if(displayValue === '0'){
        calculator.displayValue = input;
        display.value = calculator.displayValue;
        // After a calculation has been completed i.e. after pressing the '=' sign
    } else if (result && allowSecondOperand == false){
        calculator.displayValue = input;
        display.value = calculator.displayValue;
        calculator.firstOperand = null;
        calculator.secondOperand = null;
        calculator.operator = null;
        calculator.result = null;
        // After pressing '=' to get the result of a calculation, you can press an operator and input
        // another operand to do another calculaton with the result, the operator and the new inputed number.
    } else if (result && allowSecondOperand == true) {
        calculator.firstOperand = calculator.result;
        calculator.displayValue = input;
        display.value = calculator.displayValue;
        calculator.secondOperand = null;
    } else {
        // Append digits as you press numbers
        calculator.displayValue = displayValue + input;
        display.value = calculator.displayValue;
    }

}

const handleOperator = (operatorSign) => {
    let { displayValue, firstOperand, operator, result } = calculator;
    // Store inputs into 'firstOperand' when an operator is pressed for the first time
    if(displayValue != '0' && firstOperand == null){
        calculator.firstOperand = displayValue;
        calculator.displayValue = '0';
        // When an operator is pressed after making a second input
    } else if (firstOperand && !result){
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
    let { allowSecondOperand, secondOperand, firstOperand, displayValue, operator, result } = calculator;

    // Stores display value into 'secondOperand' variable 
    if (displayValue !== '0' && allowSecondOperand) {
        calculator.secondOperand = displayValue;
        secondOperand = calculator.secondOperand;
    } else if (typeof result === 'string') {
        firstOperand = result;
    }

    console.log(firstOperand, secondOperand, operator);

    // Ensure operands are valid before parsing
    firstOperand = parseFloat(firstOperand || "0"); // Default to 0 if undefined</span>*
    secondOperand = parseFloat(secondOperand || "0"); // Default to 0 if undefined</span>*
    operator = calculator.operator;

    // Check for division by zero before proceeding with calculation
    if (operator === 'divide' && secondOperand === 0) {
        calculator.displayValue = "Error: Division by Zero";
        display.value = calculator.displayValue;
        calculator.allowSecondOperand = false;
        calculator.result = null; // Reset result to avoid carrying over invalid state
        calculator.firstOperand = null; // Reset firstOperand
        calculator.secondOperand = null; // Reset secondOperand</span>*
        calculator.operator = null; // Reset operator</span>*
        return; // Exit the function to prevent further calculation
    }

    console.log(firstOperand, secondOperand, operator);

    // Perform the calculation if no error
    calculator.result = parseFloat(operate(operator, firstOperand, secondOperand).toFixed(7)).toString();

    calculator.displayValue = calculator.result;
    display.value = calculator.displayValue;
    
    calculator.allowSecondOperand = false;
};

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
        calculator.displayValue = displayValue + dot;
        display.value = calculator.displayValue;
    }
}

const handleClear = () => {
    let { displayValue } = calculator;

    calculator.displayValue = displayValue.slice(0, -1);
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
