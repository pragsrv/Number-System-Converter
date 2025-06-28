const binaryInput = document.getElementById("binary");
const decimalInput = document.getElementById("decimal");
const octalInput = document.getElementById("octal");
const hexInput = document.getElementById("hexadecimal");

const errorBinary = document.getElementById("error-binary");
const errorDecimal = document.getElementById("error-decimal");
const errorOctal = document.getElementById("error-octal");
const errorHex = document.getElementById("error-hexadecimal");

// Regex rules for each format
const validators = {
  binary: /^[01]+$/,
  decimal: /^\d+$/,
  octal: /^[0-7]+$/,
  hexadecimal: /^[0-9a-fA-F]+$/,
};

function clearErrors() {
  errorBinary.textContent = "";
  errorDecimal.textContent = "";
  errorOctal.textContent = "";
  errorHex.textContent = "";
}

function updateFromDecimal(value) {
  const dec = parseInt(value, 10);
  if (isNaN(dec)) return;
  binaryInput.value = dec.toString(2);
  octalInput.value = dec.toString(8);
  hexInput.value = dec.toString(16).toUpperCase();
}

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
  }
}

// Input event listeners
binaryInput.addEventListener("input", () => handleInput("binary", binaryInput.value));
decimalInput.addEventListener("input", () => handleInput("decimal", decimalInput.value));
octalInput.addEventListener("input", () => handleInput("octal", octalInput.value));
hexInput.addEventListener("input", () => handleInput("hexadecimal", hexInput.value));

// Copy to clipboard
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

const themeSwitcher = document.getElementById("themeSwitcher");
themeSwitcher.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeSwitcher.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
