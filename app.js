const display = document.getElementById('display');
  const expressionDiv = document.getElementById('expression');

  let currentInput = '0';
  let previousInput = '';
  let operator = null;
  let expression = '';

  function updateDisplay() {
    display.textContent = currentInput;
    expressionDiv.textContent = expression;
  }

  function appendNumber(number) {
    if (currentInput === '0' || currentInput === 'Error') {
      currentInput = number;
    } else {
      currentInput += number;
    }
    updateDisplay();
  }

  function appendDot() {
    if (currentInput === 'Error') currentInput = '0';
    if (!currentInput.includes('.')) {
      currentInput += '.';
    }
    updateDisplay();
  }

  function appendOperator(op) {
    if (currentInput === 'Error') return;

    if (previousInput !== '' && operator && currentInput !== '') {
      calculate(); // chain calculation
    }

    previousInput = currentInput;
    operator = op;

    // Show expression like 12 + 
    expression = `${previousInput} ${operator}`;
    currentInput = '0';
    updateDisplay();
  }

  function calculate() {
    if (!operator || !previousInput) return;

    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    switch (operator) {
      case '+': result = prev + curr; break;
      case '-': result = prev - curr; break;
      case '*': result = prev * curr; break;
      case '/':
        result = curr === 0 ? 'Error' : prev / curr;
        break;
      default: return;
    }

    currentInput = result.toString().length > 12 
      ? Number(result).toExponential(6) 
      : result.toString();

    // After =, show full expression
    expression = `${previousInput} ${operator} ${previousInput !== currentInput ? curr : ''} =`;
    operator = null;
    previousInput = '';
    updateDisplay();
  }

  function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    expression = '';
    updateDisplay();
  }

  function plusMinus() {
    if (currentInput === '0' || currentInput === 'Error') return;
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
  }

  function percent() {
    if (currentInput === '0' || currentInput === 'Error') return;
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
  }

  updateDisplay();