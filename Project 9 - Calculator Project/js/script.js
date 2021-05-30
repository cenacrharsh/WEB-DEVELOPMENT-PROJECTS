let runningTotal = 0;
let buffer = "0"; // whats on screen is always a string
let previousOperator = null;

const screen = document.querySelector(".screen");

function rerender() {
  screen.innerText = buffer;
}

function flushOperation(intBuffer) {
  //console.log("runningTotal Before ", runningTotal);
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
  //console.log("runningTotal After ", runningTotal);
}

function handleMath(symbol) {
  if (buffer === "0") {
    //do nothing
    return;
  }
  const intBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  buffer = "0";
  previousOperator = symbol;
}

function handleSymbol(symbol) {
  //console.log("handleSymbol ", symbol);
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;

    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;

    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;

    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
  if (symbol === "C") {
    buffer = "0";
    runningTotal = 0;
  }
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
  //console.log("handleNumber buffer ", buffer);
}

function buttonClick(value) {
  if (isNaN(value)) {
    //not a number
    handleSymbol(value);
  } else {
    //is a number
    handleNumber(value);
  }
  rerender();
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
