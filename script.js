const sub = document.getElementById("submit-button");

function checkFormEmpty(formId){
    let emp = false;
    if (formId.value.trim() == ''){
        let message = formId.id + " is required"
        appendNewChild(formId, message);
        emp = true;
    }
    return emp;
}

function appendNewChild(formId, message){
    if (formId.id != "car-year") {
        let child = document.createElement('p');
        child.innerHTML = "<span class='input-field' style='color:#FF0000'> *" + message +  " </span>";
        formId.parentElement.appendChild(child);
    } else {
        let child = document.createElement('p');
        child.innerHTML = "<span class='input-field' style='color:#FF0000'> *" + message +  " </span>";
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

function validateNameForm(){
    let name = document.getElementById("name");
    let emp = checkFormEmpty(name);
}

function validateCarForm(){
    const date = new Date();
    let carYear = document.getElementById("car-year");
    let carMake = document.getElementById("car-make");
    let carModel = document.getElementById("car-model");
    if (carYear.value.trim() == '' || carMake.value.trim() == '' || carModel.value.trim() == ''){
        appendNewChild(carYear, "input required");
        carYear.parentNode.classList.add("input-invalid");
    } else if (isNaN(carYear.value)){
        appendNewChild(carYear, "Car year must be a number");
        carYear.parentNode.classList.add("input-invalid");
    } else if (parseInt(carYear.value) <= 1900 || parseInt(carYear.value) > date.getFullYear()) {
        appendNewChild(carYear, "Car year must be between 1900 and current year");
        carYear.parentNode.classList.add("input-invalid");
    } else {
        removeChild(carYear);
        carYear.parentNode.classList.remove("input-invalid");
        carYear.parentNode.classList.add("input-valid");
    }
}

function validateDateForm(){
    let date = document.getElementById("start-date");
    let emp = checkFormEmpty(date);
}

function validateDaysForm(){
    let days = document.getElementById("days");
    let emp = checkFormEmpty(days);
    if (isNaN(days.value) && !emp) {
        appendNewChild(days, "Days must be a number");
    } else if (!emp && days.value > 1 || !emp && days.value < 30){
        appendNewChild(days, "Days must be a number between 1 and 30")
    }
}

function validateCreditCardNumForm(){
    let credit = document.getElementById("credit-card");
    let emp = checkFormEmpty(credit);
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

sub.addEventListener("click", function(event) {
    validateNameForm();
    validateCarForm();
    validateDateForm();
    validateDaysForm();
    validateCreditCardNumForm();
    validateCVVForm();
    validateExpDateForm();
    event.preventDefault();
});