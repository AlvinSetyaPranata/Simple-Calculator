const btnWrappers = document.getElementById("button-group")
const displayNumbers = document.getElementById("numbers-area")
const operator = document.getElementById("operator")


let firstOperand = 0
let lastOperand = 0
let operation = ""

const operations = {
    add: () => {
        operation = "add"
        firstOperand += lastOperand
        lastOperand = 0
        operator.innerHTML = "+"
    },
    sub: () => {
        operation = "sub"
        firstOperand -= lastOperand
        lastOperand = 0
        operator.innerHTML = "-"
    },
    mul: () => {
        operation = "mul"
        firstOperand *= lastOperand
        lastOperand = 0
        operator.innerHTML = "X"
    },
    div: () => {
        operation = "div"
        firstOperand /= lastOperand
        lastOperand = 0
        operator.innerHTML = "&#247"
    },
    clear: () => {
        displayNumbers.value = ''
        result = 0
    },
    inverse: () => result = result * -1,
    decimal: () => result *= 0.1
}




Array.from(btnWrappers.children).forEach(child => {
    child.addEventListener('click', (event) => {
        const value = event.target.id

        // if number added to display and set as result 
        if (!isNaN(value)) {
            displayNumbers.value = displayNumbers.value.concat(value)
            result = value
            return
        } 
        else if (value == ".") {
            if (displayNumbers.value.includes(".")) return

            displayNumbers.value = displayNumbers.value.concat(value)
            result = value
            return
        } 
        else if (value == "res") {
            switch(operation) {
                case "add":
                    result = firstOperand + lastOperand
                    break
                case "sub":
                    result = firstOperand - lastOperand
                    break
                case "mul":
                    result = firstOperand * lastOperand
                    break
                case "div":
                    result = firstOperand / lastOperand
                    break

            }
            return
        }

        // Call defined operation to perform
        result = operations[value]()
    })
})