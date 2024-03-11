const btnWrappers = document.getElementById("button-group")
const displayNumbers = document.getElementById("numbers-area")
const displayResult = document.getElementById("result-area")
const operator = document.getElementById("operator")
const viewHistoryElement = document.getElementById("viewHistory")


let firstOperand = null
let lastOperand = null
let operation = ""

const operations = {
    add: () => {
        operation = "add"
        firstOperand = firstOperand==null ? lastOperand : firstOperand + lastOperand
        lastOperand = 0
        operator.innerHTML = "+"
        displayNumbers.value = ""
    },
    sub: () => {
        operation = "sub"
        firstOperand = firstOperand==null ? lastOperand : firstOperand - lastOperand
        lastOperand = 0
        operator.innerHTML = "-"
        displayNumbers.value = ""
    },
    mul: () => {
        operation = "mul"
        firstOperand = firstOperand==null ? lastOperand : firstOperand * lastOperand
        lastOperand = 0
        operator.innerHTML = "x"
        displayNumbers.value = ""
    },
    div: () => {
        operation = "div"
        firstOperand = firstOperand==null ? lastOperand : firstOperand / lastOperand
        lastOperand = 0
        operator.innerHTML = "&#247"
        displayNumbers.value = ""
    },
    clear: () => {
        displayNumbers.value = ""
        displayResult.value = ""
        lastOperand = null
        firstOperand = null
    },
    inverse: () => firstOperand ? firstOperand *= -1 : lastOperand = lastOperand *= -1,
    decimal: () => firstOperand ? firstOperand *= 0.1 : lastOperand *= 0.1
}


Array.from(btnWrappers.children).forEach(child => {
    child.addEventListener('click', (event) => {
        const value = event.target.id == "zero" ?  0 : event.target.id

        // if number added to display and set as result 
        if (!isNaN(value) || value == "zero") {
            displayNumbers.value = displayNumbers.value.concat(value)
            const valueInt = displayNumbers.value.includes(".") ?  parseFloat(displayNumbers.value) : parseInt(displayNumbers.value)
            
            lastOperand = valueInt
            
            return
        } 
        else if (value == ".") {
            if (displayNumbers.value.includes(".")) return
            
            displayNumbers.value = displayNumbers.value.concat(value)
            lastOperand = parseFloat(displayNumbers.value)
            return
        } 
        else if (value == "res") {
            const oldFirstOperand = firstOperand

            switch(operation) {
                case "add":
                    firstOperand += lastOperand
                    break
                case "sub":
                    firstOperand -= lastOperand
                    break
                case "mul":
                    firstOperand *= lastOperand
                    break
                case "div":
                    firstOperand /= lastOperand
                    break

            }
            // Cleanup and push current operation to history
            store(oldFirstOperand, lastOperand,  firstOperand, operator.innerText)
            displayResult.value = firstOperand
            operations.clear()
            return
        }

        // Call defined operation to perform
        operations[value]()
    })
})

viewHistoryElement.addEventListener('click', () => {
    btnWrappers.classList.toggle("closed")
})



// Load whenever there are history in localstorage
const histories = localStorage.getItem("sc-history")

if (histories) {
    JSON.parse(histories).forEach(history => {
        updateHistory(history)
    })
}