const sub = document.getElementById("submit-button");
const d = new Date();

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

function appendNewChild(formId, message){
    if (formId.id != "car-year") {
        let child = document.createElement('p');
        child.innerHTML = "<span style='color:#FF0000'> *" + message +  " </span>";
        child.classList.add("error");
        child.classList.add("input-hint");
        formId.parentNode.classList.add('input-invalid');
        formId.parentElement.appendChild(child);
    } else {
        let child = document.createElement('p');
        child.innerHTML = "<span style='color:#FF0000'> *" + message +  " </span>";
        child.classList.add("input-hint")
        child.classList.add("error");
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

function validInputAction(formId){
    if (formId.id != "car-year"){
        formId.parentNode.classList.add('input-valid');
    } else if (formId.id == "car-year"){
        formId.parentNode.parentNode.classList.add('input-valid');
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
    } else if (parseInt(carYear.value) <= 1900 || parseInt(carYear.value) > date.getFullYear()) {
        appendNewChild(carYear, "Car year must be between 1900 and current year");
    } else if (chk){
        invalidToValidInputAction(carYear);
    } else if (!chk) {
        validInputAction(carYear);
    }
}

function validateDateForm(){
    let date = document.getElementById("start-date");
    let dateVal = date.value.split("-");
    let emp = checkFormEmpty(date);
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    if (!emp){
        if (dateVal[0]<year || dateVal[1]<month || dateVal[2]<day){
            appendNewChild(date, "Date must be in the future");
        }
    }
}

function validateDaysForm(){
    let days = document.getElementById("days");
    let emp = checkFormEmpty(days);
    if (isNaN(days.value) && !emp) {
        appendNewChild(days, "Days must be a number");
    } else if (!emp && days.value < 1 && days.value > 30){
        appendNewChild(days, "Days must be a number between 1 and 30")
    } else if (!emp & checkIfErrorExists(days)) {
        invalidToValidInputAction(days);
    }
}

function validateCreditCardNumForm(){
    let credit = document.getElementById("credit-card");
    let emp = checkFormEmpty(credit);
    if (!emp && validateCardNumber(credit.value.trim())){
        credit.parentNode.classList.add('input-valid');
    } else {
        credit.parentNode.classList.add('input-invalid');
    }
}

function validateCVVForm(){
    let CVV = document.getElementById("cvv");
    let emp = checkFormEmpty(cvv);
    if (isNaN(CVV.value) && !emp){
        appendNewChild(CVV, "CVV must be a number");
    } else if (CVV.value.length != 3 && !emp){
        appendNewChild(CVV, "CVV must be three digits");
    }
}

function validateExpDateForm(){
    let exp = document.getElementById("expiration");
    let emp = checkFormEmpty(exp);
}

function getPrice(){
    let butt = document.getElementById("submit-button");
    appendNewChild(butt);
}

sub.addEventListener("click", function(event) {
    validateNameForm();
    validateCarForm();
    validateDateForm();
    validateDaysForm();
    validateCreditCardNumForm();
    validateCVVForm();
    validateExpDateForm();
    getPrice();
    event.preventDefault();
});