const binaryInput = document.getElementById("binary");
const decimalInput = document.getElementById("decimal");
const octalInput = document.getElementById("octal");
const hexInput = document.getElementById("hexadecimal");

function fromBinary(val) {
  const dec = parseInt(val, 2);
  if (isNaN(dec)) return;
  decimalInput.value = dec;
  octalInput.value = dec.toString(8);
  hexInput.value = dec.toString(16).toUpperCase();
}

function fromDecimal(val) {
  const dec = parseInt(val, 10);
  if (isNaN(dec)) return;
  binaryInput.value = dec.toString(2);
  octalInput.value = dec.toString(8);
  hexInput.value = dec.toString(16).toUpperCase();
}

function fromOctal(val) {
  const dec = parseInt(val, 8);
  if (isNaN(dec)) return;
  binaryInput.value = dec.toString(2);
  decimalInput.value = dec;
  hexInput.value = dec.toString(16).toUpperCase();
}

function fromHex(val) {
  const dec = parseInt(val, 16);
  if (isNaN(dec)) return;
  binaryInput.value = dec.toString(2);
  decimalInput.value = dec;
  octalInput.value = dec.toString(8);
}

binaryInput.addEventListener("input", () => fromBinary(binaryInput.value));
decimalInput.addEventListener("input", () => fromDecimal(decimalInput.value));
octalInput.addEventListener("input", () => fromOctal(octalInput.value));
hexInput.addEventListener("input", () => fromHex(hexInput.value));
