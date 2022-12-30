function evaluateExpression(expression) {
    // Split the expression into tokens
    const tokens = expression.split(/\d+|[+-/*()]/);
  
    // Initialize an empty stack
    const stack = [];
  
    // Iterate over the tokens
    for (const token of tokens) {
      if (token.match(/\d+/)) {
        // If the token is a number, push it onto the stack
        stack.push(parseInt(token));
      } else {
        // If the token is an operator, pop the appropriate number of operands
        // off the stack, apply the operator, and push the result back onto the stack
        const right = stack.pop();
        const left = stack.pop();
        let result;
        switch (token) {
          case "+":
            result = left + right;
            break;
          case "-":
            result = left - right;
            break;
          case "*":
            result = left * right;
            break;
          case "/":
            result = left / right;
            break;
        }
        stack.push(result);
      }
    }
    console.log();
  
    // Return the final result
    return stack.pop();
  }
  
  // Test the function
  let args = process.argv.slice(2);
  evaluateExpression(args);  // prints 42
