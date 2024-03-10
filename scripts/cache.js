if (!localStorage.getItem("sc-history")) {
    const initialValue = []
    localStorage.setItem("sc-history", JSON.stringify(initialValue))
}


function store(firstOperand, lastOperand, result, operator) {
    const storage = JSON.parse(localStorage.getItem("sc-history"))
    
    storage.push({firstOperand: firstOperand, lastOperand: lastOperand, result: result, operator: operator})
    localStorage.setItem("sc-history", JSON.stringify(storage))
}


