let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const historiesWrapper = document.getElementById("history")


if (!localStorage.getItem("sc-history")) {
    const initialValue = []
    localStorage.setItem("sc-history", JSON.stringify(initialValue))
}

function updateHistory({ firstOperand, lastOperand, result, operator, day, time }) {
    
    const operationAreaElement = document.createElement("div")
    const operationResultElement = document.createElement("div")
    const operationDateElement = document.createElement("div")
    
    const operationAreaChild1 = document.createElement("p")
    const operationAreaChild2 = document.createElement("p")
    
    // Set classes
    operationAreaElement.setAttribute("class", "operation-area")
    operationResultElement.setAttribute("class", "result")
    operationDateElement.setAttribute("class", "operation-date")
    
    
    operationAreaChild1.innerHTML = `${firstOperand} ${operator} ${lastOperand}`
    operationAreaChild2.innerHTML = `${result}`

    operationResultElement.appendChild(operationAreaChild1)
    operationResultElement.appendChild(operationAreaChild2)
    
    const operationDateChild1 = document.createElement("p")
    const operationDateChild2 = document.createElement("p")
    
    operationDateChild1.innerHTML = day
    operationDateChild2.innerHTML = time
    
    operationDateElement.appendChild(operationDateChild1)
    operationDateElement.appendChild(operationDateChild2)
    
    // Append to wrapper
    operationAreaElement.appendChild(operationResultElement)
    operationAreaElement.appendChild(operationDateElement)
    
    historiesWrapper.appendChild(operationAreaElement)
    
}


function store(firstOperand, lastOperand, result, operator) {
    const datetime = new Date()
    const storage = JSON.parse(localStorage.getItem("sc-history"))
    const minutes = datetime.getMinutes()
    const data = {firstOperand: firstOperand, lastOperand: lastOperand, result: result, operator: operator, day:`${daysOfWeek[datetime.getDay()]}`, time: `${datetime.getHours()}.${minutes<10 ? '0' : ''}${minutes}`}
        
    storage.push(data)
    localStorage.setItem("sc-history", JSON.stringify(storage))
    updateHistory(data)
}

