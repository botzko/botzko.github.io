const eurInput = document.getElementById('eur');
const bgnInput = document.getElementById('bgn');
const keyboard = document.getElementById('keyboard');
const exchangeRate = 1.95583;

let activeInput = eurInput; // Keep track of the currently active input field

// Function to set the active input field and apply visual styling
function setActiveInput(input) {
    eurInput.classList.remove('active');
    bgnInput.classList.remove('active');
    input.classList.add('active');
    activeInput = input;
}

// Event listeners for input field clicks to set active input
eurInput.addEventListener('click', () => setActiveInput(eurInput));
bgnInput.addEventListener('click', () => setActiveInput(bgnInput));

// Handles all keyboard clicks
keyboard.addEventListener('click', (event) => {
    const button = event.target.closest('.key');
    if (!button) return; // Not a keyboard button

    const key = button.dataset.key;
    let currentValue = activeInput.value;

    if (key === 'C') {
        // Backspace: remove the last character
        currentValue = currentValue.slice(0, -1);
    } else if (key === 'AC') {
        // Clear All: clear both input fields
        eurInput.value = '';
        bgnInput.value = '';
        return; // No further conversion needed after clearing all
    } else if (key === '.') {
        // Decimal point: add only if not already present
        if (!currentValue.includes('.')) {
            currentValue += '.';
        }
    } else {
        // Number key: append the number
        currentValue += key;
    }

    activeInput.value = currentValue;
    updateConversion();
});

// Function to perform the currency conversion
function updateConversion() {
    const sourceInput = activeInput;
    const targetInput = (sourceInput === eurInput) ? bgnInput : eurInput;
    const sourceValue = sourceInput.value;

    // If the source input is empty, clear the target input and return
    if (sourceValue === '') {
        targetInput.value = '';
        return;
    }

    // Use a temporary value for conversion to avoid issues with incomplete numbers like "."
    let numericValue = parseFloat(sourceValue);

    // If parseFloat results in NaN (e.g., for just "."), treat it as 0 for conversion
    if (isNaN(numericValue)) {
        numericValue = 0;
    }

    // Perform the conversion based on the active input
    if (sourceInput === eurInput) {
        targetInput.value = (numericValue * exchangeRate).toFixed(2);
    } else {
        targetInput.value = (numericValue / exchangeRate).toFixed(2);
    }
}

// Initialize the active input when the page loads
setActiveInput(eurInput);