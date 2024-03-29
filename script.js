const sub = document.getElementById("submit-button");
const d = new Date();

// empty/error checks

function checkFormEmpty(formId){
    let emp = false;
    let chk = checkIfErrorExists(formId);
    if (formId.value.trim() == ''){
        if (!chk) {
            let message = formId.id + " is required"
            appendNewChild(formId, message);
            formId.parentNode.classList.add('input-invalid');
            emp = true;
        } else if (chk){
            let message = formId.id + " is required"
            removeChild(formId);
            appendNewChild(formId, message);
            formId.parentNode.classList.add('input-invalid');
            emp = true;
        }
    }
    return emp;
}

function checkIfErrorExists(formId){
    let err = false;
    if (formId.id != 'car-year'){
        let lastChildAtt = formId.parentElement.lastElementChild.classList;
        if (lastChildAtt.contains('error')){
            err = true;
        }
    } else if (formId.id == 'car-year'){
        let lastChildAtt = formId.parentElement.parentElement.lastElementChild.classList;
        if (lastChildAtt.contains('error')){
            err = true;
        }
    }
    return err;
}

// add/remove children

function appendNewChild(formId, message){
    if (formId.id != "car-year") {
        let child = document.createElement('p');
        child.innerHTML = "<span style='color:#FF0000'> *" + message +  " </span>";
        child.classList.add("error");
        child.classList.add("input-hint");
        formId.parentNode.classList.remove('input-valid');
        formId.parentNode.classList.add('input-invalid');
        formId.parentElement.appendChild(child);
    } else {
        let child = document.createElement('p');
        child.innerHTML = "<span style='color:#FF0000'> *" + message +  " </span>";
        child.classList.add("input-hint")
        child.classList.add("error");
        formId.parentNode.parentNode.classList.remove("input-valid");
        formId.parentNode.parentNode.classList.add("input-invalid");
        formId.parentElement.parentElement.appendChild(child);
    }
}

function removeChild(formId){
    if (formId.id != "car-year"){
        formId.parentElement.removeChild(formId.parentElement.childNodes[formId.parentElement.childNodes.length-1]);
    } else if (formId.id == "car-year"){
        formId.parentElement.parentElement.removeChild(formId.parentElement.parentElement.childNodes[formId.parentElement.parentElement.childNodes.length-1]);
    }
}

// input actions

function validInputAction(formId){
    if (formId.id != "car-year"){
        formId.parentNode.classList.add('input-valid');
    } else if (formId.id == "car-year"){
        formId.parentNode.parentNode.classList.add('input-valid');
    }
}

function invalidInputAction(formId){
    if (formId.id != "car-year"){
        formId.parentNode.classList.add('input-invalid');
    } else if (formId.id == "car-year"){
        formId.parentNode.parentNode.classList.add('input-invalid');
    }
}

function invalidToValidInputAction(formId){
    if (formId.id != "car-year"){
        removeChild(formId);
        formId.parentNode.classList.remove('input-invalid');
        formId.parentNode.classList.add('input-valid');
    } else if (formId.id == "car-year"){
        removeChild(formId);
        formId.parentNode.parentNode.classList.remove('input-invalid');
        formId.parentNode.parentNode.classList.add('input-valid');
    }
}

// credit card functions

function validateCardNumber(number) {
    var regex = new RegExp("^[0-9]{16}$");
    if (!regex.test(number))
        return false;

    return luhnCheck(number);
}

function luhnCheck(val) {
    var sum = 0;
    for (var i = 0; i < val.length; i++) {
        var intVal = parseInt(val.substr(i, 1));
        if (i % 2 == 0) {
            intVal *= 2;
            if (intVal > 9) {
                intVal = 1 + (intVal % 10);
            }
        }
        sum += intVal;
    }
    return (sum % 10) == 0;
}

function checkCreditCardType(creditNum){
    if (creditNum.charAt(0) == '3'){
        return ('American Express');
    } else if (creditNum.charAt(0) == '4'){
        return 'Visa';
    } else if (creditNum.charAt(0) == '5'){
        return 'MasterCard';
    } else if (creditNum.charAt(0) == '6'){
        return 'Discover Card';
    } else {
        return 'generic credit card'
    }
}

// cost function

function getTotalCost(dateToBill, daysToPark){
    let d2 = new Date(dateToBill);
    let cost = 0;
    for (let i=0; i<daysToPark; i++){
        d2 = new Date(d2.getTime() + 86400000);
        if (d2.getDay() == 0 || d2.getDay() == 6){
            cost += 7;
        } else {
            cost += 5;
        }
    }
    return cost;
}

// individual input validations

function validateNameForm(){
    let name = document.getElementById("name");
    let err = checkIfErrorExists(name);
    let emp = checkFormEmpty(name);
    if (!emp && err){
        invalidToValidInputAction(name);
    } else if (!emp && !err){
        validInputAction(name);
    }
}

function validateCarForm(){
    let carYear = document.getElementById("car-year");
    let carMake = document.getElementById("car-make");
    let carModel = document.getElementById("car-model");
    let chk = checkIfErrorExists(carYear);
    if (carYear.value.trim() == '' || carMake.value.trim() == '' || carModel.value.trim() == ''){
        if (!chk){
            appendNewChild(carYear, "year, make and model required");
        }
    } else if (isNaN(carYear.value)){
        appendNewChild(carYear, "Car year must be a number");
    } else if (parseInt(carYear.value) <= 1900 || parseInt(carYear.value) > d.getFullYear()) {
        appendNewChild(carYear, "Car year must be between 1900 and current year");
    } else if (chk){
        invalidToValidInputAction(carYear);
    } else if (!chk) {
        validInputAction(carYear);
    }
}

