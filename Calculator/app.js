class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.allClear()
    }

    allClear() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    updateDisplay () {
        this.currentOperandText.innerText = this.currentOperand
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operandButton = document.querySelectorAll('[data-operand]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalButton = document.querySelector('[data-equal]')

const previousOperandText = document.querySelector('[data-upper-output]')
const currentOperandText = document.querySelector('[data-lower-output]')

const calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener('click', () => {
    calculator.allClear()
    calculator.updateDisplay()
})