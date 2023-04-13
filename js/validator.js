const Validator = {

  // FIELD ARE NOT EMPTY START
  fieldRequired: (entryError) => {
    document.addEventListener('input', function (event) {
      if (event.target.value === "") {
        event.target.setCustomValidity(entryError.required_field);
      }
    });
  },
  // FIELD ARE NOT EMPTY END



  // VALIDATION OF THE FIRSTNAME & LASTNAME FIELD START
  elementsName: (inputFieldName, entryError) => {

    inputFieldName.addEventListener('input', function () {

      if (inputFieldName.validity.tooShort) {
        inputFieldName.setCustomValidity(entryError.two_letters_minimum);

      } else if (inputFieldName.validity.patternMismatch) {
        inputFieldName.setCustomValidity(entryError.authorized_characters);

      } else if (inputFieldName.validity.patternMismatch && inputFieldName.validity.tooShort) {
        inputFieldName.setCustomValidity(entryError.two_letters_and_authorized_characters);

      } else {
        inputFieldName.setCustomValidity("");
      }

      // inputFieldName is a dom element (inputfield) ==> object. 
      // The start/end method is a string method. So we have to convert the dom element into a string.
      // For this we retrieve the value of inputfieldname with .value and we call start/end method with this value.
      let inputValue = inputFieldName.value;
      if (inputValue.startsWith('-') || inputValue.endsWith('-')) {
        inputFieldName.setCustomValidity(entryError.hyphen_not_allowed_at_the_start_or_end);
      }
    })
  },
  // VALIDATION OF THE FIRSTNAME & LASTNAME FIELD END



  // VALIDATION OF THE EMAIL FIELDS START
  email: (inputFieldName, entryError) => {

    for (let i = 0; i < inputFieldName.length; i++) {
      inputFieldName[i].addEventListener('input', function (event) {
        if (inputFieldName[i].validity.patternMismatch || inputFieldName[i].validity.typeMismatch) { //impossible to ungroup because of the Html pattern for personalized message
          inputFieldName[i].setCustomValidity(entryError.email_format);
          event.stopPropagation();
        } else {
          inputFieldName[i].setCustomValidity("");
        }
      })
    }
  },

  emailIdentical: (inputFieldNames, entryError) => {

    const elemSource = inputFieldNames[0]
    const elemCopy = inputFieldNames[1]

    const func = event => {
      const strSource = elemSource.value.toLowerCase().trim();
      const strCopy = elemCopy.value.toLowerCase().trim();
      if (strCopy !== strSource) {
        elemCopy.setCustomValidity(entryError.email_are_not_identical);
        event.stopPropagation();
        console.log("c'est pas le même")
      }
    }
    elemCopy.addEventListener('input', func)
    elemSource.addEventListener('input', func)
  },
  // VALIDATION OF THE EMAIL FIELDS END



  // VALIDATION OF THE BIRTHDATE AND TOURNAMENT FIELDS START
  validateElementsBirthdateAndTournament :(inputFieldName) => {

    inputFieldName.addEventListener('input', function () {

      const birthdateValue = document.getElementById('birthdate').value;
      const tournamentValue = document.getElementById('tournament-quantity').value;

      if (birthdateValue.length > 0 || tournamentValue.length > 0) {  //without this condition, the error message is displayed when the field is empty or not empty
        inputFieldName.setCustomValidity("");
      }
    })
  },
  // VALIDATION OF THE BIRTHDATE AND TOURNAMENT FIELDS END



  //BIRTHDATE MINORS NOT ALLOWED START
  isMajor: (inputFieldName, entryError) => {
    // retrieve today's date
    let todaysDate = new Date();
    console.log(todaysDate);

    inputFieldName.addEventListener('input', (event) => {
      const age = new Date(todaysDate - new Date(event.target.value).getTime()).getFullYear() - 1970
      if (isNaN(age)) {
        console.log("NaN", entryError.date_error);
        birthdate.setCustomValidity(entryError.date_error);
        event.stopPropagation();
      } else if (age < 18) {
        console.log("<18");
        birthdate.setCustomValidity(entryError.minors_are_not_allowed);
        event.stopPropagation();
      } else {
        birthdate.setCustomValidity("");
        console.log('you are allowed');
      }
    })
  },
  // BIRTHDATE MINORS NOT ALLOWED END 



} // CONST VALIDATOR END