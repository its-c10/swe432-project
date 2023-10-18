function validateContactForm() {

    let form = document.forms['contact-us'];
    let email = form['email'];
    let firstName = form['first-name'];
    let lastName = form['last-name'];
    
    if(!isValidEmail(email.value)) {
        email.style.border = "solid red";
        alert('This is not a valid email: ' + email.value);
        return false;
    }

    email.style.border = "none";

    if(hasNumber(firstName.value)) {
        firstName.style.border = "solid red";
        alert('The first name cannot contain digits');
        return false;
    }

    firstName.style.border = "none";

    if(hasNumber(lastName.value)) {
        lastName.style.border = "solid red";
        alert('The last name cannot contain digits!');
        return false;
    }

    lastName.style.borer = "non";

    return true;
}

function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

const hasNumber = (input) => {
    return /\d/.test(input);
}