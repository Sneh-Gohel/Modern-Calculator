// Add event listener

let firstNumber = '';
let secondNumber = '';
let operator = '';

function operate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    let result;
    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            result = a / b;
            break;
    }
    return parseFloat(result.toFixed(10)); // Fix floating point precision issue
}

document.querySelectorAll('.controls button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (!isNaN(value)) {
            if (operator === '') {
                firstNumber = firstNumber.toString() + value;
                document.querySelector('.mainDisplay').innerText = firstNumber;
            } else {
                secondNumber = secondNumber.toString() + value;
                document.querySelector('.mainDisplay').innerText = firstNumber + (operator !== '*' ? operator : 'x') + secondNumber;
                document.querySelector('.secondaryDisplay').innerText = "= " + operate(firstNumber, secondNumber, operator);
            }
        }

        if (['+', '-', '*', '/'].includes(value)) {
            if (firstNumber !== '' && secondNumber !== '') {
                firstNumber = operate(firstNumber, secondNumber, operator).toString();
                secondNumber = '';
                operator = '';
                document.querySelector('.mainDisplay').innerText = firstNumber;
            }
            if (firstNumber === '') {
                document.querySelector('.mainDisplay').innerText = "Invalid Input";
            } else {
                operator = value;
                document.querySelector('.mainDisplay').innerText = firstNumber + (operator !== '*' ? operator : 'x');
            }
        }

        if (value === 'C') {
            firstNumber = '';
            secondNumber = '';
            operator = '';
            document.querySelector('.mainDisplay').innerText = '';
            document.querySelector('.secondaryDisplay').innerText = '';
        }

        if (value === '=') {
            if (firstNumber !== '' && secondNumber !== '') {
                firstNumber = operate(firstNumber, secondNumber, operator).toString();
                secondNumber = '';
                operator = '';
                document.querySelector('.mainDisplay').innerText = firstNumber;
                document.querySelector('.secondaryDisplay').innerText = '';
            }
        }

        if (value === '.') {
            if (operator === '') {
                if (!firstNumber.toString().includes('.')) {
                    firstNumber = firstNumber.toString() + '.';
                    document.querySelector('.mainDisplay').innerText = firstNumber;
                }
            } else {
                if (!secondNumber.toString().includes('.')) {
                    secondNumber = secondNumber.toString() + '.';
                    document.querySelector('.mainDisplay').innerText = firstNumber + (operator !== '*' ? operator : 'x') + secondNumber;
                }
            }
        }
    });
});
