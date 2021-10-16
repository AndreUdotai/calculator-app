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

    console.table(calculator)
    }

}

const handleOperator = (operatorSign) => {
    let { displayValue, firstOperand, operator, result } = calculator;
    // Store inputs into 'firstOperand' when an operator is pressed for the first time
    if(displayValue != '0' && firstOperand == null){
        calculator.firstOperand = displayValue;
        calculator.displayValue = '0';
        // When an operator is pressed after making a second input - the two entries
        // are added back to the first operator
    } else if (firstOperand != null && result == null){
        firstOperand = parseFloat(firstOperand);
        displayValue = parseFloat(displayValue);

        calculator.firstOperand = (parseFloat(operate(operator, firstOperand, displayValue).toFixed(7))).toString();
        calculator.displayValue = '0';
        display.value = calculator.firstOperand;
    } 
    calculator.allowSecondOperand = true;
    calculator.operator = operatorSign;
    console.table(calculator)

}

const handleResult = () => {
    let { allowSecondOperand, secondOperand, firstOperand, displayValue, operator, result} = calculator;
    // Stores display value into 'secondOperand' variable 
    if(displayValue !== '0' && allowSecondOperand){
        calculator.secondOperand = displayValue;
        secondOperand = calculator.secondOperand;
        // store the result in firstOperand (this covers for cases when a user continously presses
        // the '=' sign when a calculation is completed.
    } else if (typeof(result) === 'string'){
        firstOperand = result;
    }
    firstOperand = parseFloat(firstOperand);
    secondOperand = parseFloat(secondOperand);
    operator = calculator.operator;

    calculator.result = (parseFloat(operate(operator, firstOperand, secondOperand).toFixed(7))).toString();

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
    console.table(calculator)

}

const handleDecimal = (dot) => {
    let { displayValue } = calculator;

    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue     = displayValue + dot;
        display.value = calculator.displayValue;
    }
    console.table(calculator)

}

const handleClear = () => {
    let { displayValue } = calculator;

    calculator.displayValue = displayValue.substr(0, displayValue.length - 1);
    if(displayValue.length > 1){
        display.value = calculator.displayValue;
    } else {
        display.value = '0'
    }
    console.table(calculator)

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