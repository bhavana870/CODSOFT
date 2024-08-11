document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('but'));
    let displayValue = '0';
    let firstOperand = null;
    let operator = null;
    let awaitingSecondOperand = false;

    function updateDisplay() {
        display.innerText = displayValue;
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('dv');

            if (value >= '0' && value <= '9' || value === '.') {
                if (awaitingSecondOperand) {
                    displayValue = value;
                    awaitingSecondOperand = false;
                } else {
                    displayValue = displayValue === '0' ? value : displayValue + value;
                }
            } else if (value === '/' || value === '*' || value === '-' || value === '+') {
                handleOperator(value);
            } else if (value === '=') {
                handleOperator(value);
            }

            updateDisplay();
        });
    });

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(displayValue);

        if (operator && awaitingSecondOperand) {
            operator = nextOperator;
            return;
        }

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            displayValue = `${parseFloat(result.toFixed(7))}`; // To avoid floating point precision issues
            firstOperand = result;
        }

        awaitingSecondOperand = true;
        operator = nextOperator;
    }

    function calculate(first, second, operator) {
        switch (operator) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '*':
                return first * second;
            case '/':
                return first / second;
            default:
                return second;
        }
    }
});
