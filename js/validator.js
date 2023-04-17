// [TODO] /** JSDOC */

const Validator = {

  // FIELD ARE NOT EMPTY START
  emptyField : element => element.value === "",

  // Before value entry for valueMissingv  
  // ==>  need it because if the fields are empty and no values have been entered, 
  //      the generic message is displayed and not the personalized message
  fieldRequiredBeforeUserEntry: (inputFieldName, entryError) => {
    for (let i = 0; i < inputFieldName.length; i++)
      if (Validator.emptyField(inputFieldName[i]))
        inputFieldName[i].setCustomValidity(entryError.required_field);
  },

  // Aftervalue entry for valueMissing
  fieldRequiredAfterUserEntry: (entryError) => {
    document.addEventListener('input', function (event) {
      if (Validator.emptyField(event.target)) {
        event.target.setCustomValidity(entryError.required_field);
        event.stopPropagation();
      }
    });
  },
  // FIELD ARE NOT EMPTY END



  // VALIDATION OF THE FIRSTNAME & LASTNAME FIELD START
  elementsListenerName : (inputFieldName, error_message) => {
    inputFieldName.addEventListener('input', () => { Validator.elementsName(inputFieldName, error_message) } )
  },

  elementsName: (inputFieldName, entryError) => {
    const validity = inputFieldName.validity;
    
    if (Validator.emptyField(inputFieldName)) {
      return false
    }
    
    if (validity.tooShort) {
      inputFieldName.setCustomValidity(entryError.two_letters_minimum);
      return false
    } 
    
    // inputFieldName is a dom element (inputfield) ==> object. 
    // The start/end method is a string method. So we have to convert the dom element into a string.
    // For this we retrieve the value of inputfieldname with .value and we call start/end method with this value.
    let inputValue = inputFieldName.value;
    if (inputValue.startsWith('-') || inputValue.endsWith('-')) {
      inputFieldName.setCustomValidity(entryError.hyphen_not_allowed_at_the_start_or_end);
      return false
    }
    
    if (validity.patternMismatch) {
      inputFieldName.setCustomValidity(entryError.authorized_characters);
      return false
    }
    
    if (validity.patternMismatch && validity.tooShort) {
      inputFieldName.setCustomValidity(entryError.two_letters_and_authorized_characters);
      return false
    }
    

    
    inputFieldName.setCustomValidity("");
    return true
  },
  // VALIDATION OF THE FIRSTNAME & LASTNAME FIELD END



  // VALIDATION OF THE EMAIL FIELDS START
  email: (inputFieldName, entryError) => {
    if (Validator.emptyField(inputFieldName)) { return false }

    const validity = inputFieldName.validity
    if (validity.patternMismatch || validity.typeMismatch) {
      inputFieldName.setCustomValidity(entryError.email_format);
      return false
    }
    
    inputFieldName.setCustomValidity("");
    return true
  },


  /**
   * Validate copy value is identical to source 
   * @param {HTMLElement} elemSource dom element for mail source
   * @param {HTMLElement} elemCopy dom element for copy mail
   * @param {Object} entryError message to display on error
   * @returns boolean true if identical, false if not
   */

  emailIdentical: (elemSource, elemCopy, entryError) => {
    const strSource = elemSource.value.toLowerCase().trim();
    const strCopy = elemCopy.value.toLowerCase().trim();
    
    if (strCopy !== strSource) {
      elemCopy.setCustomValidity(entryError.email_are_not_identical);
      return false
      
    }
    elemCopy.setCustomValidity("");
    return true
  },
  // VALIDATION OF THE EMAIL FIELDS END
  

  
  // VALIDATION OF THE BIRTHDATE FIELDS START
  elementBirthdate : (inputFieldName) => {
    
    if (Validator.emptyField(inputFieldName)) { return false }

    inputFieldName.setCustomValidity("");
    return true
  },

  

  //birthdate minors not allowed start
  isMajor: (birthdate, entryError) => {

    // retrieve today's date
    let todaysDate = new Date();
    document.getElementById('birthdate').setAttribute('max', todaysDate.toISOString().split('T')[0]) // set the max value in the html input type=date
    // toISOString() returns a string in the format YYYY-MM-DD
    // split('T') separate date and time
    //[0] return the date without the time (first array element)
    let dateOfEvent = new Date('2023-09-23');
    
    
    
    const age = new Date(dateOfEvent - new Date(birthdate.value).getTime()).getFullYear() - 1970;

    if (isNaN(age)) {
      birthdate.setCustomValidity(entryError.date_error);
      return false
      
    } else if (age < 18) {
       birthdate.setCustomValidity(entryError.minors_are_not_allowed);
      return false

    } else {
      birthdate.setCustomValidity("");
      return true
    }
  },
  // birthdate minors not allowed end
  // VALIDATION OF THE BIRTHDATE FIELDS END
    
    
    // VALIDATION OF THE TOURNAMENT FIELDS START
    elementTournament : (inputFieldName) => {
      
      if (Validator.emptyField(inputFieldName)) { return false }
      
      inputFieldName.setCustomValidity("");
      return true
    },
    // VALIDATION OF THE TOURNAMENT FIELDS END
    
    
    // VALIDATION OF THE CITY FIELD START
    // location validation and error message display
    location : (checkboxes, invalidLocationBorderColor, emptyLocationMessage) => {
      let locChecked = false;

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        locChecked = true;
      }
    });
    
    if (locChecked) {
      document.getElementById('location-error-message').innerHTML = '';
      invalidLocationBorderColor.forEach((border) => {
        border.style.border = '';
      })
      return true
    }

    document.documentElement.style.setProperty('--primary-color', '#FF001B');
    document.getElementById('location-error-message').innerHTML = emptyLocationMessage.empty_location;
    invalidLocationBorderColor.forEach((border) => {
      border.style.border = '2px solid var(--primary-color)';
    })
    return false
  },
  // VALIDATION OF THE CITY FIELD END
  

  // VALIDATION OF THE TERMS AND CONDITIONS FIELD START

  //terms and conditions validation and error message display
   elementTerm :(term, termStyle, emptyTermMessage) => {
    if (term.checked) {
      document.getElementById('term-error-message').innerHTML = '';
      termStyle.style.border = '';
      return true
    }
    
    document.documentElement.style.setProperty('--primary-color', '#FF001B');
    document.getElementById('term-error-message').innerHTML = emptyTermMessage.empty_term;
    termStyle.style.border = '2px solid var(--primary-color)';
    return false
    },
  // VALIDATION OF THE TERMS AND CONDITIONS FIELD END

  
} // CONST VALIDATOR END
        
      