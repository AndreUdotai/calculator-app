// addition function
const add = function(x, y) {
	let sum = x + y;
  return sum;
};

// subtraction function
const subtract = function(x, y) {
    let difference = x - y;
    return difference;
};

// multiplication function
const multiply = function(x, y) {
    let product = x * y;
    return product;
}

// division function
const division = function(x, y) {
    let quotient = x / y;
    return quotient;
}

// squared function
const square = function(x) {
    let  squared = Math.pow(x, 2);
    return squared;
}

// power function
const power = function(x, y) {
    let raised = Math.pow(x, y);
    return raised;
}

// factorial function
const factorial = function(x) {
    let factorial = 1;
    for(let i = 1; i <= x; i++){
      factorial *= i;
    }
    return factorial;
};
