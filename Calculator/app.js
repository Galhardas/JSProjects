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
        this.previousOperandText.innerHTML = this.previousOperand
    }

    chooseOperation (operator) {
        if (this.currentOperand === '')
            return
        else
            this.previousOperandText.innerText = this.currentOperand.toString() + ' ' + operator.toString()
            this.previousOperand = this.currentOperand.toString() + ' ' + operator.toString()
            this.currentOperandText.innerText = ''
            this.currentOperand = ''
            this.operator = operator
    }

    delete () {
        if (this.currentOperand !== '')
            this.currentOperand = this.currentOperand.toString()
            this.currentOperand = this.currentOperand.slice(0, -1)
    }

    equal () {
        if (this.currentOperand === '' || this.previousOperand === '') return
        this.parcelOne = Number(this.previousOperand.slice(0, -2))
        this.parcelTwo = Number(this.currentOperand)
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

operandButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
    })
})

allClearButton.addEventListener('click', () => {
    calculator.allClear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

equalButton.addEventListener('click', () => {
    calculator.equal()
})