const first_value = document.querySelector(".firstvalue")
const display = document.querySelector(".displayvalue")
const keys = document.querySelector(".btn")

let displayValue = "0"
let firstValue = "0"
let operator = null
let waitingForSecondValue = false

function firstVal() {
    first_value.value =firstValue;
}

firstVal();

function updateDisplay() {
    display.value = displayValue;
}
updateDisplay();

keys.addEventListener('click',clickEvent)

function clickEvent (e){
    const element = e.target;

    if (!element.matches('button'))return;

    if (element.classList.contains('operators')) {
        //console.log('operators',element.value)
        handleOperator(element.value);
        updateDisplay();
        firstVal();
        return; 
    }
    if (element.classList.contains('decimal')){
        //console.log('decimal',element.value)
        inputDecimal();//dısarıdan bir deger almadıgı icin element.value yazmamıza gerek yok.
        updateDisplay();
        return;
    }
    if (element.classList.contains('clear')){
        // console.log('clear',element.value)
        inputClear();
        updateDisplay();
        firstVal();
        return;
    }
    if (element.classList.contains('backspace')){
        //console.log('backspace',element.value)
        inputBackspace();
        updateDisplay();
        return;
    }


    // console.log('number',element.value) 
    //Butonlara tıklanıldığında bilginin inputa yazdırmak için;
    inputNumber(element.value);
    updateDisplay();
    firstVal();
}

function handleOperator(nextOperator){
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue){
        operator = nextOperator;
        return;
    }

    if(firstValue === "0"){
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue,value,operator);

        displayValue = `${parseFloat(result.toFixed(4))}`;
        firstValue = result;
    }
    waitingForSecondValue = true;
    operator = nextOperator;
    
    console.log(displayValue,firstValue,operator,waitingForSecondValue)
}

function calculate(first ,second,operator){
    if (operator ==="+"){
        return first+second
    } else if (operator ==="-"){
        return first-second
    } else if (operator === "*"){
        return first*second
    } else if (operator ==="/"){
        return first/second
    }
    return second;
}

function inputNumber(num){
    if(waitingForSecondValue){
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === "0"?num:displayValue+num
    }
    console.log(displayValue,firstValue,operator,waitingForSecondValue)
}

function inputDecimal(){
    if(!displayValue.includes(".")){
        displayValue +='.'
    }
}
function inputClear(){
    displayValue="0"
    firstValue ="0"
}

function inputBackspace() {
    displayValue = displayValue.slice(0,-1)
}





