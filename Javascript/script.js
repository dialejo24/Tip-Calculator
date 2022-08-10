let client_bill = document.getElementById("bill");
let percentaje_custom = document.getElementById("custom");
let num_people = document.getElementById("people");
let percentaje_buttons = document.querySelectorAll("input[type='radio']");
let tip_amount = document.querySelectorAll(".amount")[0];
let total_amount = document.querySelectorAll(".amount")[1];
let resetButton = document.querySelector(".reset");
let inputNumber = document.querySelectorAll("input[type='number']");

let tip_percentaje = 0;
let bill_amount = 0;
let number_people = 0;

percentaje_custom.addEventListener("focusout", getCustomPercentaje);
percentaje_buttons.forEach(button => {
    button.addEventListener("click", getButtonPercentaje);
});
client_bill.addEventListener("focusout", getBill);
num_people.addEventListener("focusout", getNumPeople);
resetButton.addEventListener("click", reset);
inputNumber.forEach(input => {
    input.addEventListener("focusin", focusInputNumber);
})

function getCustomPercentaje(e) {
    percentaje_buttons.forEach(button => {
        if (button.checked) {
            button.checked = false;
        }
    });

    tip_percentaje = +e.target.value;
    isInputCorrect(e);
    displayResults();
}

function getButtonPercentaje(e) {
    if (percentaje_custom.value != "") {
        percentaje_custom.value = "";
    }

    tip_percentaje = +e.target.value;
    displayResults();
}

function getBill(e) {
    bill_amount = +e.target.value;
    isInputCorrect(e);
    displayResults();
}

function getNumPeople(e) {
    number_people = +e.target.value;
    isInputCorrect(e);
    displayResults();
}

function displayResults() {
    if (bill_amount > 0 && number_people > 0 && tip_percentaje > 0) {
        tip_amount.textContent = "$" + calcTipPerPerson().toFixed(2);
        total_amount.textContent = "$" + calcTotalPerPerson().toFixed(2);
        resetButton.style = "opacity:1;";

    } else {
        tip_amount.textContent = "$0.00";
        total_amount.textContent = "$0.00";
        resetButton.style = "opacity:0.4;";
    }
}

function calcTotalPerPerson() {
    return calcTipPerPerson() + bill_amount / number_people;
}
function calcTipPerPerson() {
    return (bill_amount * (tip_percentaje/100)) / number_people;
}

function reset() {
    if (bill_amount > 0 && number_people > 0 && tip_percentaje > 0) {
        tip_amount.textContent = "$0.00";
        total_amount.textContent = "$0.00";
        client_bill.value = "";
        num_people.value = "";
        percentaje_custom.value = "";
        percentaje_buttons.forEach(button => {
            if (button.checked) {
                button.checked = false;
            }
        });
        tip_percentaje = 0;
        bill_amount = 0;
        number_people = 0;
        resetButton.style = "opacity:0.4;";
    }
}

function isInputCorrect(e) {
    if (+e.target.value > 0) {
        e.target.style = "border-color: transparent;";
        return;
    }

    e.target.value = "";
    e.target.style = "border-color: red;";
}

function focusInputNumber(e) {
    e.target.style = "border-color: var(--strong-cyan);";
}

