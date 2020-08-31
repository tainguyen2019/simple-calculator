window.onload = () => {
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const equalButton = document.querySelector('.equal');
    const delButton = document.querySelector('.delete');
    const clearAllButton = document.querySelector('.clear-all');
    const expression = document.querySelector('.expression');
    const result = document.querySelector('.result');

    let expressionText = '';
    let indexOfLastOperator = 0;
    const Error = 'Math Error';

    function isOperator(character) {
        return ['+', '-', '×', '÷'].includes(character);
    }

    function checkExpression(exp) {
        const lastCharacter = exp.charAt(exp.length - 1);

        return !isOperator(lastCharacter) && lastCharacter !== '.'
            && (exp.includes('÷0') === exp.includes('÷0.'));
    }

    function calculate(exp) {
        exp = exp.replace(/×/gi, '*');
        exp = exp.replace(/÷/gi, '/');
        return parseFloat(eval(exp));
    }

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            const number = button.innerText
            expressionText = expression.innerText;
            const lastOperand = expressionText.substring(indexOfLastOperator + 1, expressionText.length);
            
            //Handle add number
            if (number === '.') {
                const lastCharacter = expressionText.charAt(expressionText.length - 1);

                if (isOperator(lastCharacter) || lastOperand.includes('.')) {
                    return;
                }
            }
            expression.innerText += number;
            expressionText = expression.innerText;
            result.innerText = calculate(expressionText);
        });
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            let operator = button.innerText;
            expressionText = expression.innerText;
            //Handle add operator
            const lastCharacter = expressionText.charAt(expressionText.length - 1);
            if (expressionText && !isOperator(lastCharacter)
                && lastCharacter !== '.') {
                expression.innerText += operator;
                expressionText = expression.innerText;
                indexOfLastOperator = expressionText.length - 1;
            }
        });
    });

    equalButton.addEventListener('click', () => {
        //Handle calculate
        if (checkExpression(expressionText)) {
            expression.innerText = calculate(expressionText) || 0;
            result.innerText = '';
        } else {
            expression.innerText = Error;
            result.innerText = '';
        }
    });

    delButton.addEventListener('click', () => {
        const str = expression.innerText;
        if (str && str !== Error) {
            expression.innerText = str.substr(0, str.length - 1);
            expressionText = expression.innerText;
            if (checkExpression(expressionText)) {
                result.innerText = calculate(expressionText) || 0;
            }
        } else {
            expression.innerText = expressionText = '';
        }
    });

    clearAllButton.addEventListener('click', () => {
        expression.innerText = '';
        result.innerText = '';
    });
}
