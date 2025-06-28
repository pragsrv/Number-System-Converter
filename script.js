// Input Elements
const binaryInput = document.getElementById("binary");
const decimalInput = document.getElementById("decimal");
const octalInput = document.getElementById("octal");
const hexInput = document.getElementById("hexadecimal");

// Error Elements
const errorBinary = document.getElementById("error-binary");
const errorDecimal = document.getElementById("error-decimal");
const errorOctal = document.getElementById("error-octal");
const errorHex = document.getElementById("error-hexadecimal");

// Steps & History Elements
const stepsDisplay = document.getElementById("conversionSteps");
const historyList = document.getElementById("historyList");

// Input validation regex
const validators = {
  binary: /^[01]+$/,
  decimal: /^\d+$/,
  octal: /^[0-7]+$/,
  hexadecimal: /^[0-9a-fA-F]+$/,
};

// Clear all error messages
function clearErrors() {
  errorBinary.textContent = "";
  errorDecimal.textContent = "";
  errorOctal.textContent = "";
  errorHex.textContent = "";
}

// Get base of number system
function getBase(type) {
  switch (type) {
    case "binary": return 2;
    case "decimal": return 10;
    case "octal": return 8;
    case "hexadecimal": return 16;
  }
}

// Generate conversion steps text
function getConversionSteps(fromType, value, dec) {
  let steps = `Input Type: ${fromType.toUpperCase()}\nInput Value: ${value}\n\n`;
  steps += `Step 1: Convert ${fromType} to Decimal\n→ ${value} (base ${getBase(fromType)}) = ${dec} (decimal)\n\n`;

  if (fromType !== 'binary') {
    steps += `Step 2: Decimal to Binary → ${dec.toString(2)}\n`;
  }
  if (fromType !== 'octal') {
    steps += `Step 3: Decimal to Octal → ${dec.toString(8)}\n`;
  }
  if (fromType !== 'hexadecimal') {
    steps += `Step 4: Decimal to Hexadecimal → ${dec.toString(16).toUpperCase()}\n`;
  }

  return steps;
}

// Typewriter animation for conversion steps
function showSteps(text) {
  stepsDisplay.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      stepsDisplay.textContent += text.charAt(i);
      i++;
      setTimeout(type, 10);
    }
  }
  type();
}

// Add to conversion history
function addToHistory(fromType, input, dec) {
  const timestamp = new Date().toLocaleTimeString();
  const li = document.createElement("li");
  li.textContent = `[${timestamp}] ${fromType.toUpperCase()}: ${input} → DEC: ${dec}, BIN: ${dec.toString(2)}, OCT: ${dec.toString(8)}, HEX: ${dec.toString(16).toUpperCase()}`;
  historyList.prepend(li);
}

// Main handler for input changes
function handleInput(inputType, value) {
  clearErrors();
  value = value.trim();

  if (!validators[inputType].test(value)) {
    document.getElementById(`error-${inputType}`).textContent = `Invalid ${inputType} value`;
    return;
  }

  let dec;
  switch (inputType) {
    case "binary":
      dec = parseInt(value, 2);
      break;
    case "decimal":
      dec = parseInt(value, 10);
      break;
    case "octal":
      dec = parseInt(value, 8);
      break;
    case "hexadecimal":
      dec = parseInt(value, 16);
      break;
  }

  if (!isNaN(dec)) {
    if (inputType !== "binary") binaryInput.value = dec.toString(2);
    if (inputType !== "decimal") decimalInput.value = dec;
    if (inputType !== "octal") octalInput.value = dec.toString(8);
    if (inputType !== "hexadecimal") hexInput.value = dec.toString(16).toUpperCase();

    const steps = getConversionSteps(inputType, value, dec);
    showSteps(steps);
    addToHistory(inputType, value, dec);
  }
}

// Event Listeners for Inputs
binaryInput.addEventListener("input", () => handleInput("binary", binaryInput.value));
decimalInput.addEventListener("input", () => handleInput("decimal", decimalInput.value));
octalInput.addEventListener("input", () => handleInput("octal", octalInput.value));
hexInput.addEventListener("input", () => handleInput("hexadecimal", hexInput.value));

// Copy to clipboard buttons
document.querySelectorAll(".copy-btn").forEach(button => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-copy");
    const targetInput = document.getElementById(targetId);
    navigator.clipboard.writeText(targetInput.value).then(() => {
      button.textContent = "✅";
      setTimeout(() => button.textContent = "📋", 1500);
    });
  });
});

// Dark mode toggle
const themeSwitcher = document.getElementById("themeSwitcher");
themeSwitcher.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeSwitcher.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
