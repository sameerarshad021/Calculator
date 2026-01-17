const display = document.getElementById('display');
const expressionEl = document.getElementById('expression');

let current = '0';
let previous = null;
let operator = null;
let shouldReset = false;

function updateScreen() {
  display.textContent = current || '0';
  
  if (previous !== null && operator) {
    expressionEl.textContent = `${previous} ${operator}`;
  } else {
    expressionEl.textContent = '';
  }
}

function appendNumber(num) {
  if (shouldReset) {
    current = '';
    shouldReset = false;
  }
  
  if (current === '0' && num !== '.') {
    current = num;
  } else {
    current += num;
  }
  updateScreen();
}

function setOperator(op) {
  if (current === '') return;

  if (previous !== null && operator) {
    calculate(); // chain operations
  }

  previous = current;
  operator = op;
  shouldReset = true;
  updateScreen();
}

function calculate() {
  if (!previous || !operator || !current) return;

  let a = parseFloat(previous);
  let b = parseFloat(current);
  let result;

  switch(operator) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
    case '/': result = b === 0 ? 'Error' : a / b; break;
  }

  current = result.toString().length > 12 
    ? Number(result).toExponential(8) 
    : result.toString();
  
  previous = null;
  operator = null;
  shouldReset = true;
  updateScreen();
}

function clearAll() {
  current = '0';
  previous = null;
  operator = null;
  shouldReset = false;
  updateScreen();
}

function toggleSign() {
  if (current === '0' || current === '') return;
  current = (parseFloat(current) * -1).toString();
  updateScreen();
}

function percent() {
  if (current === '0' || current === '') return;
  current = (parseFloat(current) / 100).toString();
  updateScreen();
}

// Event Listeners
document.querySelectorAll('[data-num]').forEach(btn => {
  btn.addEventListener('click', () => appendNumber(btn.textContent));
});

document.querySelectorAll('[data-op]').forEach(btn => {
  btn.addEventListener('click', () => setOperator(btn.getAttribute('data-op')));
});

document.querySelector('.equals').addEventListener('click', calculate);

document.querySelectorAll('[data-action]').forEach(btn => {
  const action = btn.dataset.action;
  if (action === 'clear') btn.addEventListener('click', clearAll);
  if (action === 'sign')  btn.addEventListener('click', toggleSign);
  if (action === 'percent') btn.addEventListener('click', percent);
});