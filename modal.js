
// DISPLAY START ==========================================================

// manages the display of the nav in low resolutions

function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DISPLAY END ==========================================================



// REGEX TOURNAMENT START ==========================================================

function regexTournament(event) {
  // only numbers 0 to 9
  event.target.value = event.target.value.replace([0 - 9], '');

  // maximum 2 numbers
  if (event.target.value.length > 2) {
    event.target.value = event.target.value.slice(0, 2);
  }
}

// REGEX TOURNAMENT END ==========================================================



// MODAL FORM START =======================================================================================================================================

function doIt(data) {

  const error_message = data.error;

  // LAUNCH & CLOSE MODAL FORM START

  const modalBg = document.querySelector(".bground");
  const modalBtn = document.querySelectorAll(".modal-btn");
  const modalClose = document.querySelector(".close");

  const launchModal = (modal) => { modal.style.display = "block"; }
  const closeModal = (modal) => { modal.style.display = "none"; }

  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener('click', () => launchModal(modalBg)));

  //close modal event
  modalClose.addEventListener('click', () => closeModal(modalBg));

  // LAUNCH & CLOSE MODAL FORM END



  //INPUT FIELD MANAGEMENT START 

  // Hyphen management for first and last name fields
  function hyphenFirstandLastNameManager(inputFieldName) {
    inputFieldName.addEventListener('input', (event) => {
      let name = event.target.value
      let name1 = name.trim()
      let name2 = name1.replace('--', '-')
      if (name.length !== name2.length) {
        inputFieldName.value = name2
        inputFieldName.dispatchEvent(new Event('input', { bubbles: true }))
      }
    })
  }

  // INPUT FIELD MANAGEMENT END ==========================================================




  //ERROR MESSAGES CONTENT DISPLAY START ================================================================

  // After value entry for valueMissing
  const allInputs = document.querySelectorAll('input[required]');
  Validator.fieldRequiredBeforeUserEntry(allInputs, error_message);
  Validator.fieldRequiredAfterUserEntry(error_message);

  //FIRSTNAME FIELD
  //modal firstname error messages
  const firstname = document.getElementById('firstname');
  Validator.elementsName(firstname, error_message);
  hyphenFirstandLastNameManager(firstname);


  //LASTNAME FIELD 
  //modal lastname error messages
  const lastname = document.getElementById('lastname');
  Validator.elementsName(lastname, error_message)
  hyphenFirstandLastNameManager(lastname);


  //EMAIL FIELD 
  // modal email error message
  let emailInputs = document.querySelectorAll('input[type="email"]');
  Validator.email(emailInputs, error_message);
  Validator.emailIdentical(emailInputs, error_message);


  //BIRTHDATE FIELD 
  //modal birthdate error message
  const birthdate = document.getElementById('birthdate');
  Validator.validateElementsBirthdateAndTournament(birthdate);
  Validator.isMajor(birthdate, error_message);

  //TOURNAMENT FIELD 
  //modal tournament error message
  const tournament = document.getElementById('tournament-quantity');
  Validator.validateElementsBirthdateAndTournament(tournament);

  // LOCATION FIELD
  // modal location error message
  const checkboxes = document.querySelectorAll("input[name='location']");
  const invalidLocationBorderColor = document.querySelectorAll('.checkbox-label .checkbox-icon');
  const emptyLocationMessage = error_message;
  let locChecked = false;
  // Validator.cityLocation(checkboxes);
  // Validator.validateLocation(checkboxes, invalidLocationBorderColor, emptyLocationMessage, locChecked);
  
  //TERMS AND CONDITIONS FIELD
  const terms = document.getElementById('checkbox1');
  const termsStyle = document.getElementById('terms-style');
  const emptyTermsMessage = error_message;
  let termsChecked = false;


  //ERROR MESSAGES CONTENT DISPLAY END ==================================================================


  
  //LOCATION CHECKBOX START =====================================================================

  // checkboxes listenner
  checkboxes.forEach((checkbox) => {
    // console.log(checkboxes)
    checkbox.addEventListener('click', validateLocation); //validateLocation erase the error message before submit (callback => validateLocation)
  });

  // location validation and error message display
  function validateLocation() {
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

    } else {
      document.documentElement.style.setProperty('--primary-color', '#FF001B');
      document.getElementById('location-error-message').innerHTML = emptyLocationMessage.empty_location;
      invalidLocationBorderColor.forEach((border) => {
        border.style.border = '2px solid var(--primary-color)';
      })
    }
  }
  //LOCATION CHECKBOX END =====================================================================



  // TERMS AND CONDITIONS CHECKBOX START =====================================================================

  //checkbox listenner
  terms.addEventListener('click', validateTerms);
    
  //terms and conditions validation and error message display
  function validateTerms () {
    if(terms.checked){
      termsChecked = true;
    } else if (!terms.checked){ 
      termsChecked = false;
    }
    // console.log(terms.checked)
    
    
    if (termsChecked){
      document.getElementById('terms-error-message').innerHTML = '';
      termsStyle.style.border = '';
      
    } else {
      document.documentElement.style.setProperty('--primary-color', '#FF001B');
      document.getElementById('terms-error-message').innerHTML = emptyTermsMessage.empty_terms;
      termsStyle.style.border = '2px solid var(--primary-color)';
    }
  }
  // TERMS AND CONDITIONS CHECKBOX END =======================================================================

  // let test = Validator.emailIdentical().strSource;
  // console.log(test)


  //SUBMIT MODAL FORM START ===========================================================

  //modal submit validation form negative or positive  

  let formSub = document.getElementById('form-submit');
  
  formSub.addEventListener('click', function (canSubmit) {

    
    if (firstname.value === '' || lastname.value === '' || emailInputs.value === '' || birthdate.value === '' || tournament.value === '') {

    } else if (Validator.emailIdentical().strSource !== Validator.emailIdentical().strCopy) { 
      // console.log(Validator.emailIdentical().strSource)

      Validator.emailIdentical();
      canSubmit.preventDefault();

    }  else if (locChecked !== true ) {
      validateLocation();
      canSubmit.preventDefault();
    
    } else if (termsChecked !== true) {
      validateTerms();
      canSubmit.preventDefault();
    
    } else {
      // modal submit validation message

      // validation message display container
      const myBody = document.querySelector("body");
      const myDivContainer = document.createElement("div");
      myBody.appendChild(myDivContainer);
      myDivContainer.classList.add("submitok");
      setTimeout(() => { myDivContainer.style.display = "none" }, 2000);


      //validation message --> text message
      const myDiv = document.createElement("div");
      myDivContainer.appendChild(myDiv);
      myDiv.classList.add("submitok__message");
      myDiv.textContent = data.validation.submit_validation_message;


      //delays the reloading of the dom after validation of the form
      const form = document.querySelector('form');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        setTimeout(() => { window.location.reload(); }, 2000);
      });
    }
  });

  //SUBMIT MODAL FORM END ===========================================================






  //DEV START

  // [DEBUG] modal automatic spawn (simulates a click automatically)
  document.querySelector('.btn-signup.modal-btn').click();


  // //form all values befor user entry
  // const form = document.querySelector('form');
  // const inputsValue = form.querySelectorAll('input');

  // inputsValue.forEach(inputsValue => {
  //   console.log(inputsValue.value);
  // });

  // //form all values after user entry
  // form.addEventListener('input', (event) => {
  //   console.log(event.target.value);
  // });


  // //value before user entry for birthdate
  // const birthDate = document.getElementById('birthdate').value;
  // console.log(`Before entry : ` , birthDate);


  // // value after user entry for birthdate
  //   const devBirthDateAfter = document.getElementById('birthdate');
  //   devBirthDateAfter.addEventListener('input', (event) => {
  //     let devBirthDateNewEntry = event.target.value;
  //     console.log(`After entry : ` , devBirthDateNewEntry);
  //   });


  //DEV END


} //END OF DO IT FUNCTION




//CONTENT.JSON START ==========================================================

// recovery of error or validation messages in content.json
window.onload = async () => {
  fetch('./content.json')
    .then(response => response.json())
    .then(data => doIt(data));
}

//CONTENT.JSON END ==========================================================

//MODAL FORM END =======================================================================================================================================