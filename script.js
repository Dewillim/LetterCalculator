let currentResult = 0;
let displayValue = "0";
let previous;
let convertedNumber;
let fnpp = true; //first number post previous

const display = document.querySelector('.display');

display.innerText = displayValue;

function buttonClick(value){
    if(value === "L" || value ===  "A" || value ===  "÷" || value ===  "x" || value ===  "-" || value ===  "+" || value === "I"){
        handleSymbol(value);
    }else{
        handleLetter(value);
    }   
    display.innerText = displayValue;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'L':
            displayValue = '0';
            currentResult = 0;
            break;
        //current 8 display 2 previous +
        case 'I':
            if(previous === null){
                return
            }
            flushOperation(parseInt(displayValue));
            previous = null;
            displayValue = String(currentResult);
            currentResult = 0;
            break;
        case 'A':
            if(displayValue.length === 1){
                displayValue = '0';
            }else{
                displayValue = displayValue.substring(0, displayValue.length - 1);
                if(displayValue === "-"){
                    displayValue = "0";
                }
            }
            break;
        case '+':
        case '-':
        case '÷':
        case 'x':
            handleMath(symbol);
            fnpp = true;
            break;
    }
}

function handleMath(symbol){
    if(displayValue === '0'){
        return;
    }
    const intDisplayValue = parseInt(displayValue);
    if(currentResult === 0){
        currentResult = intDisplayValue;
    }else{
        flushOperation(intDisplayValue);
    }
    previous = symbol;
    //no resetting to zero after operator
}

function flushOperation(intDisplayValue){
    if(previous === '+'){
        currentResult += intDisplayValue;
    }else if(previous === '-'){
        currentResult -= intDisplayValue;
    }else if(previous === 'x'){
        currentResult *= intDisplayValue;
    }else if(previous === '÷'){
        currentResult /= intDisplayValue;
    }
}

//current 8 display 0 previous +

function handleLetter(value){
    if(displayValue === "0"){
        turnNumber(value);
        displayValue = convertedNumber;
    }else if(previous != null && fnpp === true){
        turnNumber(value);
        displayValue = convertedNumber;
        fnpp = false;
    }else{
        turnNumber(value);
        displayValue += convertedNumber;
    }
}

function turnNumber(letterString){
    if(letterString === "U"){
        convertedNumber = "1";
    } else if(letterString === "D"){
        convertedNumber = "2";
    } else if(letterString === "T"){
        convertedNumber = "3";
    } else if(letterString === "Q"){
        convertedNumber = "4";
    } else if(letterString === "C"){
        convertedNumber = "5";
    } else if(letterString === "S"){
        convertedNumber = "6";
    } else if(letterString === "E"){
        convertedNumber = "7";
    } else if(letterString === "O"){
        convertedNumber = "8";
    } else if(letterString === "N"){
        convertedNumber = "9";
    } else if(letterString === "Z"){
        convertedNumber = "0";
    } else if(letterString === "ZZ"){
        convertedNumber = "00";
    } else if(letterString === "P"){
        convertedNumber = ".";
    }
}

function init(){
    document.querySelector('.n').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();