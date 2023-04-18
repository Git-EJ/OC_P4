const Validator = {

  // FIELD ARE NOT EMPTY START

  /** emptyField
   * @param {HTMLElement} element dom element for entry field
   */
  emptyField : element => element.value === "",


  // Before value entry for valueMissing
  // ==>  need it because if the fields are empty and no values have been entered, 
  //      the generic message is displayed and not the custom message

  /** fieldRequiredBeforeUserEntry
   * @param {HTMLElement} inputFieldName dom element for entry field
   * @param {Object} entryError message to display on error
  */
  fieldRequiredBeforeUserEntry: (inputFieldName, entryError) => {
    for (let i = 0; i < inputFieldName.length; i++)
      if (Validator.emptyField(inputFieldName[i]))
        inputFieldName[i].setCustomValidity(entryError.required_field);
  },


  // Aftervalue entry for valueMissing, need it for custom error message

  /**fieldRequiredAfterUserEntry
   * @param {Object} entryError message to display on error
   */
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

  /**elementsListenerName for first name other way to do it than lastname
   * @param {HTMLElement} inputFieldName  dom element for firstname or lastname field
   * @param {Object} error_message message to display on error
   */
  elementsListenerName : (inputFieldName, error_message) => {
    inputFieldName.addEventListener('input', () => { Validator.elementsName(inputFieldName, error_message) } )
  },

  /**elementsName
   * @param {HTMLElement} inputFieldName dom element for firstname or lastname field
   * @param {Object} entryError message to display on error
   * @return boolean false if empty
   * @return boolean false if too short
   * @return boolean false if there is an hyphen at the start or end
   * @return boolean false if pattern mismatch
   * @return boolean false if pattern mismatch and too short
   */
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
  
  /** email
   * @param {HTMLElement} inputFieldName dom elements for email [0 + 1] fields
   * @param {Object} entryError message to display on error
   * @return boolean true if not empty, false if empty
   * @return boolean true if valid, false pattern or type mismatch
   */
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


  /** email identical
   * Validate copy value is identical to source 
   * @param {HTMLElement} elemSource dom element for mail source field
   * @param {HTMLElement} elemCopy dom element for copy mail field
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

  /** elementBirthdate
  * @param {HTMLElement} inputFieldName dom element for birthdate field
  * @returns boolean true if not empty, false if empty
  */
  elementBirthdate : (inputFieldName) => {
    
    if (Validator.emptyField(inputFieldName)) { return false }

    inputFieldName.setCustomValidity("");
    return true
  },

  

  //birthdate minors not allowed start

  /** isMajor
   * @param {HTMLElement} birthdate dom element for birthdate field
   * @param {Object} entryError message to display on error
   * @return boolean false if NaN
   * @return boolean false if age < 18
   * @return boolean true if age >= 18
  */
  isMajor: (birthdate, entryError) => {

    // retrieve today's date
    let todaysDate = new Date();
    document.getElementById('birthdate').setAttribute('max', todaysDate.toISOString().split('T')[0]) // set the max value in the html input type=date
                                                                                                    // toISOString() returns a string in the format YYYY-MM-DD
                                                                                                    // split('T') separate date and time
                                                                                                    //[0] return the date without the time (first array element)
    let dateOfEvent = new Date('2023-09-23');
    const age = new Date(dateOfEvent - new Date(birthdate.value).getTime()).getFullYear() - 1970;

    if (isNaN(age)) { // if the date is not valid like 31/04/2021 (only 30 days in april)
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

  /** elementTournament
   * @param {HTMLElement} inputFieldName dom element for tournament field
   * @returns boolean true if not empty, false if empty
  */
  elementTournament : (inputFieldName) => {
      
    if (Validator.emptyField(inputFieldName)) { return false }
    
    inputFieldName.setCustomValidity("");
    return true
    },
    // VALIDATION OF THE TOURNAMENT FIELDS END
    
    
    // VALIDATION OF THE CITY FIELD START

    // location validation and error message display

    /**elementLocation
     * @param {HTMLElement} checkboxes dom elements for location checkboxes
     * @param {HTMLElement} invalidLocationBorderColor dom element red border when unchecked instead of green border 
     * @param {Object} emptyLocationMessage message to display on error
     * @returns boolean true if checked, false if not
     */
    elementLocation : (checkboxes, invalidLocationBorderColor, emptyLocationMessage) => {
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

  /**elementTerm
   * @param {HTMLElement} term dom element for terms and conditions checkbox
   * @param {HTMLElement} termStyle dom element red border when submit and unchecked
   * @param {Object} emptyTermMessage message to display on error
   * @returns boolean true if checked, false if not
   */
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
        
      