function validateDateForm(){
    let date = document.getElementById("start-date");
    let d3 = new Date(date.value);
    let emp = checkFormEmpty(date);
    let chk = checkIfErrorExists(date);
    if (!emp){
        if (d3.getTime() < d.getTime()){
            if (chk){
                removeChild(date);
                appendNewChild(date, "Date must be in the future");
            } else if (!chk){
                appendNewChild(date, "Date must be in the future");
            }
        } else if (chk){
            invalidToValidInputAction(date);
        } else if (!chk){
            validInputAction(date);
        }
    }
    return date.value;
}

function validateDaysForm(){
    let days = document.getElementById("days");
    let chk = checkIfErrorExists(days);
    let emp = checkFormEmpty(days);
    if (isNaN(days.value) && !emp) {
        if (chk){
            removeChild(days);
            appendNewChild(days, "days must be a number");
        } else if (!chk){
            appendNewChild(days, "days must be a number");
        }
    } else if (!emp && parseInt(days.value) >= 30 || parseInt(days.value) <= 1){
        if (chk){
            removeChild(days);
            appendNewChild(days, "days must be a number between 1 and 30");
        } else if (!chk){
            appendNewChild(days, "days must be a number between 1 and 30");
        }
    } else if (!emp && chk) {
        invalidToValidInputAction(days);
    } else if (!emp && !chk) {
        validInputAction(days);
    }
    return days.value;
}

function validateCreditCardNumForm(){
    let credit = document.getElementById("credit-card");
    let emp = checkFormEmpty(credit);
    let chk = checkIfErrorExists(credit);
    if (!emp && validateCardNumber(credit.value.trim())){
        if (!chk){
            validInputAction(credit);
        } else if (chk) {
            invalidToValidInputAction(credit);
        }
    } else if (!chk && !emp) {
        appendNewChild(credit, "must be valid credit card number");
    } else if (!emp && chk){
        removeChild(credit);
        appendNewChild(credit, "must be valid credit card number");
    }
    return credit.value;
}

function validateCVVForm(){
    let CVV = document.getElementById("cvv");
    let emp = checkFormEmpty(CVV);
    let chk = checkIfErrorExists(CVV);
    if (isNaN(CVV.value) && !emp){
        if (chk){
            removeChild(CVV);
            appendNewChild(CVV, "CVV must be a number");
        } else if (!chk){
            appendNewChild(CVV, "CVV must be a number");
        }
    } else if (CVV.value.length != 3 && !emp){
        if (chk){
            removeChild(CVV);
            appendNewChild(CVV, "CVV must be a number with three digits");
        } else if (!chk){
            appendNewChild(CVV, "CVV must be a number with three digits");
        }
    } else if (!emp) {
        if (chk){
            invalidToValidInputAction(CVV);
        } else if (!chk){
            validInputAction(CVV);
        }
    }
}

function validateExpDateForm(){
    let exp = document.getElementById("expiration");
    let year = d.getFullYear().toString().substring(2, 4);
    let month = d.getMonth();
    let regex = new RegExp("^[0-9][0-9]/[0-9][0-9]$");
    let emp = checkFormEmpty(exp);
    let chk = checkIfErrorExists(exp);
    if (regex.test(exp.value)){
        let dateVal = exp.value.split("/");
        if (chk && dateVal[0] >= month && dateVal[0] <= 12 && dateVal[1] >= parseInt(year)){
            removeChild(exp);
            validInputAction(exp);
        } else if (!chk && dateVal[0] >= month && dateVal[0] <= 12 && dateVal[1] >= parseInt(year)){
            validInputAction(exp);
        } else if (chk){
            removeChild(exp);
            appendNewChild(exp, "exp date must be a valid future date");
        } else if (!chk){
            appendNewChild(exp, "exp date must be a valid future date");
        }
    } else if (!emp){
        if (chk){
            removeChild(exp);
            appendNewChild(exp, "exp date must be a valid future date");
        } else if (!chk){
            appendNewChild(exp, "exp date must be a valid future date");
        }
    }
}

// get and append price

function getPrice(dateToBill, daysToPark, credit){
    let butt = document.getElementById("submit-button");
    if (document.querySelector(".error") == null){
        let cost = getTotalCost(dateToBill, daysToPark);
        let costText = '' + cost;
        let creditCard = checkCreditCardType(credit);
        if (butt.parentElement.lastElementChild.classList.contains('price')){
            let child = document.createElement('p');
            child.innerHTML = "<span >" + "your total cost is: $" + costText + ' on your ' + creditCard + " </span>";
            child.classList.add("price")
            removeChild(butt);
            butt.parentElement.appendChild(child);
        } else {
            let child = document.createElement('p');
            child.innerHTML = "<span >" + "your total cost is: $" + costText + ' on your ' + creditCard + " </span>";
            child.classList.add("price")
            butt.parentElement.appendChild(child);
        }
    }
}

// main

sub.addEventListener("click", function(event) {
    validateNameForm();
    validateCarForm();
    let dateToBill = validateDateForm();
    let daysToPark = validateDaysForm();
    let credit = validateCreditCardNumForm();
    validateCVVForm();
    validateExpDateForm();
    getPrice(dateToBill, daysToPark, credit);
    event.preventDefault();
});